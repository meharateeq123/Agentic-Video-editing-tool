import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "Second, a 2026 Chevrolet Silverado 2500HD, valued at about seventy five thousand
 * dollars. A brand new heavy duty truck built to tow and haul serious weight." Prize 2 of 4.
 */
const W: Win = [24, 54, 80, 106];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/silverado-2500hd.jpg"
          eyebrow="Prize 2 of 4"
          title="2026 Silverado 2500HD"
          sub="Brand new heavy-duty truck, built to tow and haul serious weight. Valued around $75,000."
          width={860}
          photoHeight={540}
          accent={C.steel}
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
