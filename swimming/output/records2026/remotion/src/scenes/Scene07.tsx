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
 * Scene 7 - "McIntosh swam the 200 meter butterfly in 2 minutes 1.65 seconds, breaking a world record
 * that had stood since the ... supersuit era ..."
 *
 * On "two minutes" (154.30s = +725f). The record it broke is Liu Zige's 2:01.81 from 2009.
 * out0 = in1 + 30.
 */
const W: Win = [722, 752, 782, 808];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="Women's 200m butterfly - world record"
        value="2:01.65"
        caption="Summer McIntosh. Broke Liu Zige's 2:01.81, set in 2009."
        k={winK(frame, W)}
        accent={C.red}
        x={120}
        y={300}
        width={800}
        valueSize={150}
      />
    </BedChain>
  );
};
