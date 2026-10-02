import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "At the Chinese national championships in May 2025, she swam the 200 meter individual
 * medley in 2 minutes, 10.63 seconds. That was the fastest time in history ever recorded by a
 * twelve-year-old."
 *
 * Lands on "10.63" (+193f). StatCard's content is complete at W[1]; out0 = W[1] + 30.
 */
const W: Win = [190, 220, 250, 276];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="200m IM - Chinese nationals, May 2025"
        value="2:10.63"
        caption="Fastest ever recorded by a 12-year-old."
        k={winK(frame, W)}
        accent={C.emerald}
        x={120}
        y={300}
        width={760}
        valueSize={132}
      />
    </BedChain>
  );
};
