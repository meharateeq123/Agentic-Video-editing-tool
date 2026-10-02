import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 129; // 9.71 -> 14.0s

const CUT_FRAMES = [65, 64];

// "third" is said at 10.86s = scene frame 35. Rows land at 23, 29, 35 - complete right on the
// word, then the card holds and falls compressed into the scene's own tail (fall 120-129).
const CARD_WIN: Win = [6, 18, 120, 129];

const RESULTS: {pos: string; name: string; tag: string; hot: boolean}[] = [
  {pos: '1', name: 'Kyle Larson', tag: 'Winner — OT', hot: false},
  {pos: '2', name: 'Alex Bowman', tag: '', hot: false},
  {pos: '3', name: 'Joey Logano', tag: '', hot: true},
];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Official finishing order, top three (NASCAR.com). Logano's row is lit. */
const ResultCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1010, width: 860, ...cardStyle({radius: 20, pad: 30})}}>
        <div style={{...labelStyle(18), color: C.muted}}>Finish — Enjoy Illinois 300</div>
        <div style={{marginTop: 10}}>
          {RESULTS.map((r, i) => {
            const rk = rowIn(frame, 11 + i * 6);
            return (
              <div
                key={r.pos}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk * (r.hot ? 1 : 0.6),
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div style={{...numStyle(56, r.hot ? C.amber : C.muted), width: 80}}>{r.pos}</div>
                <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 800, color: C.text, letterSpacing: -1.5, flex: 1}}>{r.name}</div>
                {r.tag ? <div style={{...labelStyle(16), color: C.text}}>{r.tag}</div> : null}
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
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3} />
    <ResultCard />
    <Caption text="Logano finished THIRD instead of taking the win — a huge WHAT IF." outAt={S03_DUR - 4} fontSize={40} />
  </>
);
