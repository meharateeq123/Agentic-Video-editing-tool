import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "Kyle Larson started 25th at Darlington. By the end of the night, he'd led more laps
 * than anyone else in the field. He still didn't win."
 *
 * This is the first scripted scene, arriving right after the cold-open hook clip has already shown
 * the Bell pass with its own sound. So this card doesn't re-explain the pass - it introduces the man
 * the whole story is actually about.
 */
const W: Win = [110, 140, 198, 238];

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={24}>
        <PhotoCard
          photo="id/larson.png"
          eyebrow="Cook Out Southern 500 - Darlington"
          title="Kyle Larson"
          sub="Started 25th. Led more laps than anyone in the field. Still didn't win."
          width={840}
          photoHeight={545}
          objectPosition="50% 30%"
          style={{
            position: 'absolute',
            left: 150,
            top: 130,
            opacity: g,
            transform: `translateY(${(1 - g) * 28}px)`,
          }}
        />
      </Overlay>
    </BedChain>
  );
};
