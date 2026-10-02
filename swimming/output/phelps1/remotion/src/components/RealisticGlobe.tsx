import React, {useEffect, useMemo, useState} from 'react';
import * as THREE from 'three';
import {useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {ease} from './base';
import {greatCircleDeg, latLonToVector3, pickNeighbors, slugifyCountry, type Labels} from './geo3d';

/**
 * A photographic-looking Earth seen from orbit, not a classroom globe.
 *
 * The first version of this component rendered correctly and still looked fake, for reasons worth
 * writing down because they are all lighting and restraint rather than geometry:
 *
 *   - it was lit almost flat (ambient 0.55), so the sphere read as a plastic ball under studio
 *     lights. Real Earth is lit by one distant sun: high contrast, a hard terminator, a limb that
 *     falls into black. Ambient here is now 0.045 and the sun does effectively all the work.
 *   - it had no night. The dark half of a real Earth is not empty — it carries city lights. Those
 *     are a separate additive shell masked by the sun angle, so they only appear where it is
 *     actually night and fade through the terminator.
 *   - its clouds were a faint 1024px wash at 26% opacity. Clouds are one of the strongest realism
 *     cues there is; they are now a 4096px layer, lit by the same sun, at full strength.
 *   - it sat on pure black. Space is not empty either — there is a starfield behind it now.
 *   - its country borders were bright white lines across every continent, which is the single most
 *     "map product" thing an image of Earth can have. They are now faint, and they fade in only as
 *     the camera closes on the target rather than being visible from the establishing wide.
 *
 * Data/asset pipeline: `D:\flick\assets\globe-builder\build.mjs` produces the shared textures,
 * `labels.json`, and one `highlights/<slug>.png` per target country. This component only reads
 * finished assets from `public/globe/` — no geo processing happens at render time.
 */
/**
 * An exact spot on Earth — a track, a city, anything the narration actually names. `country` is
 * optional context: when given, that country stays gold-highlighted underneath while the camera
 * comes down onto the point, which reads as "here, in this country" rather than dropping the
 * viewer onto an unplaceable patch of ground.
 */
export type GlobePlace = {
  name: string;
  lat: number;
  lon: number;
  /** optional sub-label under the name, e.g. "ARCA — 2nd" */
  sub?: string;
  /** optional country to keep highlighted for context, e.g. "United States of America" */
  country?: string;
};

export const RealisticGlobe: React.FC<{
  /** A country name, or an exact place to fly down to. */
  target: string | GlobePlace;
  /** total frames this component is mounted for */
  dur: number;
  /** 0..1 of `dur` where the dolly-in arrives over the target and the highlight fades in */
  arriveAt?: number;
  /** override the auto-picked nearby countries to label (target is always included/first) */
  labelCountries?: string[];
  /** how many country labels are shown at once, target included */
  maxLabels?: number;
  /**
   * How close the camera ends up, in globe radii. Defaults to a country-sized framing when the
   * target is a country, and a regional framing (~1.22) when it is a place. Below about 1.12 the
   * 4096px Earth texture starts to visibly soften — that is the honest limit of this imagery.
   */
  arriveDistance?: number;
}> = ({target: targetProp, dur, arriveAt = 0.62, labelCountries, maxLabels = 5, arriveDistance}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();

  const place = typeof targetProp === 'string' ? null : targetProp;
  const targetCountry = place ? (place.country ?? '') : (targetProp as string);

  const labels = useJsonAsset<Labels>(staticFile('globe/labels.json'));
  const dayTex = useDelayedTexture(staticFile('globe/textures/earth_day_4096.jpg'));
  const nightTex = useDelayedTexture(staticFile('globe/textures/earth_night_4096.jpg'));
  const normalTex = useDelayedTexture(staticFile('globe/textures/earth_normal_2048.jpg'));
  const specTex = useDelayedTexture(staticFile('globe/textures/earth_specular_2048.jpg'));
  const cloudsTex = useDelayedTexture(staticFile('globe/textures/earth_clouds_4096.jpg'));
  const bordersTex = useDelayedTexture(staticFile('globe/textures/borders_4096.png'));
  const starsTex = useDelayedTexture(staticFile('globe/textures/starfield_4096.jpg'));

  const targetKey = targetCountry ? slugifyCountry(targetCountry) : '';
  // A place with no country given needs no highlight layer at all.
  const highlightTex = useDelayedTexture(
    targetKey ? staticFile(`globe/highlights/${targetKey}.png`) : null,
  );

  const ready =
    labels &&
    dayTex &&
    nightTex &&
    normalTex &&
    specTex &&
    cloudsTex &&
    bordersTex &&
    starsTex &&
    (highlightTex || !targetKey);

  const country = targetKey ? labels?.[targetKey] : undefined;
  if (labels && targetKey && !country) {
    throw new Error(
      `RealisticGlobe: "${targetCountry}" (slug "${targetKey}") is not in globe/labels.json. ` +
        `Check the spelling against D:\\flick\\assets\\globe\\labels.json, and make sure ` +
        `"node build.mjs highlight \\"${targetCountry}\\"" has been run and its PNG copied into ` +
        `this project's public/globe/highlights/.`,
    );
  }

  // Where the camera actually points: the place if there is one, otherwise the country's centre.
  const aim = place ?? country;

  const shownLabels = useMemo(() => {
    if (!labels || !targetKey) return [];
    const keys = labelCountries
      ? [targetKey, ...labelCountries.map(slugifyCountry).filter((k) => k !== targetKey)]
      : pickNeighbors(labels, targetKey, maxLabels);
    return keys.slice(0, maxLabels).map((k) => ({key: k, ...labels[k]})).filter((l) => l.name);
  }, [labels, targetKey, labelCountries, maxLabels]);

  // --- camera: a straight dolly along the ray from the globe's centre through the target, so the
  // target stays frame-centre throughout and "zooming toward it" needs no separate pan.
  //
  // The whole move is driven by `dur`, which is the scene's own frame count — so the shot is
  // always exactly as long as the narration line it sits under, and the descent finishes as the
  // line lands. The clamp is for the extremes: on a three-second line a purely proportional
  // descent becomes a lurch, and on a forty-second one it creeps so slowly it reads as a still.
  // Between roughly 2.6s and 9s it follows the voiceover exactly; outside that it holds the
  // nearest natural speed and simply rests on the target for whatever time is left. ---
  const arriveFrame = Math.round(
    Math.min(Math.max(dur * arriveAt, fps * 2.6), Math.min(fps * 9, dur * 0.92)),
  );
  const t = ease(frame, 0, Math.max(1, arriveFrame));
  const dStart = 4.6;
  // A place gets a tight regional framing; a country gets a framing scaled to its own size.
  // 1.7 for a place, not closer. The Earth imagery is 4096x2048 — about 10km per pixel — so below
  // roughly 1.6 radii it stops resolving into anything and just goes soft, and the planet's curve
  // and atmosphere leave the frame, which is what made it read as a satellite photo in the first
  // place. Stopping here keeps a state-sized region in shot, sharp, still visibly on a planet.
  const dEnd =
    arriveDistance ??
    (place ? 1.7 : country ? Math.min(3.2, Math.max(1.5, 1.3 + country.r * 0.045)) : 3);
  const dist = dStart + (dEnd - dStart) * t;
  const dir = aim ? latLonToVector3(aim.lat, aim.lon, 1) : new THREE.Vector3(0, 0, 1);
  const camPos = dir.clone().multiplyScalar(dist);

  // --- sun: parked ~38 degrees off the target's own normal. Straight-on would flatten the sphere
  // into a disc with no terminator anywhere in shot; much further round and the target itself
  // falls into night. This keeps the target lit while the terminator stays in frame. ---
  const sunDir = useMemo(() => {
    const axis = new THREE.Vector3(0, 1, 0).cross(dir).normalize();
    const safeAxis = axis.lengthSq() < 1e-6 ? new THREE.Vector3(1, 0, 0) : axis;
    return dir.clone().applyAxisAngle(safeAxis, THREE.MathUtils.degToRad(-38)).normalize();
  }, [dir]);

  // --- highlight: fades in as the camera arrives, then a slow, subtle pulse. The pulse period is
  // in real seconds, not a fraction of the scene: a heartbeat that sped up on a short line and
  // crawled on a long one would read as a glitch rather than a rhythm. ---
  const hlIn = ease(frame, arriveFrame - Math.round(fps * 0.6), arriveFrame + Math.round(fps * 0.33));
  const pulse = 0.5 + 0.5 * Math.sin(((frame - arriveFrame) / fps) * Math.PI * 2 * (1 / 2.4));
  // In place mode the country highlight is context during the descent, not the destination — once
  // the country fills the frame a full-strength gold fill just washes the whole shot yellow, so it
  // backs off as the camera closes and lets the pin carry the arrival.
  // interpolate() needs an ascending input range and distance runs the other way, so read it as
  // "closer -> dimmer" with the endpoints swapped rather than reversing the range.
  const contextFade = place
    ? interpolate(dist, [1.9, 2.8], [0.22, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;
  const highlightOpacity = hlIn * (0.62 + 0.22 * Math.max(0, pulse)) * contextFade;

  // Borders and labels arrive with the camera rather than being painted across the establishing
  // wide, so the first thing the viewer sees is a planet, not a map.
  const chromeIn = ease(frame, Math.round(arriveFrame * 0.45), arriveFrame);

  const nightUniforms = useMemo(
    () => ({
      nightMap: {value: null as THREE.Texture | null},
      sunDir: {value: new THREE.Vector3()},
      intensity: {value: 1},
    }),
    [],
  );
  const atmoUniforms = useMemo(() => ({sunDir: {value: new THREE.Vector3()}}), []);

  if (!ready || !aim) return null;

  nightUniforms.nightMap.value = nightTex;
  nightUniforms.sunDir.value = sunDir;
  atmoUniforms.sunDir.value = sunDir;

  return (
    <AbsoluteFill style={{backgroundColor: '#000206'}}>
      <ThreeCanvas linear width={width} height={height}>
        <CameraRig position={camPos} fov={42} aspect={width / height} />
        {/* Barely any ambient: one sun does the work, exactly as in orbit. */}
        <ambientLight intensity={0.045} />
        <directionalLight position={sunDir.clone().multiplyScalar(10)} intensity={2.6} />

        {/* Stars — a huge inside-out sphere, unlit. */}
        <mesh>
          <sphereGeometry args={[38, 32, 32]} />
          <meshBasicMaterial map={starsTex} side={THREE.BackSide} depthWrite={false} />
        </mesh>

        {/* Earth */}
        <mesh>
          <sphereGeometry args={[1, 128, 128]} />
          <meshPhongMaterial
            map={dayTex}
            normalMap={normalTex}
            normalScale={new THREE.Vector2(0.85, 0.85)}
            specularMap={specTex}
            specular={new THREE.Color('#2a3f57')}
            shininess={18}
          />
        </mesh>

        {/* City lights, only where it is actually night. */}
        <mesh>
          <sphereGeometry args={[1.0008, 128, 128]} />
          <shaderMaterial
            args={[
              {
                uniforms: nightUniforms,
                vertexShader: NIGHT_VERT,
                fragmentShader: NIGHT_FRAG,
              },
            ]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Country borders — faint, and only once the camera has closed in. */}
        <mesh>
          <sphereGeometry args={[1.0015, 128, 128]} />
          <meshBasicMaterial map={bordersTex} transparent opacity={chromeIn * 0.75} depthWrite={false} />
        </mesh>

        {/* Target-country highlight. Additive rather than alpha-composited: a translucent gold laid
            flat over satellite terrain reads as muddy khaki, additive actually glows. */}
        {highlightTex ? (
          <mesh>
            <sphereGeometry args={[1.003, 128, 128]} />
            <meshBasicMaterial
              map={highlightTex}
              transparent
              opacity={highlightOpacity}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ) : null}

        {/* Clouds — full strength, lit by the same sun so they darken into night with everything
            else, and drifting slowly. */}
        <mesh rotation={[0, frame * 0.00045, 0]}>
          <sphereGeometry args={[1.012, 96, 96]} />
          <meshLambertMaterial
            color="#ffffff"
            alphaMap={cloudsTex}
            transparent
            opacity={0.92}
            depthWrite={false}
          />
        </mesh>

        {/* Atmosphere — fresnel rim, brightest along the day limb rather than uniformly. */}
        <mesh>
          <sphereGeometry args={[1.055, 96, 96]} />
          <shaderMaterial
            args={[
              {
                uniforms: atmoUniforms,
                vertexShader: ATMO_VERT,
                fragmentShader: ATMO_FRAG,
              },
            ]}
            side={THREE.BackSide}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </ThreeCanvas>
      <CountryLabels
        labels={shownLabels}
        targetKey={targetKey}
        camPos={camPos}
        sunDir={sunDir}
        fov={42}
        width={width}
        height={height}
        opacity={chromeIn}
        // With a place in shot, the country names step back so the place itself is the focal point.
        dim={place ? 0.55 : 1}
      />
      {place ? (
        <PlaceMarker
          place={place}
          camPos={camPos}
          fov={42}
          width={width}
          height={height}
          frame={frame}
          arriveFrame={arriveFrame}
          fps={fps}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Place marker — the pin the camera flies down onto.                  */
/* ------------------------------------------------------------------ */

const PlaceMarker: React.FC<{
  place: GlobePlace;
  camPos: THREE.Vector3;
  fov: number;
  width: number;
  height: number;
  frame: number;
  arriveFrame: number;
  fps: number;
}> = ({place, camPos, fov, width, height, frame, arriveFrame, fps}) => {
  const camera = useMemo(
    () => new THREE.PerspectiveCamera(fov, width / height, 0.1, 100),
    [fov, width, height],
  );
  camera.position.copy(camPos);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld(true);

  const p = latLonToVector3(place.lat, place.lon, 1.004);
  const ndc = p.clone().project(camera);
  const x = (ndc.x * 0.5 + 0.5) * width;
  const y = (1 - (ndc.y * 0.5 + 0.5)) * height;

  // The pin lands a little before the camera settles, so the viewer's eye is already on the spot
  // by the time the move stops rather than hunting for it afterwards. Timed in seconds, not in
  // fractions of the scene, so the ping keeps the same rhythm whatever the narration line's length.
  const pinStart = arriveFrame - Math.round(fps * 1.85);
  const dropIn = ease(frame, pinStart, arriveFrame - Math.round(fps * 0.6));
  if (dropIn <= 0.001) return null;

  // Two rings, offset in phase, expanding and fading — a sonar ping rather than a blinking dot.
  const ringAt = (phase: number) => {
    const p2 = ((((frame - pinStart) / fps / 2.2 + phase) % 1) + 1) % 1;
    return {r: 10 + p2 * 62, o: (1 - p2) * 0.75};
  };
  const rings = [ringAt(0), ringAt(0.5)];

  return (
    <AbsoluteFill style={{opacity: dropIn}}>
      {rings.map((r, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x - r.r,
            top: y - r.r,
            width: r.r * 2,
            height: r.r * 2,
            borderRadius: '50%',
            border: '2px solid rgba(255,207,61,0.9)',
            opacity: r.o,
            pointerEvents: 'none',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: x - 7,
          top: y - 7,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#ffcf3d',
          boxShadow: '0 0 18px rgba(255,207,61,0.95), 0 0 44px rgba(255,207,61,0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y + 26,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, system-ui, sans-serif',
          textShadow: '0 2px 16px rgba(0,0,0,0.95)',
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          {place.name}
        </div>
        {place.sub ? (
          <div
            style={{
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: 2.6,
              textTransform: 'uppercase',
              color: 'rgba(255,207,61,0.95)',
              marginTop: 6,
            }}
          >
            {place.sub}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Camera — imperative, since its position must change every Remotion  */
/* frame rather than animate via three.js's own (unsynced) rAF loop.   */
/* ------------------------------------------------------------------ */

const CameraRig: React.FC<{position: THREE.Vector3; fov: number; aspect: number}> = ({
  position,
  fov,
  aspect,
}) => {
  const {camera} = useThree();
  camera.position.copy(position);
  camera.lookAt(0, 0, 0);
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.fov = fov;
    camera.aspect = aspect;
    camera.near = 0.1;
    camera.far = 100;
    camera.updateProjectionMatrix();
  }
  return null;
};

/* ------------------------------------------------------------------ */
/* Country name labels — projected to screen space each frame so they  */
/* stay upright and legible at any camera distance.                    */
/* ------------------------------------------------------------------ */

const CountryLabels: React.FC<{
  labels: {key: string; name: string; lon: number; lat: number; r: number}[];
  targetKey: string;
  camPos: THREE.Vector3;
  sunDir: THREE.Vector3;
  fov: number;
  width: number;
  height: number;
  opacity: number;
  /** scales all label opacity down when something else in shot should lead the eye */
  dim?: number;
}> = ({labels, targetKey, camPos, sunDir, fov, width, height, opacity, dim = 1}) => {
  const camera = useMemo(
    () => new THREE.PerspectiveCamera(fov, width / height, 0.1, 100),
    [fov, width, height],
  );
  camera.position.copy(camPos);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld(true);

  const camDir = camPos.clone().normalize();

  type Placed = {x: number; y: number; o: number; big: boolean; text: string; w: number; h: number};
  const placed: Placed[] = [];

  for (const l of labels) {
    const p = latLonToVector3(l.lat, l.lon, 1.02);
    const n = p.clone().normalize();
    const facing = n.dot(camDir);
    if (facing < 0.1) continue; // far side of the globe
    // Don't label a country the sun has left in darkness — a name floating over black night side
    // is the sort of thing that gives the map-overlay look away.
    const lit = n.dot(sunDir);
    if (lit < -0.15) continue;
    const ndc = p.clone().project(camera);
    if (ndc.z > 1) continue;
    const x = (ndc.x * 0.5 + 0.5) * width;
    const y = (1 - (ndc.y * 0.5 + 0.5)) * height;
    if (x < 0 || x > width || y < 0 || y > height) continue;
    const edgeFade = Math.min(1, (facing - 0.1) / 0.25);
    const nightFade = Math.min(1, (lit + 0.15) / 0.35);
    const big = l.key === targetKey;
    const fontSize = big ? 27 : 17;
    const w = l.name.length * fontSize * 0.62;
    const h = fontSize * 1.3;
    const overlaps = placed.some(
      (q) => Math.abs(q.x - x) < (q.w + w) / 2 + 12 && Math.abs(q.y - y) < (q.h + h) / 2 + 8,
    );
    if (overlaps) continue;
    placed.push({x, y, o: edgeFade * nightFade, big, text: l.name, w, h});
  }

  return (
    <AbsoluteFill style={{opacity: opacity * dim}}>
      {placed.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: p.big ? 27 : 17,
            fontWeight: p.big ? 600 : 500,
            letterSpacing: p.big ? 3.4 : 2.2,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.94)',
            textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.8)',
            opacity: p.o * (p.big ? 1 : 0.72),
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {p.text}
        </div>
      ))}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Asset loading — Remotion must hold the render until these resolve.  */
/* ------------------------------------------------------------------ */

function useDelayedTexture(url: string | null): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!url) return;
    const handle = delayRender(`RealisticGlobe texture: ${url}`);
    let cancelled = false;
    new THREE.TextureLoader().load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        if (!cancelled) setTexture(tex);
        continueRender(handle);
      },
      undefined,
      (err) => {
        // eslint-disable-next-line no-console
        console.error(`RealisticGlobe: failed to load ${url}`, err);
        continueRender(handle);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [url]);
  return texture;
}

function useJsonAsset<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const handle = delayRender(`RealisticGlobe json: ${url}`);
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json as T);
        continueRender(handle);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`RealisticGlobe: failed to load ${url}`, err);
        continueRender(handle);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);
  return data;
}

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

/** City lights, masked to the night side and faded through the terminator. */
const NIGHT_VERT = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const NIGHT_FRAG = `
  uniform sampler2D nightMap;
  uniform vec3 sunDir;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    float d = dot(normalize(vNormalW), normalize(sunDir));
    // 1 deep in shadow, 0 in daylight, with the falloff spread across the terminator.
    float night = smoothstep(0.08, -0.22, d);
    vec3 lights = texture2D(nightMap, vUv).rgb;
    gl_FragColor = vec4(lights * night * intensity, 1.0);
  }
`;

/** Fresnel atmosphere, warmer and brighter along the lit limb than around the dark one. */
const ATMO_VERT = `
  varying vec3 vNormalV;
  varying vec3 vNormalW;
  void main() {
    vNormalV = normalize(normalMatrix * normal);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMO_FRAG = `
  uniform vec3 sunDir;
  varying vec3 vNormalV;
  varying vec3 vNormalW;
  void main() {
    float rim = pow(0.72 - dot(vNormalV, vec3(0.0, 0.0, 1.0)), 3.0);
    float lit = clamp(dot(normalize(vNormalW), normalize(sunDir)) * 1.15 + 0.28, 0.0, 1.0);
    vec3 col = mix(vec3(0.18, 0.30, 0.62), vec3(0.52, 0.72, 1.0), lit);
    gl_FragColor = vec4(col * rim * (0.35 + 1.25 * lit), 1.0);
  }
`;
