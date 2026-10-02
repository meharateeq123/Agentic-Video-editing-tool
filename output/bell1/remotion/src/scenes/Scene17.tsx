import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 — "He won Stage 2 as well, his fifth stage win of the season, and led 46 laps on a night
 * where track position was everything."
 *
 * Three numbers in one line, so three plates arriving in the order they are spoken. Different from
 * scene 4's single focal number and scene 16's ranked list — the same category of graphic is never
 * built the same way twice in this film.
 */
const W: Win = [34, 58, 240, 268];

const STATS = [
  {at: 60, value: 'Stage 2', note: 'Won it outright'},
  {at: 104, value: '5th', note: 'Stage win of the season'},
  {at: 148, value: '46', note: 'Laps led'},
];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.44}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 400,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          {STATS.map((s, i) => {
            const k = ease(frame, s.at, s.at + 26);
            return (
              <div
                key={s.value}
                style={{
                  ...cardStyle({radius: 16, pad: 32}),
                  width: 380,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 26}px)`,
                  textAlign: 'center',
                  borderTop: `3px solid ${i === 0 ? C.amber : C.steel}`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 76,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: -3,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 14}}>
                  {s.note}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 700,
            width: 1920,
            textAlign: 'center',
            ...labelStyle(18),
            color: C.muted,
            opacity: ease(frame, 190, 220),
          }}
        >
          One of the hardest tracks on the schedule to win at
        </div>
      </Overlay>
    </BedChain>
  );
};
