import React from 'react';
import {C, FONT} from '../theme';
import {hexA} from './base';
import {polyLen, quadLen} from '../geo';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* ------------------------------------------------------------------ */
/* STATEMENT — a single earned headline: small label, big line, rule.  */
/* ------------------------------------------------------------------ */

export const Statement: React.FC<{
  label?: string;
  headline: string;
  caption?: string;
  k: number;
  /** rule draw progress */
  rule?: number;
  accent?: string;
  x: number;
  y: number;
  width: number;
  size?: number;
  align?: 'left' | 'center';
}> = ({
  label,
  headline,
  caption,
  k,
  rule = 1,
  accent = C.amber,
  x,
  y,
  width,
  size = 92,
  align = 'left',
}) => {
  const o = clamp01(k * 1.25);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity: o,
        transform: `translateY(${(1 - o) * 26}px) scale(${0.985 + 0.015 * o})`,
        transformOrigin: align === 'center' ? '50% 50%' : '0% 50%',
        textAlign: align,
      }}
    >
      {label ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: 4.6,
            textTransform: 'uppercase',
            color: C.muted,
            marginBottom: 22,
          }}
        >
          {label}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 800,
          letterSpacing: -size * 0.012,
          lineHeight: 1.08,
          color: C.text,
          whiteSpace: 'pre-line',
          textShadow: '0 8px 40px rgba(0,0,0,0.7)',
        }}
      >
        {headline}
      </div>
      <div
        style={{
          height: 3,
          width: `${clamp01(rule) * (align === 'center' ? 34 : 26)}%`,
          margin: align === 'center' ? '30px auto 0' : '30px 0 0',
          background: accent,
          boxShadow: `0 0 22px ${hexA(accent, 0.7)}`,
        }}
      />
      {caption ? (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 26,
            fontWeight: 500,
            color: C.muted,
            marginTop: 26,
            lineHeight: 1.4,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CHIP — a small pill used for series names, levels, checklist items. */
/* ------------------------------------------------------------------ */

export const Chip: React.FC<{
  text: string;
  k: number;
  accent?: string;
  x: number;
  y: number;
  width?: number;
  strike?: boolean;
  dim?: number;
  size?: number;
  icon?: React.ReactNode;
}> = ({text, k, accent = C.steel, x, y, width, strike = false, dim = 0, size = 26, icon}) => {
  const o = clamp01(k * 1.4);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity: o * (1 - dim * 0.62),
        transform: `translateX(${(1 - o) * -22}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(18,18,23,0.86)',
        border: `1px solid ${C.hairline}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 12,
        padding: '18px 26px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 18px 50px rgba(0,0,0,0.5)',
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          color: strike ? C.muted : C.text,
          textDecoration: strike ? 'line-through' : 'none',
          textDecorationColor: C.red,
          textDecorationThickness: 3,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** Emerald tick that draws itself. */
export const Tick: React.FC<{k: number; size?: number; color?: string}> = ({
  k,
  size = 30,
  color = C.emerald,
}) => (
  <svg width={size} height={size} viewBox="0 0 30 30" style={{flexShrink: 0}}>
    <circle cx={15} cy={15} r={13} fill="none" stroke={hexA(color, 0.35)} strokeWidth={2} />
    <path
      d="M 8 15.5 L 13 20.5 L 22 10"
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={21}
      strokeDashoffset={21 * (1 - clamp01(k))}
    />
  </svg>
);

/** Red cross that draws itself. */
export const Cross: React.FC<{k: number; size?: number; color?: string}> = ({
  k,
  size = 30,
  color = C.red,
}) => (
  <svg width={size} height={size} viewBox="0 0 30 30" style={{flexShrink: 0}}>
    <circle cx={15} cy={15} r={13} fill="none" stroke={hexA(color, 0.35)} strokeWidth={2} />
    <path
      d="M 9.5 9.5 L 20.5 20.5"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeDasharray={16}
      strokeDashoffset={16 * (1 - clamp01(k * 2))}
    />
    <path
      d="M 20.5 9.5 L 9.5 20.5"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeDasharray={16}
      strokeDashoffset={16 * (1 - clamp01((k - 0.5) * 2))}
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* WAVE BARS — an audio waveform, for the podcast attribution card.    */
/* ------------------------------------------------------------------ */

export const WaveBars: React.FC<{
  frame: number;
  k: number;
  x: number;
  y: number;
  width: number;
  height: number;
  bars?: number;
  color?: string;
}> = ({frame, k, x, y, width, height, bars = 42, color = C.amber}) => {
  const o = clamp01(k * 1.4);
  const bw = width / bars;
  return (
    <div style={{position: 'absolute', left: x, top: y, width, height, opacity: o}}>
      {Array.from({length: bars}).map((_, i) => {
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const phase = seed - Math.floor(seed);
        const env = Math.sin((i / (bars - 1)) * Math.PI) ** 0.6;
        const a =
          0.32 +
          0.68 *
            Math.abs(Math.sin(frame * 0.13 + phase * 6.283 + i * 0.35)) *
            (0.5 + 0.5 * Math.sin(frame * 0.052 + i * 0.14));
        const h = Math.max(4, height * env * a * clamp01((k - i / bars / 2.2) * 2.4));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i * bw,
              top: (height - h) / 2,
              width: bw * 0.52,
              height: h,
              borderRadius: bw * 0.26,
              background: color,
              opacity: 0.45 + 0.55 * env,
              boxShadow: `0 0 12px ${hexA(color, 0.4)}`,
            }}
          />
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ARROW — a drawn trend arrow (rise or drop).                         */
/* ------------------------------------------------------------------ */

export const TrendArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  k: number;
  color: string;
  width?: number;
  /** curve bow, px */
  bow?: number;
}> = ({x1, y1, x2, y2, k, color, width = 6, bow = 60}) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + bow;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const L = quadLen({x: x1, y: y1}, {x: mx, y: my}, {x: x2, y: y2});
  const ang = (Math.atan2(y2 - my, x2 - mx) * 180) / Math.PI;
  const headK = clamp01((k - 0.86) / 0.14);
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={L}
        strokeDashoffset={L * (1 - clamp01(k))}
        style={{filter: `drop-shadow(0 0 18px ${hexA(color, 0.6)})`}}
      />
      {headK > 0 ? (
        <g transform={`translate(${x2} ${y2}) rotate(${ang}) scale(${headK})`} opacity={headK}>
          <path d="M 0 0 L -30 -15 L -22 0 L -30 15 Z" fill={color} />
        </g>
      ) : null}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* STEP TIMELINE — the climb toward one race.                          */
/* ------------------------------------------------------------------ */

export const StepTimeline: React.FC<{
  steps: {label: string; sub?: string}[];
  /** 0..1 across all steps */
  k: number;
  x: number;
  y: number;
  width: number;
  /** vertical rise across the whole run, px */
  rise?: number;
  accent?: string;
  finalAccent?: string;
}> = ({steps, k, x, y, width, rise = 190, accent = C.steel, finalAccent = C.amber}) => {
  const n = steps.length;
  const gap = width / (n - 1);
  const spineK = clamp01(k * 1.05);
  const spinePts = [
    {x: 0, y: rise + 40},
    ...steps.map((_, i) => ({x: i * gap, y: rise + 40 - (i / (n - 1)) * rise})),
  ];
  const spineLen = polyLen(spinePts);
  return (
    <div style={{position: 'absolute', left: x, top: y, width, height: rise + 200}}>
      <svg width={width} height={rise + 200} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="climb" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={finalAccent} />
          </linearGradient>
        </defs>
        <path
          d={`M 0 ${rise + 40} ${steps
            .map((_, i) => `L ${i * gap} ${rise + 40 - (i / (n - 1)) * rise}`)
            .join(' ')}`}
          fill="none"
          stroke="url(#climb)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={spineLen}
          strokeDashoffset={spineLen * (1 - spineK)}
          style={{filter: 'drop-shadow(0 0 16px rgba(245,166,35,0.35))'}}
        />
      </svg>
      {steps.map((s, i) => {
        const at = i / n;
        const kk = clamp01((k - at) / (1 / n) / 0.75);
        const last = i === n - 1;
        const col = last ? finalAccent : accent;
        const cy = rise + 40 - (i / (n - 1)) * rise;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i * gap,
              top: cy,
              transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * kk})`,
              opacity: kk,
            }}
          >
            <div
              style={{
                width: last ? 26 : 16,
                height: last ? 26 : 16,
                borderRadius: '50%',
                background: col,
                boxShadow: `0 0 ${last ? 34 : 18}px ${hexA(col, 0.8)}`,
                margin: '0 auto',
              }}
            />
          </div>
        );
      })}
      {steps.map((s, i) => {
        const at = i / n;
        const kk = clamp01((k - at) / (1 / n) / 0.75);
        const last = i === n - 1;
        const cy = rise + 40 - (i / (n - 1)) * rise;
        const below = i % 2 === 1 && !last;
        return (
          <div
            key={`l${i}`}
            style={{
              position: 'absolute',
              left: i * gap,
              top: below ? cy + 34 : cy - (last ? 108 : 86),
              transform: `translate(-50%, 0) translateY(${(1 - kk) * (below ? 10 : -10)}px)`,
              opacity: kk,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: last ? 40 : 27,
                fontWeight: last ? 800 : 700,
                letterSpacing: last ? 2.6 : 2.2,
                textTransform: 'uppercase',
                color: last ? C.text : C.text,
                textShadow: '0 4px 22px rgba(0,0,0,0.85)',
              }}
            >
              {s.label}
            </div>
            {s.sub ? (
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: 2.8,
                  textTransform: 'uppercase',
                  color: last ? C.amber : C.dim,
                  marginTop: 7,
                }}
              >
                {s.sub}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
