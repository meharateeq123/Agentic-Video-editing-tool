// Hand-authored geography for this film's map animations.
// Every coordinate below was typed out for this project — nothing traced,
// downloaded, or imported from a third-party dataset or template.

export type LL = [number, number]; // [lon, lat]

/** Simplified outline of the contiguous United States, clockwise from Cape Flattery. */
export const USA_OUTLINE: LL[] = [
  // Pacific coast, north -> south
  [-124.7, 48.4], [-124.1, 46.9], [-124.0, 45.5], [-124.2, 43.7],
  [-124.4, 42.7], [-124.2, 41.8], [-123.8, 40.4], [-124.4, 40.4],
  [-123.7, 39.0], [-122.5, 37.8], [-122.0, 36.9], [-121.9, 36.6],
  [-120.6, 34.6], [-118.4, 33.7], [-117.1, 32.5],
  // Southern border
  [-114.7, 32.7], [-111.0, 31.3], [-108.2, 31.3], [-106.5, 31.8],
  [-104.9, 29.3], [-103.1, 29.0], [-102.4, 29.8], [-101.4, 29.8],
  [-99.5, 27.6], [-97.4, 25.9],
  // Gulf coast
  [-97.2, 27.9], [-95.3, 28.9], [-93.8, 29.7], [-91.9, 29.2],
  [-89.4, 29.1], [-89.2, 30.3], [-88.0, 30.4], [-86.5, 30.4],
  [-84.3, 30.1], [-83.0, 29.1], [-82.7, 27.5], [-81.8, 26.0],
  [-80.9, 25.2],
  // Atlantic coast, south -> north
  [-80.1, 26.7], [-81.0, 29.0], [-81.3, 30.7], [-80.8, 32.0],
  [-79.2, 33.2], [-77.9, 34.2], [-75.5, 35.2], [-76.0, 36.9],
  [-76.3, 38.0], [-75.1, 38.8], [-74.4, 39.5], [-74.0, 40.7],
  [-72.0, 41.3], [-70.9, 41.6], [-70.0, 41.8], [-70.7, 43.1],
  [-69.0, 44.0], [-67.0, 44.8], [-67.8, 45.7], [-69.2, 47.5],
  // Northern border / Great Lakes
  [-71.5, 45.0], [-74.7, 45.0], [-76.8, 43.6], [-79.0, 43.3],
  [-81.0, 42.3], [-82.4, 41.7], [-83.1, 42.0], [-82.5, 43.6],
  [-83.9, 43.6], [-83.3, 44.9], [-83.4, 45.8], [-84.7, 45.8],
  [-85.6, 45.1], [-86.3, 44.3], [-86.2, 43.0], [-87.0, 42.5],
  [-87.8, 42.4], [-87.6, 44.0], [-87.0, 45.2], [-88.0, 46.0],
  [-87.6, 47.4], [-90.0, 46.7], [-92.1, 46.8], [-92.0, 48.0],
  [-95.2, 49.0], [-104.0, 49.0], [-114.0, 49.0], [-123.0, 49.0],
];

/** Michigan's Lower Peninsula, drawn separately so it can be highlighted alone. */
export const MICHIGAN: LL[] = [
  [-83.1, 42.0], [-82.4, 41.7], [-84.8, 41.7], [-86.8, 41.75],
  [-86.5, 42.6], [-86.2, 43.0], [-86.3, 44.3], [-85.6, 45.1],
  [-84.7, 45.8], [-83.4, 45.8], [-83.3, 44.9], [-83.9, 43.6],
  [-82.5, 43.6],
];

/** Florida, drawn separately for the Daytona beat. */
export const FLORIDA: LL[] = [
  [-85.0, 31.0], [-82.0, 30.6], [-81.4, 30.7], [-81.0, 29.0],
  [-80.1, 26.7], [-80.9, 25.2], [-81.8, 26.0], [-82.7, 27.5],
  [-83.0, 29.1], [-84.3, 30.1], [-85.0, 30.0],
];

/** Rough landmass context so the highlighted USA reads as part of a continent. */
export const CANADA: LL[] = [
  [-141, 69], [-128, 70], [-115, 68.5], [-100, 68], [-95, 62], [-85, 66],
  [-80, 73], [-68, 63], [-64, 60], [-56, 51], [-53, 47], [-60, 46],
  [-66, 45], [-67.8, 45.7], [-69.2, 47.5], [-71.5, 45], [-74.7, 45],
  [-76.8, 43.6], [-79, 43.3], [-83, 42], [-88, 46.5], [-92, 48],
  [-95.2, 49], [-123, 49], [-124.7, 48.4], [-130, 54], [-135, 58], [-141, 60],
];

export const MEXICO: LL[] = [
  [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8],
  [-104.9, 29.3], [-103.1, 29], [-102.4, 29.8], [-101.4, 29.8], [-99.5, 27.6],
  [-97.4, 25.9], [-97.7, 22], [-94.5, 18.2], [-92, 18.6], [-90.5, 21],
  [-87, 21.5], [-88, 18.5], [-92, 15], [-96, 15.7], [-101, 16.5],
  [-105.5, 20.5], [-109, 23], [-112, 26], [-114.5, 29.5], [-113, 31.8],
];

/**
 * The rest of the world, so the globe reads as Earth rather than as North America floating on
 * an empty blue ball. Coarse on purpose — these are silhouettes seen from orbit, drawn to be
 * recognisable at globe scale, not survey outlines. Same hand-authored basis as everything
 * above: typed for this project, nothing traced or imported.
 */
export const SOUTH_AMERICA: LL[] = [
  [-71, 12], [-64, 10], [-60, 8], [-55, 6], [-50, 0], [-44, -2], [-38, -5], [-35, -8],
  [-39, -13], [-40, -20], [-48, -25], [-53, -33], [-57, -38], [-62, -40], [-65, -45],
  [-68, -50], [-68, -55], [-75, -52], [-74, -45], [-73, -37], [-71, -30], [-70, -23],
  [-71, -18], [-77, -12], [-81, -6], [-80, 0], [-77, 7], [-75, 10],
];

export const AFRICA: LL[] = [
  [-6, 36], [3, 37], [10, 37], [20, 32], [26, 32], [32, 31], [35, 24], [38, 18], [43, 12],
  [48, 8], [51, 12], [48, 5], [41, -2], [40, -10], [35, -20], [32, -26], [28, -33],
  [20, -35], [15, -27], [12, -18], [13, -8], [9, -1], [5, 5], [0, 5], [-8, 5], [-14, 11],
  [-17, 15], [-16, 22], [-10, 30],
];

export const EURASIA: LL[] = [
  [-9, 39], [-2, 43], [0, 46], [-1, 49], [4, 52], [8, 54], [10, 57], [18, 59], [25, 60],
  [30, 60], [33, 66], [44, 68], [55, 70], [70, 72], [80, 73], [90, 75], [100, 76],
  [110, 74], [120, 73], [130, 72], [140, 72], [150, 70], [162, 69], [172, 66], [170, 60],
  [160, 58], [155, 52], [145, 45], [135, 45], [130, 40], [122, 38], [120, 33], [118, 25],
  [110, 20], [105, 10], [100, 5], [95, 15], [90, 22], [80, 15], [77, 8], [72, 20],
  [68, 25], [60, 25], [57, 23], [52, 17], [43, 12], [38, 18], [35, 24], [34, 30],
  [36, 36], [40, 37], [28, 41], [23, 40], [18, 40], [12, 44], [7, 43], [3, 42], [0, 39],
  [-5, 36],
];

export const AUSTRALIA: LL[] = [
  [113, -22], [114, -27], [115, -34], [119, -34], [129, -32], [135, -35], [138, -35],
  [140, -38], [145, -38], [150, -37], [153, -28], [146, -19], [145, -15], [142, -11],
  [137, -12], [130, -12], [125, -14], [122, -18],
];

export const GREENLAND: LL[] = [
  [-45, 60], [-50, 64], [-53, 68], [-55, 71], [-58, 75], [-60, 78], [-55, 82], [-45, 83],
  [-30, 83], [-22, 80], [-20, 76], [-22, 72], [-28, 68], [-38, 65], [-43, 60],
];

export const BRITISH_ISLES: LL[] = [
  [-5, 50], [-3, 51], [1, 51], [0, 53], [-1, 54], [-3, 56], [-5, 58], [-6, 57], [-5, 55],
  [-5, 53],
];

export const JAPAN: LL[] = [
  [130, 31], [132, 34], [136, 34], [139, 35], [141, 38], [141, 41], [140, 43], [145, 44],
  [143, 42], [140, 40], [137, 37], [133, 34],
];

export const MADAGASCAR: LL[] = [
  [43, -12], [50, -15], [50, -20], [47, -25], [45, -25], [43, -21], [43, -16],
];

/** Everything except the USA, which the Globe draws separately so it can be highlighted. */
export const WORLD: LL[][] = [
  SOUTH_AMERICA, AFRICA, EURASIA, AUSTRALIA, GREENLAND, BRITISH_ISLES, JAPAN, MADAGASCAR,
];

/** Race tracks named in the narration. */
export const TRACKS = {
  pocono: {name: 'Pocono', place: 'Long Pond, Pennsylvania', ll: [-75.51, 41.05] as LL},
  watkinsGlen: {name: 'Watkins Glen', place: 'New York', ll: [-76.93, 42.34] as LL},
  berlin: {name: 'Berlin Raceway', place: 'Marne, Michigan', ll: [-85.82, 42.99] as LL},
  talladega: {name: 'Talladega', place: 'Alabama', ll: [-86.07, 33.57] as LL},
  charlotte: {name: 'Charlotte', place: 'North Carolina', ll: [-80.68, 35.35] as LL},
  daytona: {name: 'Daytona', place: 'Florida', ll: [-81.07, 29.19] as LL},
  rockingham: {name: 'Rockingham', place: 'North Carolina', ll: [-79.63, 34.97] as LL},
  nashville: {name: 'Nashville', place: 'Tennessee', ll: [-86.41, 36.02] as LL},
};

/** The standard flat-US framing, shared by every scene that draws the US map. */
export const US_OPTS = {lon0: -96, lat0: 38, scale: 28.4, cx: 960, cy: 520};

const RAD = Math.PI / 180;

/**
 * Orthographic (globe) projection.
 * Returns null when the point is on the far side of the sphere.
 */
export const ortho = (
  ll: LL,
  center: LL,
  radius: number,
  cx: number,
  cy: number
): {x: number; y: number} | null => {
  const l = ll[0] * RAD;
  const p = ll[1] * RAD;
  const l0 = center[0] * RAD;
  const p0 = center[1] * RAD;
  const cosc =
    Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l - l0);
  if (cosc < 0) return null;
  const x = cx + radius * Math.cos(p) * Math.sin(l - l0);
  const y =
    cy -
    radius * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l - l0));
  return {x, y};
};

/** Flat map projection: equirectangular with a latitude-correct aspect. */
export const flat = (
  ll: LL,
  opts: {lon0: number; lat0: number; scale: number; cx: number; cy: number}
) => {
  const k = Math.cos(opts.lat0 * RAD);
  return {
    x: opts.cx + (ll[0] - opts.lon0) * opts.scale * k,
    y: opts.cy - (ll[1] - opts.lat0) * opts.scale,
  };
};

/** Polyline length — used so stroke-dash draws finish exactly on cue. */
export const polyLen = (pts: {x: number; y: number}[], close = false) => {
  let L = 0;
  for (let i = 1; i < pts.length; i++) {
    L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  if (close && pts.length > 1) {
    L += Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].y - pts[pts.length - 1].y);
  }
  return L || 1;
};

/** Cheap but close-enough length of a quadratic bezier. */
export const quadLen = (
  a: {x: number; y: number},
  c: {x: number; y: number},
  b: {x: number; y: number}
) => {
  const chord = Math.hypot(b.x - a.x, b.y - a.y);
  const net = Math.hypot(c.x - a.x, c.y - a.y) + Math.hypot(b.x - c.x, b.y - c.y);
  return (chord + net) / 2 || 1;
};

/**
 * Coastline as a smooth curve rather than a chain of straight segments. The outlines above are
 * coarse by design, and drawn with `L` they read as cut paper — a Catmull-Rom spline through the
 * same points gives the organic edge a real coast has, without needing more coordinates.
 */
export const toSmoothPath = (pts: {x: number; y: number}[], close = true) => {
  if (pts.length < 3) return toPath(pts, close);
  const p = close ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M ${p[1].x.toFixed(2)} ${p[1].y.toFixed(2)}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [a, b, c, e] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const c1 = {x: b.x + (c.x - a.x) / 6, y: b.y + (c.y - a.y) / 6};
    const c2 = {x: c.x - (e.x - b.x) / 6, y: c.y - (e.y - b.y) / 6};
    d += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`;
  }
  return close ? `${d} Z` : d;
};

export const toPath = (pts: {x: number; y: number}[], close = true) =>
  pts.length === 0
    ? ''
    : `M ${pts.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ')}${
        close ? ' Z' : ''
      }`;
