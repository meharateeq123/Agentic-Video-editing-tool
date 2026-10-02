import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S04_DUR = mountedFrames(4);

// '500' is said at 15.0s = scene frame 25; 'drowned' at 17.6s = frame 103 (no stamp there, the line carries it).
const W0: Win = [20, 28, 70, 86];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="500+" label="People Pulled From The Ocean" at={26} win={W0} />
    <Hit file="Pop.mp3" at={26} volume={0.28} />
  </BedChain>
);

