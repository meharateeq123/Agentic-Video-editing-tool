import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 142; // 12.52 -> 17.24s

const CUT_FRAMES = [50, 46, 46];

// "51 points" is said at 12.72s (f6). Rows land at 2 / 8, the gap chip at 14; complete at 26, so
// out0 = 26 + 30. "can Gibbs" starts at 14.38s (f56), where the question caption takes over.
const CARD_WIN: Win = [0, 8, 56, 82];

const ROWS = [
  {pos: '1', name: 'Denny Hamlin', pts: '2,168', at: 2, hot: false},
  {pos: '6', name: 'Ty Gibbs', pts: '2,117', at: 8, hot: true},
];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Gibbs against the points leader after Gateway. */
const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const g = ease(frame, 14);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 960, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>Chase standings after Gateway</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const rk = ease(frame, r.at);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk,
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div style={{...numStyle(52, r.hot ? C.amber : C.muted), width: 44}}>{r.pos}</div>
                <div style={{flex: 1}}>
                  <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05}}>{r.name}</div>
                  <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.muted, marginTop: 6}}>{r.pts} pts</div>
                </div>
                {r.hot ? (
                  <div
                    style={{
                      ...numStyle(58, C.amber),
                      padding: '8px 18px',
                      borderRadius: 14,
                      background: C.amberDim,
                      opacity: g,
                      transform: `scale(${0.8 + 0.2 * g})`,
                    }}
                  >
                    −51
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
    <GapCard />
    <Sequence from={0} durationInFrames={54} layout="none">
      <Caption text="With 51 POINTS to make up," outAt={46} fontSize={56} />
    </Sequence>
    <Sequence from={54} durationInFrames={88} layout="none">
      <Caption text="can Gibbs turn BRISTOL into another HUGE STATEMENT?" outAt={78} fontSize={52} />
    </Sequence>
  </>
);
