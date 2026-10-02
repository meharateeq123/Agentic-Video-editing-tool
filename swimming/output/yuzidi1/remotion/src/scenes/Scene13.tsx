import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Her mentor is Li Bingjie, an Olympic medalist for China ..."
 *
 * The picture is the World Aquatics result board for the women's 400m free final in Singapore:
 * 1 McINTOSH 3:56.26, 2 LI (CHN) 3:58.21, 3 LEDECKY - the broadcast's own frame, so the card
 * shows Li beside the two names this scene goes on to mention. Lands on "Bingjie" (+172f);
 * out0 = entrance end + 30.
 */
const W: Win = [170, 200, 226, 252];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/board-400free.jpg"
          eyebrow="Her mentor"
          title="Li Bingjie"
          sub="Olympic medallist for China - 2nd in the 400m free at Singapore 2025."
          width={900}
          photoHeight={520}
          objectPosition="0% 30%"
          accent={C.red}
          style={{position: 'absolute', left: 510, top: 130, opacity: g, transform: `translateY(${(1 - g) * 26}px)`}}
        />
      </Overlay>
    </BedChain>
  );
};
