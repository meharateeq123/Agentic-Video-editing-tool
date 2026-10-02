import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S29_DUR = mountedFrames(29);

/**
 * Scene 29 - "That time shattered the Asian record. The old record was 2 minutes, 7.57 seconds. It
 * was set by another Chinese swimmer, Ye Shiwen, back in 2012, on her way to Olympic gold in London."
 *
 * The photo is the Olympic broadcast's own frame of Ye at the wall under "YE SHIWEN 2:07.57" - the
 * old record, on screen, from the swim that set it. Lands on "Ye" (+222f); out0 = entrance end + 30.
 */
const W: Win = [215, 245, 271, 297];

export const Scene29: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);
  return (
    <BedChain segs={chain(29)} dur={S29_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/ye-shiwen-2-07-57.jpg"
          eyebrow="The record she broke - London 2012"
          title="Ye Shiwen - 2:07.57"
          sub="Stood since before Yu was born. Yu Zidi: 2:07.41."
          width={900}
          photoHeight={520}
          objectPosition="50% 45%"
          accent={C.red}
          style={{position: 'absolute', left: 510, top: 130, opacity: g, transform: `translateY(${(1 - g) * 26}px)`}}
        />
      </Overlay>
    </BedChain>
  );
};
