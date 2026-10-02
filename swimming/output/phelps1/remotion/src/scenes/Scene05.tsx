import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "... place his current Paradise Valley home in the five to six million dollar range ..."
 *
 * Lands on "$5-6 million" (+229f). out0 = W[1] + 30.
 */
const W: Win = [224, 254, 284, 310];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Current home - reported"
        value="$5–6M"
        caption="Mountain views and a private pool, still in Paradise Valley."
        k={winK(frame, W)}
        accent={C.emerald}
        x={120}
        y={300}
        width={820}
        valueSize={140}
      />
    </BedChain>
  );
};
