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
 * Scene 10 - "Kyle Larson wasn't far behind, but at Gateway, far behind still means starting
 * alongside Logano on the front row. Larson, the defending two-time Cup Series champion, will roll
 * off from the outside pole. He enters the race sitting seventh in the Chase standings, still
 * searching for his first win in 50 races." The win-drought number is the last line of the
 * paragraph, so the card lands late in the scene rather than at the top.
 */
const W: Win = [450, 480, 510, 536];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Larson's Drought"
        value="50"
        caption="Races since his last win - even starting the outside pole at Gateway"
        k={k}
        accent={C.steel}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={140}
      />
    </BedChain>
  );
};
