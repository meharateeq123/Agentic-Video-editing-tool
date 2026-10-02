import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "First, the star of the show. A 2019 Corvette ZR1, valued at around one hundred and
 * forty thousand dollars. This was the top of the line C7 Corvette, the most powerful version
 * Chevrolet built in that generation." Prize 1 of 4 - image card.
 */
const W: Win = [24, 54, 80, 106];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/corvette-zr1.jpg"
          eyebrow="Prize 1 of 4"
          title="2019 Corvette ZR1"
          sub="Top-of-the-line C7 - the most powerful version Chevrolet built. Valued around $140,000."
          width={860}
          photoHeight={540}
          objectPosition="18% 55%"
          accent={C.amber}
          style={{
            position: 'absolute',
            left: 530,
            top: 130,
            opacity: g,
            transform: `translateY(${(1 - g) * 26}px)`,
          }}
        />
      </Overlay>
    </BedChain>
  );
};
