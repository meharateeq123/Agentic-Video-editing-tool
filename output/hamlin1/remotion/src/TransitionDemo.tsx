import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BedChain, type Link} from './components/BedChain';
import {TRANS_CYCLE, TRANS_FRAMES, transForIndex} from './components/LinkTransition';
import {C, FONT} from './theme';

/**
 * A preview composition, not part of the film: seven clean shots cut back to back so every
 * transition variant plays once, in order, with its name on screen. Built so the transitions can be
 * approved before the film is cut around them.
 *
 * Each link is deliberately short (2s) so the cuts come fast and the moves are easy to compare.
 */
const HOLD = 60; // 2s per shot
const N = 7;

const P = (name: string) => `bed-pool/${name}`;
const A = 'final-laps.mp4';

// Clean ranges only - final-laps carries FOX telemetry across mid-frame from 336-430s and a
// picture-in-picture at 432-452s, so nothing is taken from there.
const STARTS = [20, 50, 170, 200, 250, 300, 508];

const LINKS: Link[] = STARTS.map((s) => ({
  src: P(A),
  startFrom: s,
  span: HOLD / 30,
  frames: HOLD,
  zoom: 1.08,
}));

const LABELS: Record<string, string> = {
  punch: 'PUNCH  -  scale in, blur resolves',
  whipL: 'WHIP LEFT  -  slide + directional blur',
  whipR: 'WHIP RIGHT  -  slide + directional blur',
  rise: 'RISE  -  lift up, blur resolves',
  flash: 'FLASH  -  exposure lift, no slide',
  glide: 'GLIDE  -  scale out to rest',
};

export const TRANSITION_DEMO_FRAMES = HOLD * N;

export const TransitionDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(N - 1, Math.floor(frame / HOLD));
  const kind = idx === 0 ? null : transForIndex(idx - 1);
  const local = frame - idx * HOLD;
  const live = kind !== null && local < TRANS_FRAMES;

  return (
    <AbsoluteFill style={{backgroundColor: C.ground}}>
      <BedChain segs={LINKS} dur={TRANSITION_DEMO_FRAMES}>
        <AbsoluteFill style={{padding: 64, pointerEvents: 'none'}}>
          <div
            style={{
              position: 'absolute',
              left: 64,
              bottom: 64,
              padding: '20px 30px',
              borderRadius: 14,
              background: 'rgba(10,10,13,0.82)',
              border: `1px solid ${live ? C.amber : C.hairline}`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 2.4,
                color: live ? C.amber : C.dim,
                textTransform: 'uppercase',
              }}
            >
              {`Cut ${idx} of ${N - 1}`}
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 30,
                fontWeight: 700,
                color: C.text,
                marginTop: 8,
              }}
            >
              {kind === null ? 'FIRST SHOT  -  no transition' : LABELS[kind]}
            </div>
            <div style={{fontFamily: FONT, fontSize: 18, color: C.muted, marginTop: 6}}>
              {`${TRANS_FRAMES} frames (${(TRANS_FRAMES / 30).toFixed(2)}s) - every variant is this short`}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 64,
              top: 64,
              fontFamily: FONT,
              fontSize: 17,
              color: C.dim,
              textAlign: 'right',
              lineHeight: 1.9,
            }}
          >
            {TRANS_CYCLE.map((k, i) => (
              <div key={k} style={{color: kind === k ? C.amber : C.dim, fontWeight: kind === k ? 700 : 500}}>
                {`${i + 1}. ${k}`}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </BedChain>
    </AbsoluteFill>
  );
};
