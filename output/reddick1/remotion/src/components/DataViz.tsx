import React from 'react';
import {interpolate, Easing} from 'remotion';
import {C, FONT} from '../theme';
import {hexA} from './base';
import {polyLen} from '../geo';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Eased 0..1 over a frame window. */
export const p = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Counts up to `to`, snapping to integers. */
export const countTo = (k: number, to: number, from = 0) =>
  Math.round(from + (to - from) * clamp01(k));

const ordinalSuffix = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export const Ordinal: React.FC<{n: number; size: number; color?: string}> = ({
  n,
  size,
  color = C.text,
}) => (
  <span
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      color,
      letterSpacing: -size * 0.035,
      lineHeight: 0.92,
      fontVariantNumeric: 'tabular-nums',
      display: 'inline-flex',
      alignItems: 'flex-start',
    }}
  >
    {n}
    <span style={{fontSize: size * 0.34, fontWeight: 700, marginTop: size * 0.1, letterSpacing: 0}}>
      {ordinalSuffix(n)}
    </span>
  </span>
);

/* ------------------------------------------------------------------ */
/* RING STAT — the reference frame's translucent card:                */
/* small uppercase label, big number inside an arc, one short caption. */
/* ------------------------------------------------------------------ */

export const RingStat: React.FC<{
  label: string;
  /** what to render in the middle of the ring */
  value: React.ReactNode;
  caption?: string;
  /** 0..1 arc fill */
  arc: number;
  /** 0..1 card entrance */
  k: number;
  accent?: string;
  x: number;
  y: number;
  size?: number;
}> = ({label, value, caption, arc, k, accent = C.amber, x, y, size = 400}) => {
  const o = clamp01(k * 1.3);
  const R = size * 0.29;
  const CIRC = 2 * Math.PI * R;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        opacity: o,
        transform: `translateY(${(1 - o) * 26}px) scale(${0.965 + 0.035 * o})`,
        transformOrigin: '50% 40%',
        background: C.card,
        border: `1px solid ${C.hairline}`,
        borderRadius: 20,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.66)',
        padding: `${size * 0.075}px 0 ${size * 0.065}px`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: size * 0.049,
          fontWeight: 600,
          letterSpacing: size * 0.0165,
          textTransform: 'uppercase',
          color: C.muted,
          paddingLeft: size * 0.017,
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: 'relative',
          width: size,
          height: size * 0.66,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={size}
          height={size * 0.66}
          style={{position: 'absolute', left: 0, top: 0}}
        >
          <g transform={`translate(${size / 2} ${size * 0.33}) rotate(-90)`}>
            <circle r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={size * 0.026} />
            <circle
              r={R}
              fill="none"
              stroke={accent}
              strokeWidth={size * 0.026}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - clamp01(arc))}
              style={{filter: `drop-shadow(0 0 14px ${hexA(accent, 0.6)})`}}
            />
          </g>
        </svg>
        <div style={{position: 'relative'}}>{value}</div>
      </div>
      {caption ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: size * 0.047,
            fontWeight: 500,
            color: C.muted,
            padding: `0 ${size * 0.09}px`,
            lineHeight: 1.3,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* STAT CARD — label / focal number / caption, no ring.               */
/* ------------------------------------------------------------------ */

export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  caption?: string;
  k: number;
  accent?: string;
  x: number;
  y: number;
  width: number;
  align?: 'left' | 'center';
  pad?: number;
}> = ({label, value, caption, k, accent = C.steel, x, y, width, align = 'left', pad = 34}) => {
  const o = clamp01(k * 1.3);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity: o,
        transform: `translateY(${(1 - o) * 24}px)`,
        background: C.card,
        border: `1px solid ${C.hairline}`,
        borderRadius: 18,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 26px 78px rgba(0,0,0,0.62)',
        padding: pad,
        textAlign: align,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 3,
          height: `${clamp01(k * 1.6) * 100}%`,
          background: accent,
          boxShadow: `0 0 22px ${hexA(accent, 0.7)}`,
        }}
      />
      <div
        style={{
          fontFamily: FONT,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: 3.1,
          textTransform: 'uppercase',
          color: C.muted,
        }}
      >
        {label}
      </div>
      <div style={{marginTop: 14}}>{value}</div>
      {caption ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 21,
            fontWeight: 500,
            color: C.muted,
            marginTop: 14,
            lineHeight: 1.35,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* COMPARE BARS — compact horizontal comparison (reference frame B).  */
/* ------------------------------------------------------------------ */

export type BarRow = {
  name: string;
  /** 0..1 of the track width */
  frac: number;
  value: string;
  color: string;
};

export const CompareBars: React.FC<{
  title: string;
  rows: BarRow[];
  /** 0..1 card entrance */
  k: number;
  /** per-row grow progress, 0..1 */
  grow: number[];
  x: number;
  y: number;
  width: number;
  footnote?: string;
  nameW?: number;
  rowH?: number;
}> = ({title, rows, k, grow, x, y, width, footnote, nameW = 148, rowH = 54}) => {
  const o = clamp01(k * 1.3);
  const pad = 30;
  const trackW = width - pad * 2 - nameW - 120;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity: o,
        transform: `translateY(${(1 - o) * 22}px)`,
        background: C.card,
        border: `1px solid ${C.hairline}`,
        borderRadius: 18,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 26px 78px rgba(0,0,0,0.62)',
        padding: pad,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: C.muted,
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{height: rowH, display: 'flex', alignItems: 'center', gap: 16}}
        >
          <div
            style={{
              width: nameW,
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: C.text,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {r.name}
          </div>
          <div style={{width: trackW, height: 16, background: 'rgba(255,255,255,0.07)', borderRadius: 8}}>
            <div
              style={{
                width: trackW * r.frac * clamp01(grow[i] ?? 0),
                height: 16,
                borderRadius: 8,
                background: r.color,
                boxShadow: `0 0 18px ${hexA(r.color, 0.55)}`,
              }}
            />
          </div>
          <div
            style={{
              width: 104,
              textAlign: 'right',
              fontFamily: FONT,
              fontSize: 24,
              fontWeight: 800,
              color: r.color,
              fontVariantNumeric: 'tabular-nums',
              opacity: clamp01(((grow[i] ?? 0) - 0.6) / 0.4),
            }}
          >
            {r.value}
          </div>
        </div>
      ))}
      {footnote ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 2.2,
            textTransform: 'uppercase',
            color: C.muted,
            marginTop: 16,
          }}
        >
          {footnote}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* POSITION CHART — running position across a race (P1 at the top).   */
/* ------------------------------------------------------------------ */

export const PositionChart: React.FC<{
  /** [lap, position] pairs */
  data: [number, number][];
  maxLap: number;
  /** best (smallest) and worst position shown on the axis */
  top: number;
  bottom: number;
  /** 0..1 draw progress along the line */
  draw: number;
  k: number;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  color?: string;
  /** optional colour change past this lap fraction */
  fadeColor?: string;
  fadeFrom?: number;
  xTicks?: number[];
}> = ({
  data,
  maxLap,
  top,
  bottom,
  draw,
  k,
  x,
  y,
  width,
  height,
  title,
  color = C.emerald,
  fadeColor,
  fadeFrom = 1,
  xTicks = [],
}) => {
  const o = clamp01(k * 1.3);
  const padL = 78;
  const padR = 34;
  const padT = 66;
  const padB = 52;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const px = (lap: number) => padL + (lap / maxLap) * iw;
  const py = (pos: number) => padT + ((pos - top) / (bottom - top)) * ih;

  const pts = data.map(([l, pos]) => ({x: px(l), y: py(pos)}));
  const d = pts.map((q, i) => `${i === 0 ? 'M' : 'L'} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ');
  const L = polyLen(pts);

  // head marker position
  const idx = Math.min(pts.length - 1, Math.max(0, Math.floor(clamp01(draw) * (pts.length - 1))));
  const head = pts[idx];
  const headPos = data[idx][1];

  const gridRows = [top, Math.round((top + bottom) / 2), bottom];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        opacity: o,
        transform: `translateY(${(1 - o) * 24}px)`,
        background: C.card,
        border: `1px solid ${C.hairline}`,
        borderRadius: 18,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 26px 78px rgba(0,0,0,0.62)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: padL,
          top: 26,
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: C.muted,
        }}
      >
        {title}
      </div>
      <svg width={width} height={height} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} />
            <stop offset={`${fadeFrom * 100}%`} stopColor={color} />
            <stop offset="100%" stopColor={fadeColor ?? color} />
          </linearGradient>
        </defs>
        {gridRows.map((r, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={padL + iw}
              y1={py(r)}
              y2={py(r)}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
            <text
              x={padL - 18}
              y={py(r) + 7}
              textAnchor="end"
              fontFamily={FONT}
              fontSize={20}
              fontWeight={600}
              fill={C.dim}
            >
              {`P${r}`}
            </text>
          </g>
        ))}
        {xTicks.map((t, i) => (
          <text
            key={i}
            x={px(t)}
            y={height - 20}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={18}
            fontWeight={600}
            fill={C.dim}
            letterSpacing={1.4}
          >
            {t === 0 ? 'START' : `LAP ${t}`}
          </text>
        ))}
        <path
          d={d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={L}
          strokeDashoffset={L * (1 - clamp01(draw))}
          style={{filter: `drop-shadow(0 0 16px ${hexA(color, 0.5)})`}}
        />
        {draw > 0.02 && head ? (
          <>
            <circle
              cx={head.x}
              cy={head.y}
              r={9}
              fill={headPos <= (top + bottom) / 2 ? color : fadeColor ?? color}
              stroke="#0b0b0d"
              strokeWidth={3}
            />
            {/* The callout sits above the head marker, except when the line is running near the
                top of the plot — there "above" is the title row, and the two collide. Flip it
                under the marker in that case so nothing ever overlaps the heading. */}
            <text
              x={Math.min(head.x, padL + iw - 46)}
              y={head.y - 24 < padT + 12 ? head.y + 38 : head.y - 24}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={30}
              fontWeight={800}
              fill={C.text}
            >
              {`P${headPos}`}
            </text>
          </>
        ) : null}
      </svg>
    </div>
  );
};
