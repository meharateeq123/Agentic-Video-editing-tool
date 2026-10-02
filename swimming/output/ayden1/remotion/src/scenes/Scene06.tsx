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
 * Scene 6 - "He beat an entire final of high schoolers ... clocking 22.94 seconds. It was his first
 * time ever under 23 seconds in that event ..."
 *
 * "22.94" lands at 60.06s (+137f). The card is complete at 149, so out0 = 149 + 30.
 */
const W: Win = [125, 137, 179, 205];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="50 yard backstroke - Roseville Sectionals"
        value="22.94"
        caption="His first time under 23 seconds, in a final of high schoolers."
        k={winK(frame, W)}
        accent={C.amber}
        x={140}
        y={320}
        width={840}
        valueSize={150}
      />
    </BedChain>
  );
};
