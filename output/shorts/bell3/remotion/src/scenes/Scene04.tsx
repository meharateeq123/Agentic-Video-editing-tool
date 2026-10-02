import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 127; // 9.28 -> 13.50s

const CUT_FRAMES = [70, 57];

// Rows land at 6 / 10 / 14; Bell's -18 chip on "18" (9.88s, f18); Larson's -9 chip on "Larson"
// (11.98s, f81). Complete at 93, so out0 = 93 + 30.
const CARD_WIN: Win = [2, 12, 123, 137];

const ROWS = [
  {pos: '1', name: 'Denny Hamlin', pts: '2,168', gap: '', at: 6, gapAt: 0, hot: false},
  {pos: '2', name: 'Kyle Larson', pts: '2,159', gap: '−9', at: 10, gapAt: 81, hot: false},
  {pos: '3', name: 'Christopher Bell', pts: '2,150', gap: '−18', at: 14, gapAt: 18, hot: true},
];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** The top three after Gateway. */
const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 900, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>Chase standings after Gateway</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const rk = ease(frame, r.at);
            const g = ease(frame, r.gapAt);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk,
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div style={{...numStyle(48, r.hot ? C.amber : C.muted), width: 40}}>{r.pos}</div>
                <div style={{flex: 1}}>
                  <div style={{fontFamily: FONT, fontSize: 38, fontWeight: 800, color: C.text, letterSpacing: -1.2, lineHeight: 1.05}}>{r.name}</div>
                  <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.muted, marginTop: 4}}>{r.pts} pts</div>
                </div>
                {r.gap ? (
                  <div
                    style={{
                      ...numStyle(50, r.hot ? C.amber : C.text),
                      padding: '6px 16px',
                      borderRadius: 12,
                      background: r.hot ? C.amberDim : 'rgba(255,255,255,0.08)',
                      opacity: g,
                      transform: `scale(${0.8 + 0.2 * g})`,
                    }}
                  >
                    {r.gap}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <StandingsCard />
    <Sequence from={0} durationInFrames={80} layout="none">
      <Caption text="and now he's just 18 POINTS behind DENNY HAMLIN," outAt={72} fontSize={48} />
    </Sequence>
    <Sequence from={80} durationInFrames={47} layout="none">
      <Caption text="with LARSON only NINE POINTS back." outAt={40} fontSize={50} />
    </Sequence>
  </>
);
