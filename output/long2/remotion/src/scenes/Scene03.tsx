import React from 'react';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

// "trails the championship leader by 33 markers" spans f146-f220; the 33 lands ~f200.
const W: Win = [176, 198, 268, 294];

export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="33" label="Points Back" at={198} win={W} color={C.red} />
    <Hit file="Pop.mp3" at={198} />
  </BedChain>
);
