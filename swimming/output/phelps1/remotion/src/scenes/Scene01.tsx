import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "Twenty-eight Olympic medals. Twenty-three of them gold. ... Then, in 2016, Michael Phelps
 * walked out of the pool for the last time as a competitor."
 *
 * Over Phelps on the Rio podium with his last gold. The count lands on the first word; content is
 * complete at W[1], so out0 = W[1] + 30.
 */
const W: Win = [6, 36, 66, 92];

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Olympic medals"
        value="28"
        caption="23 of them gold - more than any athlete in history."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={780}
        valueSize={160}
      />
    </BedChain>
  );
};
