import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "When it was pointed out that the spin followed direct contact from his own car,
 * Hocevar didn't offer much more. He said the contact wasn't intentional, but he also didn't
 * apologize. Told directly about Keselowski's warning, Hocevar shrugged it off entirely." Three
 * short facts landing in sequence, same device as scene 5.
 */
const W: Win = [40, 68, 250, 280];

const STEPS = [
  {t: 'Not intentional, he says.', at: 46},
  {t: 'No apology.', at: 110},
  {t: 'Told about the warning - shrugged it off.', at: 160},
];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(15)} dur={S15_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 380, width: 1920, textAlign: 'center'}}>
          {STEPS.map((s, i) => {
            const k = ease(frame, s.at, s.at + 24);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONT,
                  fontSize: 48,
                  fontWeight: 800,
                  color: i === STEPS.length - 1 ? C.amber : C.text,
                  letterSpacing: -0.8,
                  lineHeight: 1.5,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 16}px)`,
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
