import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2
 * ID card lands on Yu Zidi's name.
 */
const ID_W: Win = [10, 42, 340, 366];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[ID_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/yuzidi.jpg"
        name="Yu Zidi"
        affiliation="China · 13 years old, three individual golds"
        focus={[55, 35]}
        zoom={1.3}
        win={ID_W}
      />
    </BedChain>
  );
};
