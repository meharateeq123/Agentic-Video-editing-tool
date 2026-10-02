import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11
 * ID card lands on Rikako Ikee's name.
 */
const ID_W: Win = [408, 440, 500, 526];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[ID_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/ikee.jpg"
        name="Rikako Ikee"
        affiliation="Japan · silver, 50m butterfly"
        focus={[50, 42]}
        zoom={1.0}
        win={ID_W}
      />
    </BedChain>
  );
};
