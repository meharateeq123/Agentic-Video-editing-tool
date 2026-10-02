// Design tokens for the Cleetus Talladega Short — carried over from the prior Shorts so the
// look stays consistent across this library.

export const C = {
  ground: '#0b0b0d',
  groundSoft: '#121217',
  card: 'rgba(16,16,20,0.86)',
  cardSolid: 'rgba(14,14,18,0.94)',
  hairline: 'rgba(255,255,255,0.10)',
  hairlineStrong: 'rgba(255,255,255,0.18)',
  text: '#f4f4f6',
  muted: '#9aa0aa',
  dim: '#5f6570',
  amber: '#f5a623',
  amberDim: 'rgba(245,166,35,0.22)',
  red: '#e03b3b',
  redDim: 'rgba(224,59,59,0.20)',
  emerald: '#25c07a',
  emeraldDim: 'rgba(37,192,122,0.20)',
  steel: '#4d8dd6',
  steelDim: 'rgba(77,141,214,0.20)',
} as const;

export const FONT =
  '"Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif';
export const FONT_NUM =
  '"Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const W = 1080;
export const H = 1920;
export const FPS = 30;

/** 6% safe margin on every side. */
export const SAFE = 65;

/** Standard card chrome. */
export const cardStyle = (opts?: {radius?: number; pad?: number}) => ({
  background: C.card,
  border: `1px solid ${C.hairline}`,
  borderRadius: opts?.radius ?? 18,
  padding: opts?.pad ?? 28,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
});

/** Small uppercase letterspaced label — the top line of every card. */
export const labelStyle = (size = 20) => ({
  fontFamily: FONT,
  fontSize: size,
  fontWeight: 600,
  letterSpacing: size * 0.16,
  textTransform: 'uppercase' as const,
  color: C.muted,
  lineHeight: 1.1,
});

/** The one focal number. */
export const numStyle = (size = 132, color: string = C.text) => ({
  fontFamily: FONT_NUM,
  fontSize: size,
  fontWeight: 800,
  letterSpacing: -size * 0.03,
  color,
  lineHeight: 0.95,
  fontVariantNumeric: 'tabular-nums' as const,
});

/** One short caption under the number. */
export const capStyle = (size = 22) => ({
  fontFamily: FONT,
  fontSize: size,
  fontWeight: 500,
  color: C.muted,
  lineHeight: 1.35,
});
