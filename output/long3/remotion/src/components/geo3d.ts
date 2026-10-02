import * as THREE from 'three';

/**
 * lat/lon -> a point on a unit sphere, using the exact convention every three.js "textured Earth"
 * tutorial uses because it matches SphereGeometry's built-in UV unwrap: with this formula, a
 * standard equirectangular texture (longitude -180 at the left edge, +90 at the top) dropped
 * straight in as `map` lines up with real geography with no extra UV work. Every texture layer in
 * RealisticGlobe (day map, borders, per-country highlight) relies on that alignment holding, since
 * they were all rasterized in that same convention by build.mjs.
 */
export const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

/** Great-circle distance in degrees between two lat/lon points. */
export const greatCircleDeg = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
  return (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 180) / Math.PI;
};

export type CountryLabel = {name: string; lon: number; lat: number; r: number};
export type Labels = Record<string, CountryLabel>;

export const slugifyCountry = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/**
 * The target country plus its `count - 1` geographically nearest countries, filtered to a minimum
 * size (angular radius `minR`) so a documentary shot of the USA doesn't clutter its neighbor slots
 * with a scattering of Caribbean microstates just because they happen to be close.
 */
export const pickNeighbors = (
  labels: Labels,
  targetKey: string,
  count: number,
  minR = 0.35,
): string[] => {
  const target = labels[targetKey];
  if (!target) return [];
  const rest = Object.entries(labels)
    .filter(([key, l]) => key !== targetKey && l.r >= minR)
    .map(([key, l]) => ({key, d: greatCircleDeg(target.lat, target.lon, l.lat, l.lon)}))
    .sort((a, b) => a.d - b.d)
    .slice(0, Math.max(0, count - 1))
    .map((e) => e.key);
  return [targetKey, ...rest];
};
