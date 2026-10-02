import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "Poles matter every week, but this one landed at a particularly important moment for
 * Logano. He enters Sunday's race eighth in the Chase standings, 72 points behind leader Denny
 * Hamlin..." The standings gap lands after the short opening line.
 */
const W: Win = [90, 120, 150, 176];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="8th In The Chase"
        value="-72"
        caption="Points behind leader Denny Hamlin, entering Gateway"
        k={k}
        accent={C.red}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={128}
      />
    </BedChain>
  );
};
