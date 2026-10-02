import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "There is a photo from Singapore ... A girl standing behind the starting blocks."
 *
 * The one real photo the hook describes: an AFP frame of Yu at the blocks in Singapore (CHN flag,
 * Speedo suit, the championship's dotted backdrop). No name yet - the script withholds it until
 * scene 4 - so the card only places the photo. Lands on "blocks" (+147f); out0 = entrance end + 30.
 */
const W: Win = [145, 175, 201, 227];

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);
  return (
    <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/yu-blocks.jpg"
          eyebrow="World Championships - Singapore 2025"
          title="Behind the blocks"
          width={860}
          photoHeight={560}
          objectPosition="50% 30%"
          accent={C.amber}
          style={{position: 'absolute', left: 530, top: 140, opacity: g, transform: `translateY(${(1 - g) * 26}px)`}}
        />
      </Overlay>
    </BedChain>
  );
};
