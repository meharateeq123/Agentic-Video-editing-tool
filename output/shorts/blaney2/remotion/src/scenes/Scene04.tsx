import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 118; // 15.74 -> 19.68s

const CUT_FRAMES = [30, 40, 26, 22];

// "Zane" is said at 15.88s (f4), "Chase Elliott" at 16.72s (f30). Rows land at 4 / 16 / 30 and
// complete at 42, so out0 = 42 + 30.
const CARD_WIN: Win = [0, 8, 72, 98];

const ROWS = [
  {num: '38', name: 'Zane Smith', when: 'End of Stage 2', at: 4, hot: false},
  {num: '12', name: 'Ryan Blaney', when: 'Lap 155', at: 16, hot: true},
  {num: '9', name: 'Chase Elliott', when: 'Lap 214', at: 30, hot: false},
];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** The three brake failures that ended a Chase driver's race at Gateway. */
const FailuresCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 900, width: 860, ...cardStyle({radius: 22, pad: 28}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.red}}>Brake failures at Gateway</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const rk = rowIn(frame, r.at);
            return (
              <div
                key={r.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk,
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div
                  style={{
                    ...numStyle(40, r.hot ? C.amber : C.text),
                    width: 84,
                    textAlign: 'center',
                    padding: '8px 0',
                    borderRadius: 12,
                    background: r.hot ? C.amberDim : C.redDim,
                  }}
                >
                  {r.num}
                </div>
                <div style={{flex: 1, fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1.2}}>{r.name}</div>
                <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.muted}}>{r.when}</div>
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
    <FailuresCard />
    <Caption text="ZANE SMITH and CHASE ELLIOTT also suffered BRAKE FAILURES during the race." outAt={100} fontSize={46} />
  </>
);
