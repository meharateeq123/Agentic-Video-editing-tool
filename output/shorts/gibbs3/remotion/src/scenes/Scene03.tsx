import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 133; // 8.08 -> 12.52s

const CUT_FRAMES = [34, 30, 36, 33];

// "won at Bristol" is said at 8.46s (f11), "last fall" at 10.38s (f69). Rows land at 8 and 68 and
// complete at 80, so out0 = 80 + 30.
const CARD_WIN: Win = [4, 16, 110, 136];

const ROWS = [
  {when: 'Apr 2026 · Food City 500', value: 'WON', unit: '', at: 8, color: C.emerald},
  {when: 'Sep 2025 · Night Race', value: '201', unit: 'laps led', at: 68, color: C.amber},
];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Gibbs's last two Bristol Cup races. */
const BristolCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 960, width: 860, ...cardStyle({radius: 22, pad: 28}), borderLeft: `5px solid ${C.emerald}`}}>
        <div style={{...labelStyle(18), color: C.emerald}}>Ty Gibbs at Bristol</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const rk = rowIn(frame, r.at);
            return (
              <div
                key={r.when}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk,
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.text, letterSpacing: -1}}>{r.when}</div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
                  <div style={numStyle(60, r.color)}>{r.value}</div>
                  {r.unit ? <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.muted}}>{r.unit}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <BristolCard />
    <Sequence from={0} durationInFrames={64} layout="none">
      <Caption text="Gibbs WON AT BRISTOL earlier this year," outAt={56} fontSize={50} />
    </Sequence>
    <Sequence from={64} durationInFrames={69} layout="none">
      <Caption text="and last fall he LED 201 LAPS there." outAt={60} fontSize={52} />
    </Sequence>
  </>
);
