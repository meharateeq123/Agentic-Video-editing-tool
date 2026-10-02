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
 * Scene 3 - "Phelps retired following the 2016 Rio Olympics with 39 world records to his name, a
 * career that started at age 15 in Sydney and ended at 31 in Rio."
 *
 * Lands on "39" (+97f). out0 = W[1] + 30.
 */
const W: Win = [92, 122, 152, 178];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="World records"
        value="39"
        caption="Sydney 2000 at 15 - Rio 2016 at 31."
        k={winK(frame, W)}
        accent={C.steel}
        x={120}
        y={300}
        width={780}
        valueSize={160}
      />
    </BedChain>
  );
};
