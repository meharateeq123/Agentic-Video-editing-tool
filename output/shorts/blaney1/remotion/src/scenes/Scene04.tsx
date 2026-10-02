import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 102; // 6.98 -> 10.38s

// Rows land at 18, 23, 28, 33 — complete at 33, so out0 = 33 + 30.
const CARD_WIN: Win = [6, 18, 63, 79];

const WINNERS: {year: string; name: string; penske: boolean}[] = [
  {year: '2022', name: 'Joey Logano', penske: true},
  {year: '2023', name: 'Kyle Busch', penske: false},
  {year: '2024', name: 'Austin Cindric', penske: true},
  {year: '2025', name: 'Denny Hamlin', penske: false},
];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Every Cup winner at Gateway, with the two Penske wins lit. */
const PenskeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 900, width: 860, ...cardStyle({radius: 20, pad: 32}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <div style={{...labelStyle(18), color: C.amber}}>Gateway Cup winners</div>
          <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, color: C.text}}>
            Penske <span style={{color: C.amber}}>2 of 4</span>
          </div>
        </div>
        <div style={{marginTop: 14}}>
          {WINNERS.map((w, i) => {
            const r = rowIn(frame, 6 + i * 5);
            return (
              <div
                key={w.year}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '13px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: r * (w.penske ? 1 : 0.55),
                  transform: `translateX(${(1 - r) * -24}px)`,
                }}
              >
                <div style={{...numStyle(40, w.penske ? C.amber : C.muted), width: 120}}>{w.year}</div>
                <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1, flex: 1}}>{w.name}</div>
                {w.penske ? <div style={{...labelStyle(16), color: C.amber}}>Team Penske</div> : null}
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
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3} />
    <PenskeCard />
    <Caption text="Team PENSKE has won TWO of the last FOUR Cup races here." outAt={S04_DUR - 4} fontSize={44} />
  </>
);
