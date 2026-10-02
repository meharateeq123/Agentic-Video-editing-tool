import React from 'react';
import {BedChain} from '../components/BedChain';
import {BigType} from '../components/Stamp';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

// "Section 8" lands at f66-78; "crew chief is responsible" at f190-225.
const W: Win = [50, 66, 255, 281];

export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.05} maxBlur={10} dim={0.4}>
    <BigType lines={['SECTION 8.6.1.D', "CREW CHIEF'S CALL"]} ats={[66, 190]} win={W} />
  </BedChain>
);
