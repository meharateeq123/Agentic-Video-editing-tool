import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - "...long straightaways feeding into tight corners force drivers to brake hard and
 * repeatedly, pushing brake temperatures as high as 1,200 degrees Fahrenheit before they cool
 * again on the next straight."
 */
const W: Win = [70, 100, 130, 156];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Peak Brake Temperature"
        value="1,200°F"
        caption="Gateway's long straights into tight corners have caused brake failures since 2022."
        k={k}
        accent={C.amber}
        x={480}
        y={370}
        width={960}
        align="center"
        valueSize={130}
      />
    </BedChain>
  );
};
