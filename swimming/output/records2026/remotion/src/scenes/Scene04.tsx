import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "Eight days later ... at the Sette Colli Trophy in Rome, Gretchen Walsh swam 23.55
 * seconds in the same event ..."
 *
 * The new time on "23.55" (64.42s = +235f). out0 = in1 + 30.
 */
const W: Win = [232, 262, 292, 318];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="Women's 50m freestyle - world record"
        value="23.55"
        caption="Gretchen Walsh, Rome. Eight days after 23.59."
        k={winK(frame, W)}
        accent={C.steel}
        x={120}
        y={300}
        width={760}
        valueSize={150}
      />
    </BedChain>
  );
};
