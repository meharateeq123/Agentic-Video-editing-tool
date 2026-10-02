import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S24_DUR = mountedFrames(24);

/**
 * Scene 24 - "That bronze made Yu Zidi the youngest World Championship medalist in the history of
 * the sport ... you have to go back eighty-nine years."
 *
 * Lands on the first "89" (+271f). StatCard's content is complete at W[1]; out0 = W[1] + 30.
 */
const W: Win = [265, 295, 325, 351];

export const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(24)} dur={S24_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Youngest World Championship medallist"
        value="89 years"
        caption="Since anyone that young medalled at a major swimming event."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={780}
        valueSize={132}
      />
    </BedChain>
  );
};
