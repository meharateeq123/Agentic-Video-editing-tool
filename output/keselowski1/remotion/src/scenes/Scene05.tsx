import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "That contact sent Keselowski into the outside wall. As he tried to gather the car...
 * Hocevar made contact again, finishing off the spin... bringing out the caution flag and ending
 * the stage." Three escalating beats, each landing and staying up rather than one replacing the
 * last - by the end all three sit stacked, reading as a sequence of events.
 */
const W: Win = [40, 72, 276, 306];

const STEPS = [
  {t: 'Into the outside wall.', at: 46},
  {t: 'Second contact - finishes off the spin.', at: 130},
  {t: 'Caution flag. Stage 1 is over.', at: 220},
];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 380, width: 1920, textAlign: 'center'}}>
          {STEPS.map((s, i) => {
            const k = ease(frame, s.at, s.at + 26);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONT,
                  fontSize: 54,
                  fontWeight: 800,
                  color: i === STEPS.length - 1 ? C.amber : C.text,
                  letterSpacing: -1,
                  lineHeight: 1.5,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 18}px)`,
                }}
              >
                {s.t}
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
