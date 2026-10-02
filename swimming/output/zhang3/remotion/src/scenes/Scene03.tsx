import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3
 * ID card lands on Zhang Yufei's name.
 */
const ID_W: Win = [162, 194, 250, 276];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[ID_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/zhang.jpg"
        name="Zhang Yufei"
        affiliation="China · defending 50m butterfly champion"
        focus={[50, 42]}
        zoom={1.0}
        win={ID_W}
      />
    </BedChain>
  );
};
