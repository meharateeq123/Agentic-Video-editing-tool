import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "...He was credited with a 35th-place finish and scored just 16 points on the day, a
 * brutal outcome for a car that had been fast enough to run inside the top five all afternoon."
 */
const W: Win = [60, 90, 120, 146];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Points Scored"
        value="16"
        caption="Credited with a 35th-place finish - after running inside the top five all afternoon."
        k={k}
        accent={C.red}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={140}
      />
    </BedChain>
  );
};
