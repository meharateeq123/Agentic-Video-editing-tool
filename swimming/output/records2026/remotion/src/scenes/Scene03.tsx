import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "... Kate Douglass touched the wall in the 50 meter freestyle in 23.59 seconds. That
 * broke Sarah Sjostrom's three-year-old world record by two hundredths of a second ..."
 *
 * One card, the real time, landing on "23.59" (33.82s = +329f). StatCard is complete when the
 * window finishes rising, so out0 = in1 + 30.
 */
const W: Win = [326, 356, 386, 412];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="Women's 50m freestyle - world record"
        value="23.59"
        caption="Kate Douglass, Indianapolis. 0.02s under Sjöström's 23.61."
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
