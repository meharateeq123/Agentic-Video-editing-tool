// Prep pipeline for the realistic-earth-globe component. Runs once (or once per new target
// country) and produces assets shared by every future video — nothing here runs inside Remotion's
// render, so the actual film render never pays for topojson/d3/sharp.
//
// Outputs, all under D:\flick\assets\globe\ :
//   textures/borders_4096.png   one-time: every country border, rasterized as a transparent
//                                overlay so the 3D globe never has to draw thousands of line
//                                segments in WebGL — it just alpha-blends this texture over the
//                                sphere.
//   countries.json               one-time: every country's name, centroid, and simplified ring
//                                geometry, keyed by a lowercase-name slug. This is what a scene
//                                looks up its target/label countries from.
//   highlights/<slug>.png        one per target country, generated on demand by
//                                `node build.mjs highlight "<country name>"`. A future video that
//                                reuses a country (e.g. USA again) reuses the cached PNG instead
//                                of regenerating it.
import {existsSync, mkdirSync, writeFileSync, readFileSync} from 'node:fs';
import {geoPath, geoEquirectangular} from 'd3-geo';
import {feature} from 'topojson-client';
import sharp from 'sharp';
import topo from 'world-atlas/countries-50m.json' with {type: 'json'};

const OUT = 'D:/flick/assets/globe';
const W = 4096;
const H = 2048;

// geoEquirectangular's default scale/translate center a 960x500-ish frame; retargeting scale and
// translate to W/H makes it fill the canvas exactly, at the resolution the sphere texture needs.
const projection = geoEquirectangular()
  .scale(W / (2 * Math.PI))
  .translate([W / 2, H / 2]);
const path = geoPath(projection);

const gj = feature(topo, topo.objects.countries);

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function ensureDirs() {
  for (const d of ['textures', 'highlights']) {
    const p = `${OUT}/${d}`;
    if (!existsSync(p)) mkdirSync(p, {recursive: true});
  }
}

async function buildBorders() {
  const out = `${OUT}/textures/borders_4096.png`;
  if (existsSync(out)) {
    console.log('SKIP borders_4096.png (already built)');
    return;
  }
  // Deliberately faint. Bright white borders drawn across every continent were the single biggest
  // reason the first version read as a classroom globe instead of a satellite photograph — real
  // Earth from orbit has no lines on it at all. These stay just visible enough to place a country
  // without ever competing with the terrain.
  const d = gj.features.map((f) => `<path d="${path(f)}" />`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <g fill="none" stroke="#cfe2f5" stroke-width="0.9" stroke-opacity="0.30">${d}</g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log('BUILT borders_4096.png');
}

// Longitude-unwrap a ring relative to its own first point, so a ring that crosses the antimeridian
// (Russia's Far East, Fiji, the Aleutians) doesn't wrap from +179 to -179 and wreck the shoelace
// area/centroid below. The result can leave a ring's longitudes outside [-180,180]; callers wrap
// the final scalar back with wrapLon.
function unwrapRing(ring) {
  const out = [ring[0].slice()];
  for (let i = 1; i < ring.length; i++) {
    const prev = out[i - 1][0];
    let lon = ring[i][0];
    while (lon - prev > 180) lon -= 360;
    while (lon - prev < -180) lon += 360;
    out.push([lon, ring[i][1]]);
  }
  return out;
}

const wrapLon = (lon) => (((lon + 180) % 360) + 360) % 360 - 180;

// Signed shoelace area and centroid of one unwrapped ring, in raw lon/lat "degrees as if planar" —
// not a true equal-area projection, but consistent enough to compare ring sizes against each other
// and to locate a centroid within a couple of degrees, which is all a label anchor needs.
function ringAreaCentroid(ring) {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const cross = x0 * y1 - x1 * y0;
    a += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  a /= 2;
  if (Math.abs(a) < 1e-9) return {area: 0, lon: ring[0][0], lat: ring[0][1]};
  return {area: Math.abs(a), lon: cx / (6 * a), lat: cy / (6 * a)};
}

// A country's label/camera-target point and its on-screen size are both based on its largest
// contiguous landmass only, deliberately ignoring exclaves and overseas territory (Alaska for the
// USA, Kaliningrad for Russia, French Guiana for France). A documentary zoom to "the USA" should
// frame the lower 48, not pull back far enough to fit the Aleutians in the same shot — that was
// the original bug here: the whole-feature centroid landed in Montana and its radius ballooned to
// 47 degrees, wider than Russia's, purely because Alaska is far from the rest of the country.
function mainLandmass(rings) {
  let best = null;
  for (const ring of rings) {
    const unwrapped = unwrapRing(ring);
    const {area, lon, lat} = ringAreaCentroid(unwrapped);
    if (!best || area > best.area) best = {area, lon: wrapLon(lon), lat, ring: unwrapped};
  }
  return best ?? {lon: 0, lat: 0, ring: []};
}

// Angular (great-circle) radius from the main landmass's centroid to the farthest point on that
// same landmass — a stand-in for "how big does this country look from space," so the camera's
// arrival distance can scale to the country instead of a a fixed number that suits some countries
// and buries the camera inside others.
function angularRadiusDeg(lon, lat, ring) {
  let max = 0;
  const toRad = Math.PI / 180;
  for (const [plon, plat] of ring) {
    const dLon = (plon - lon) * toRad;
    const lat1 = lat * toRad;
    const lat2 = plat * toRad;
    const a =
      Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const d = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 180) / Math.PI;
    if (d > max) max = d;
  }
  return max;
}

function ringsOf(feat) {
  // Keep raw [lon,lat] rings (already in the source geometry) so the highlight step can
  // reproject them at whatever resolution it needs later, independent of the borders texture.
  const geom = feat.geometry;
  if (!geom) return [];
  if (geom.type === 'Polygon') return geom.coordinates;
  if (geom.type === 'MultiPolygon') return geom.coordinates.flat();
  return [];
}

function buildCountriesJson() {
  const out = `${OUT}/countries.json`;
  const labelsOut = `${OUT}/labels.json`;
  const entries = {};
  const labels = {};
  for (const f of gj.features) {
    const name = f.properties?.name;
    if (!name) continue;
    const rings = ringsOf(f);
    if (rings.length === 0) continue;
    const main = mainLandmass(rings);
    const r = Math.round(angularRadiusDeg(main.lon, main.lat, main.ring) * 100) / 100;
    entries[slug(name)] = {name, id: f.id, lon: main.lon, lat: main.lat, rings};
    // labels.json is the only one of these two shipped into a video's Remotion `public/` folder —
    // it is a couple hundred KB, not the several-MB ring geometry, because the running film only
    // ever needs a name + a point + a rough size for camera framing, never the full polygon.
    labels[slug(name)] = {name, lon: main.lon, lat: main.lat, r};
  }
  writeFileSync(out, JSON.stringify(entries));
  writeFileSync(labelsOut, JSON.stringify(labels));
  console.log(`BUILT countries.json + labels.json (${Object.keys(entries).length} countries)`);
}

async function buildHighlight(nameArg) {
  const countries = JSON.parse(readFileSync(`${OUT}/countries.json`, 'utf8'));
  const key = slug(nameArg);
  const entry = countries[key];
  if (!entry) {
    console.error(`No country matches "${nameArg}". Try the exact name, e.g. "United States of America".`);
    process.exitCode = 1;
    return;
  }
  const out = `${OUT}/highlights/${key}.png`;
  if (existsSync(out)) {
    console.log(`SKIP ${key}.png (already built) -> ${out}`);
    return;
  }
  const feat = {type: 'Feature', geometry: {type: 'MultiPolygon', coordinates: entry.rings.map((r) => [r])}};
  const d = path(feat);
  // Baked bright and rendered with additive blending at runtime (see RealisticGlobe.tsx) rather
  // than plain alpha compositing — a translucent gold laid flat over real satellite terrain reads
  // as a muddy khaki tint, not a glow. Additive blending actually brightens the country toward
  // gold instead of mixing toward brown.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <path d="${d}" fill="#ffcf3d" fill-opacity="0.85" stroke="#fff2b0" stroke-width="5" stroke-opacity="1" />
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`BUILT ${key}.png -> ${out}`);
}

const [, , cmd, arg] = process.argv;
ensureDirs();
if (cmd === 'highlight') {
  if (!existsSync(`${OUT}/countries.json`)) buildCountriesJson();
  await buildHighlight(arg);
} else {
  await buildBorders();
  buildCountriesJson();
}
