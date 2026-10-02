import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "One lap. Two-tenths of a second. That's all it took for Joey Logano to send a message
 * to the entire Chase field before Sunday's race even started. He didn't just beat Kyle Larson for
 * the pole at Gateway. He beat him by one of the widest margins anyone has seen in years..." The
 * hook number lands right at the top of the scene, then gets out of the way for the rest of the
 * line.
 */
const W: Win = [20, 50, 80, 106];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="The Gap"
        value="0.276s"
        caption="Logano's margin over Larson - one of the widest pole margins seen in years"
        k={k}
        accent={C.amber}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={140}
      />
    </BedChain>
  );
};
