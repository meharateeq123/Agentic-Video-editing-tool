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
 * Scene 6 - "Estimates of Phelps's net worth vary ... from around 80 million to over 100 million
 * dollars."
 *
 * Lands on "$80 million" (+191f). out0 = W[1] + 30.
 */
const W: Win = [186, 216, 246, 272];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Estimated net worth"
        value="$80M–$100M+"
        caption="Estimates vary by source."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={900}
        valueSize={124}
      />
    </BedChain>
  );
};
