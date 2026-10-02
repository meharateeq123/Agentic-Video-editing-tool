import React from 'react';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

// "nine-point lead" lands at f379-403.
const W: Win = [368, 390, 460, 486];

export const Scene21: React.FC = () => (
  <BedChain segs={chain(21)} dur={S21_DUR} wins={[W]} amp={0.05} maxBlur={8} dim={0.32}>
    <RankStamp value="9" label="Point Lead" at={390} win={W} color={C.amber} />
  </BedChain>
);
