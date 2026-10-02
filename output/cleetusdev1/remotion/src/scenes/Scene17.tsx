import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17); // 376f, 2 links

/**
 * Scene 17 — "A driver who started with four ARCA starts in 2025 and expanded into three
 * different national series in 2026 would be moving toward a genuine full-time racing schedule
 * in 2027."
 *
 * One line of the film where the whole arc is a set of numbers in order, so the graphic is the
 * arc: three years, each arriving as it is spoken, the last one still open.
 */
const W: Win = [30, 60, 250, 300];

const STEPS = [
  {at: 50, year: '2025', value: '4', note: 'ARCA starts'},
  {at: 110, year: '2026', value: '3', note: 'national series'},
  {at: 170, year: '2027', value: '~20', note: 'races, if full-time'},
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
            top: 380,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            gap: 26,
          }}
        >
          {STEPS.map((s, i) => {
            const k = ease(frame, s.at, s.at + 24);
            const open = i === 2;
            return (
              <div
                key={s.year}
                style={{
                  ...cardStyle({radius: 16, pad: 30}),
                  width: 340,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 26}px)`,
                  textAlign: 'center',
                  borderTop: `3px solid ${open ? C.amber : C.steel}`,
                }}
              >
                <div style={{...labelStyle(17), color: open ? C.amber : C.muted}}>{s.year}</div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 96,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: -3,
                    lineHeight: 1,
                    marginTop: 12,
                  }}
                >
                  {s.value}
                </div>
                <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 10}}>
                  {s.note}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
