import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "He won the regular-season championship with four wins on the year, which handed him
 * the No. 1 seed and a 25-point cushion."
 *
 * Three plates for three facts, arriving in the order the narration reads them. This is the film's
 * only three-plate row; every other stat scene is built a different way on purpose.
 */
const W: Win = [70, 100, 288, 328];

const PLATES = [
  {at: 110, value: '4', note: 'Wins on the year'},
  {at: 170, value: 'No. 1', note: 'Seed going into the Chase'},
  {at: 230, value: '+25', note: 'Points over second'},
];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.07} maxBlur={15} dim={0.46}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 300,
            width: 1920,
            textAlign: 'center',
            ...labelStyle(19),
            color: C.amber,
            opacity: ease(frame, 84, 112),
          }}
        >
          Regular-season champion
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 380,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            gap: 30,
          }}
        >
          {PLATES.map((p, i) => {
            const k = ease(frame, p.at, p.at + 28);
            return (
              <div
                key={p.value}
                style={{
                  ...cardStyle({radius: 16, pad: 34}),
                  width: 390,
                  textAlign: 'center',
                  opacity: k,
                  transform: `translateY(${(1 - k) * 28}px)`,
                  borderTop: `3px solid ${i === 2 ? C.amber : C.steel}`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 84,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: -3.4,
                    lineHeight: 1,
                  }}
                >
                  {p.value}
                </div>
                <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 14}}>
                  {p.note}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
