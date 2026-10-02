import React from 'react';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

// "775 laps led" is spoken f220-f264.
const W: Win = [214, 236, 308, 334];

export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="775" label="Laps Led At Bristol" at={236} win={W} color={C.amber} />
    <Hit file="Pop.mp3" at={236} />
  </BedChain>
);
