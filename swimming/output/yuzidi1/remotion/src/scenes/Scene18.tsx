import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "In the 200 individual medley final, she finished fourth. She missed the bronze medal
 * by six one-hundredths of a second."
 *
 * The broadcast's own result board: 3 HARVEY 2:09.15, 4 YU (CHN) 2:09.21 - the 0.06s is read off
 * the frame, not asserted. Lands on "six" (+223f); out0 = entrance end + 30.
 */
const W: Win = [215, 245, 271, 297];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);
  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/board-200im.jpg"
          eyebrow="200m IM final - 4th place"
          title="0.06s from bronze"
          sub="Harvey 2:09.15  -  Yu 2:09.21"
          width={900}
          photoHeight={520}
          objectPosition="0% 40%"
          accent={C.amber}
          style={{position: 'absolute', left: 510, top: 130, opacity: g, transform: `translateY(${(1 - g) * 26}px)`}}
        />
      </Overlay>
    </BedChain>
  );
};
