import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../theme';
import {hexA} from './base';
import {
  CANADA,
  FLORIDA,
  LL,
  MEXICO,
  MICHIGAN,
  USA_OUTLINE,
  WORLD,
  flat,
  ortho,
  polyLen,
  quadLen,
  toPath,
  toSmoothPath,
} from '../geo';

/* ================================================================== */
/* GLOBE — orthographic sphere, USA highlighted amber, amber pin.     */
/* ================================================================== */

const graticule = (center: LL, r: number, cx: number, cy: number) => {
  const paths: string[] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: {x: number; y: number}[] = [];
    for (let lon = -180; lon <= 180; lon += 4) {
      const p = ortho([lon, lat], center, r, cx, cy);
      if (p) pts.push(p);
      else if (pts.length > 1) {
        paths.push(toPath(pts, false));
        pts.length = 0;
      }
    }
    if (pts.length > 1) paths.push(toPath(pts, false));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts: {x: number; y: number}[] = [];
    for (let lat = -88; lat <= 88; lat += 3) {
      const p = ortho([lon, lat], center, r, cx, cy);
      if (p) pts.push(p);
      else if (pts.length > 1) {
        paths.push(toPath(pts, false));
        pts.length = 0;
      }
    }
    if (pts.length > 1) paths.push(toPath(pts, false));
  }
  return paths;
};

const orthoPath = (poly: LL[], center: LL, r: number, cx: number, cy: number) => {
  const pts = poly
    .map((ll) => ortho(ll, center, r, cx, cy))
    .filter(Boolean) as {x: number; y: number}[];
  return pts.length > 2 ? toSmoothPath(pts) : '';
};

/**
 * Cloud wisps, deterministic per index so they are stable frame to frame.
 * Drawn inside the sphere clip so they read as weather on the globe rather
 * than shapes floating over it.
 */
const CLOUDS = Array.from({length: 84}).map((_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  const c = Math.sin(i * 39.425) * 24634.6345;
  const f = (v: number) => v - Math.floor(v);
  return {
    u: f(a) * 2 - 1, // -1..1 across the sphere
    v: f(b) * 1.7 - 0.85,
    rx: 0.035 + f(c) * 0.11,
    ry: 0.014 + f(a * 3) * 0.03,
    rot: f(b * 5) * 46 - 23,
    op: 0.09 + f(c * 7) * 0.17,
  };
});

export const Globe: React.FC<{
  /** viewing centre [lon, lat] — animate this to spin the globe */
  center: LL;
  radius: number;
  cx: number;
  cy: number;
  /** 0..1 — how strongly the USA is picked out in gold */
  highlight?: number;
  /** pins to drop on the surface, each with its own 0..1 reveal */
  pins?: {ll: LL; k: number; color?: string}[];
  opacity?: number;
  /** drives the slow drift of the cloud layer */
  frame?: number;
  /** where the sun sits, [lon, lat] — drives the terminator and the ocean specular */
  sun?: LL;
}> = ({center, radius: r, cx, cy, highlight = 0, pins = [], opacity = 1, frame = 0, sun}) => {
  const grat = graticule(center, r, cx, cy);
  const usa = orthoPath(USA_OUTLINE, center, r, cx, cy);
  const can = orthoPath(CANADA, center, r, cx, cy);
  const mex = orthoPath(MEXICO, center, r, cx, cy);
  // The rest of the planet. Without this the globe is North America on an empty blue ball,
  // which reads as a diagram rather than as Earth.
  const world = WORLD.map((poly) => orthoPath(poly, center, r, cx, cy)).filter(Boolean);

  // Light the sphere from a real direction rather than a fixed corner: the sun sits slightly
  // up and to the left of whatever the camera is looking at, so the lit face always follows the
  // globe as it turns, and the far limb falls into night.
  const sunLL: LL = sun ?? [center[0] - 26, Math.min(center[1] + 16, 62)];
  const sunPt = ortho(sunLL, center, r, cx, cy);
  const lx = sunPt ? sunPt.x : cx - r * 0.4;
  const ly = sunPt ? sunPt.y : cy - r * 0.4;
  // North pole, for the ice cap — null when it has turned out of view.
  const pole = ortho([center[0], 90], center, r, cx, cy);

  return (
    <AbsoluteFill style={{opacity}}>
      {/* atmosphere — the bright blue rim that reads as air seen edge-on */}
      <div
        style={{
          position: 'absolute',
          left: cx - r * 1.6,
          top: cy - r * 1.6,
          width: r * 3.2,
          height: r * 3.2,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(70,130,210,0) 30.4%, rgba(96,160,240,0.30) 31.25%, rgba(80,140,225,0.16) 33.4%, rgba(60,110,190,0.05) 37%, rgba(0,0,0,0) 44%)',
          filter: 'blur(1.5px)',
        }}
      />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', left: 0, top: 0}}
      >
        <defs>
          {/* Ocean, lit from the sun's actual projected position so the bright water sits under
              the sun rather than in a fixed corner. Deep water darkens toward the limb. */}
          <radialGradient
            id="ocean"
            gradientUnits="userSpaceOnUse"
            cx={lx}
            cy={ly}
            r={r * 1.9}
          >
            <stop offset="0%" stopColor="#1d5285" />
            <stop offset="22%" stopColor="#14406b" />
            <stop offset="48%" stopColor="#0c2b4a" />
            <stop offset="76%" stopColor="#061a2e" />
            <stop offset="100%" stopColor="#030b15" />
          </radialGradient>
          {/* Night side: transparent where the sun is, opaque black on the far limb. */}
          <radialGradient
            id="night"
            gradientUnits="userSpaceOnUse"
            cx={lx}
            cy={ly}
            r={r * 2.05}
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="42%" stopColor="rgba(0,0,0,0.06)" />
            <stop offset="68%" stopColor="rgba(2,6,14,0.42)" />
            <stop offset="88%" stopColor="rgba(1,3,9,0.76)" />
            <stop offset="100%" stopColor="rgba(0,1,4,0.90)" />
          </radialGradient>
          {/* The sun's reflection off the water — small, tight, and only on the day side. */}
          <radialGradient
            id="specular"
            gradientUnits="userSpaceOnUse"
            cx={lx}
            cy={ly}
            r={r * 0.5}
          >
            <stop offset="0%" stopColor="rgba(180,215,250,0.20)" />
            <stop offset="45%" stopColor="rgba(150,200,245,0.07)" />
            <stop offset="100%" stopColor="rgba(120,180,235,0)" />
          </radialGradient>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f4a33" />
            <stop offset="55%" stopColor="#36402c" />
            <stop offset="100%" stopColor="#2b3324" />
          </linearGradient>
          <radialGradient id="ice" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(238,246,255,0.85)" />
            <stop offset="55%" stopColor="rgba(220,236,252,0.40)" />
            <stop offset="100%" stopColor="rgba(210,230,250,0)" />
          </radialGradient>
          <filter id="cloudBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={Math.max(3, r * 0.022)} />
          </filter>
          <radialGradient id="rim" cx="50%" cy="50%" r="50%">
            <stop offset="94%" stopColor="rgba(120,180,255,0)" />
            <stop offset="99.4%" stopColor="rgba(150,200,255,0.22)" />
            <stop offset="100%" stopColor="rgba(150,200,255,0)" />
          </radialGradient>
          <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="sphereClip">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>

        <circle cx={cx} cy={cy} r={r} fill="url(#ocean)" />
        <g clipPath="url(#sphereClip)">
          {grat.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(140,190,240,0.07)" strokeWidth={1} />
          ))}
          {/* land, in the warm dark of a real Earth texture rather than grey */}
          {world.map((d, i) => (
            <path key={`w${i}`} d={d} fill="url(#land)" stroke="rgba(120,140,120,0.20)" strokeWidth={1} />
          ))}
          {can ? <path d={can} fill="#2c3327" stroke="rgba(120,140,120,0.22)" strokeWidth={1} /> : null}
          {mex ? <path d={mex} fill="#3a3527" stroke="rgba(140,130,105,0.22)" strokeWidth={1} /> : null}
          {usa ? (
            <path
              d={usa}
              fill="#343a2c"
              stroke="rgba(130,145,125,0.25)"
              strokeWidth={1}
            />
          ) : null}

          {/* Polar ice. Kept small and faint, and only drawn while the pole is well inside the
              disc — at full size it merged with the sun's glint into one white smear across the
              top of the sphere instead of reading as an ice cap. */}
          {pole && Math.hypot(pole.x - cx, pole.y - cy) < r * 0.86 ? (
            <ellipse cx={pole.x} cy={pole.y} rx={r * 0.24} ry={r * 0.1} fill="url(#ice)" opacity={0.55} />
          ) : null}

          {/* weather, under the highlight so the gold stays clean */}
          <g filter="url(#cloudBlur)">
            {CLOUDS.map((c, i) => {
              const drift = ((frame * 0.00034 + i * 0.0137) % 2) - 1;
              const u = ((c.u + drift + 3) % 2) - 1;
              const x = cx + u * r * 0.98;
              const y = cy + c.v * r * 0.92;
              // fade the wisp out as it approaches the limb, like a real sphere
              const d = Math.hypot(x - cx, y - cy) / r;
              const edge = Math.max(0, 1 - Math.max(0, (d - 0.7) / 0.3));
              if (edge <= 0.01) return null;
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx={c.rx * r}
                  ry={c.ry * r}
                  fill="#eef3ff"
                  opacity={c.op * edge}
                  transform={`rotate(${c.rot} ${x} ${y})`}
                />
              );
            })}
          </g>

          {usa && highlight > 0.01 ? (
            <path
              d={usa}
              fill={`rgba(226,196,86,${0.82 * highlight})`}
              stroke={`rgba(243,216,116,${0.95 * highlight})`}
              strokeWidth={1.8}
              style={{filter: 'drop-shadow(0 0 26px rgba(226,196,86,0.45))'}}
            />
          ) : null}
        </g>
        {/* the sun's glint on the water, then the night side falling away from it */}
        <g clipPath="url(#sphereClip)">
          <circle cx={cx} cy={cy} r={r} fill="url(#specular)" />
          <circle cx={cx} cy={cy} r={r} fill="url(#night)" />
        </g>
        <circle cx={cx} cy={cy} r={r} fill="url(#rim)" />

        {pins.map((p, i) => {
          const q = ortho(p.ll, center, r, cx, cy);
          if (!q || p.k <= 0) return null;
          // the marker grows with the globe so it never gets lost at full zoom
          const s = Math.max(1, Math.min(2.6, r / 520));
          return <Pin key={i} x={q.x} y={q.y} k={p.k} color={p.color ?? C.amber} scale={s} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* PIN — teardrop marker, drops in and settles.                       */
/* ================================================================== */

export const Pin: React.FC<{x: number; y: number; k: number; color?: string; scale?: number}> = ({
  x,
  y,
  k,
  color = C.amber,
  scale = 1,
}) => {
  const drop = Math.min(1, k * 1.25);
  const s = scale * (0.7 + 0.3 * drop);
  const dy = (1 - drop) * -46;
  const ring = Math.max(0, (k - 0.45) / 0.55);
  return (
    <g transform={`translate(${x} ${y + dy}) scale(${s})`} opacity={Math.min(1, k * 2)}>
      {ring > 0 ? (
        <circle
          cx={0}
          cy={0}
          r={10 + ring * 34}
          fill="none"
          stroke={hexA(color, 0.55 * (1 - ring))}
          strokeWidth={2}
        />
      ) : null}
      <g filter="url(#pinGlow)">
        <path
          d="M 0 0 C -13 -16 -17 -22 -17 -30 A 17 17 0 1 1 17 -30 C 17 -22 13 -16 0 0 Z"
          fill={color}
        />
        <circle cx={0} cy={-30} r={6.4} fill="#12100c" />
      </g>
    </g>
  );
};

/* ================================================================== */
/* NAME PLATE — the clean bottom plate from the reference frame.      */
/* ================================================================== */

export const NamePlate: React.FC<{
  text: string;
  sub?: string;
  k: number;
  y?: number;
  cx?: number;
}> = ({text, sub, k, y = 902, cx = 960}) => {
  const o = Math.min(1, k * 1.4);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: 1920,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${(1 - o) * 22}px)`,
      }}
    >
      <div
        style={{
          background: 'rgba(12,12,15,0.80)',
          border: `1px solid ${C.hairlineStrong}`,
          borderRadius: 10,
          padding: sub ? '14px 40px 16px' : '15px 44px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 5.2,
            textTransform: 'uppercase',
            color: C.text,
            lineHeight: 1.1,
          }}
        >
          {text}
        </div>
        {sub ? (
          <div
            style={{
              fontFamily: FONT,
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: 3.4,
              textTransform: 'uppercase',
              color: C.muted,
              marginTop: 7,
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  );
};

/**
 * PLACE PLATE — the bordered name plate that sits along the bottom of the
 * globe, naming the location the pin just landed on.
 */
export const PlacePlate: React.FC<{text: string; k: number; y?: number}> = ({
  text,
  k,
  y = 892,
}) => {
  const o = Math.min(1, k * 1.5);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: 1920,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${(1 - o) * 16}px)`,
      }}
    >
      <div
        style={{
          background: 'rgba(9,11,16,0.90)',
          border: '1.5px solid rgba(180,205,240,0.55)',
          borderRadius: 8,
          padding: '13px 34px 14px',
          boxShadow: '0 18px 54px rgba(0,0,0,0.7)',
          fontFamily: FONT,
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: 2.6,
          textTransform: 'uppercase',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ================================================================== */
/* FLAT US MAP — for route / multi-track scenes.                      */
/* ================================================================== */

export type FlatOpts = {lon0: number; lat0: number; scale: number; cx: number; cy: number};

export const flatPath = (poly: LL[], o: FlatOpts) => toPath(poly.map((ll) => flat(ll, o)));

export const USMap: React.FC<{
  opts: FlatOpts;
  /** 0..1 outline draw progress */
  draw?: number;
  /** highlight one state polygon */
  state?: 'michigan' | 'florida' | null;
  stateK?: number;
  fill?: string;
  children?: React.ReactNode;
}> = ({opts, draw = 1, state = null, stateK = 0, fill = 'rgba(36,44,56,0.55)', children}) => {
  const usaPts = USA_OUTLINE.map((ll) => flat(ll, opts));
  const usa = toPath(usaPts);
  const usaLen = polyLen(usaPts, true);
  const st = state === 'michigan' ? MICHIGAN : state === 'florida' ? FLORIDA : null;
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{position: 'absolute', left: 0, top: 0}}
    >
      <defs>
        <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(56,68,86,0.80)" />
          <stop offset="100%" stopColor="rgba(26,32,42,0.70)" />
        </linearGradient>
      </defs>
      <path
        d={usa}
        fill={draw > 0.88 ? 'url(#landFill)' : 'none'}
        fillOpacity={Math.max(0, (draw - 0.88) / 0.12)}
        stroke="rgba(165,192,224,0.68)"
        strokeWidth={2}
        strokeDasharray={usaLen}
        strokeDashoffset={usaLen * (1 - Math.min(1, draw / 0.88))}
        style={{filter: 'drop-shadow(0 0 26px rgba(70,125,190,0.35))'}}
      />
      {st ? (
        <path
          d={flatPath(st, opts)}
          fill={hexA(C.amber, 0.24 * stateK)}
          stroke={hexA(C.amber, 0.85 * stateK)}
          strokeWidth={2}
        />
      ) : null}
      {children}
    </svg>
  );
};

/** A dashed route drawn between projected points. */
export const Route: React.FC<{
  pts: {x: number; y: number}[];
  k: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  /** keeps the dashes marching after the draw completes */
  march?: number;
  /** how far the route bows away from a straight line */
  bow?: number;
}> = ({pts, k, color = C.amber, width = 3, dashed = true, march = 0, bow: bowK = 0.18}) => {
  if (pts.length < 2) return null;
  // smooth arc between consecutive points
  let d = `M ${pts[0].x} ${pts[0].y}`;
  let L = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const nx = -(b.y - a.y);
    const ny = b.x - a.x;
    const len = Math.hypot(nx, ny) || 1;
    const bow = Math.hypot(b.x - a.x, b.y - a.y) * bowK;
    const c = {x: mx + (nx / len) * bow, y: my + (ny / len) * bow};
    d += ` Q ${c.x} ${c.y} ${b.x} ${b.y}`;
    L += quadLen(a, c, b);
  }
  L = L || 1;
  const done = Math.max(0, (k - 0.94) / 0.06);
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={L}
        strokeDashoffset={L * (1 - Math.max(0, Math.min(1, k)))}
        opacity={dashed ? 1 - done * 0.72 : 1}
        style={{filter: `drop-shadow(0 0 14px ${hexA(color, 0.55)})`}}
      />
      {dashed && done > 0 ? (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={width + 1}
          strokeLinecap="round"
          strokeDasharray="16 14"
          strokeDashoffset={-march}
          opacity={done}
          style={{filter: `drop-shadow(0 0 16px ${hexA(color, 0.7)})`}}
        />
      ) : null}
    </g>
  );
};

/** Small label attached to a pin, offset so it never sits on the marker. */
export const PinLabel: React.FC<{
  x: number;
  y: number;
  k: number;
  text: string;
  sub?: string;
  align?: 'left' | 'right';
  color?: string;
  strike?: boolean;
  /** extra vertical offset, px — for a second pin close enough to collide with the first */
  dy?: number;
}> = ({x, y, k, text, sub, align = 'right', color = C.text, strike = false, dy = 0}) => {
  const o = Math.min(1, Math.max(0, (k - 0.25) / 0.5));
  const dx = align === 'right' ? 34 : -34;
  return (
    <div
      style={{
        position: 'absolute',
        left: x + dx,
        top: y - 74 + dy,
        transform: `translateX(${align === 'right' ? 0 : -100}%) translateY(${(1 - o) * 10}px)`,
        opacity: o,
        textAlign: align === 'right' ? 'left' : 'right',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          color,
          textShadow: '0 4px 24px rgba(0,0,0,0.9)',
          textDecoration: strike ? 'line-through' : 'none',
          textDecorationThickness: strike ? 3 : undefined,
        }}
      >
        {text}
      </div>
      {sub ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 2.6,
            textTransform: 'uppercase',
            color: C.muted,
            marginTop: 5,
            textShadow: '0 3px 18px rgba(0,0,0,0.9)',
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};
