import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S26_DUR = mountedFrames(26);

const W0: Win = [54, 68, 122, 142];
const W1: Win = [372, 386, 446, 470];

export const Scene26: React.FC = () => (
  <BedChain segs={chain(26)} dur={S26_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="202" label="Laps Led" at={62} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={62} volume={0.28} />
    <RankStamp value="6th" label="Down From 4th" at={380} win={W1} color={C.red} />
    <Hit file="Pop.mp3" at={380} volume={0.28} />


  </BedChain>
);
