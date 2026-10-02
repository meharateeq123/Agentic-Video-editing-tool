import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S30_DUR = mountedFrames(30);

/**
 * Scene 30 - "... It also made Yu the ninth-fastest woman in the history of that event. Ninth of
 * all time. At thirteen."
 *
 * Lands on "ninth" (+488f). StatCard's content is complete at W[1]; out0 = W[1] + 30.
 */
const W: Win = [480, 510, 540, 566];

export const Scene30: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(30)} dur={S30_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Women's 200m IM - all time"
        value="9th"
        caption="At thirteen. And 2nd-fastest in the world in 2025, behind only McIntosh."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={760}
        valueSize={150}
      />
    </BedChain>
  );
};
