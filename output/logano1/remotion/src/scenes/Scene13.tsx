import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Denny Hamlin, the No. 1 seed and current points leader, qualified 10th... Hamlin
 * enters Sunday leading Bell by just 12 points in the standings, a gap that narrowed sharply after
 * his own rough night at Darlington."
 */
const W: Win = [120, 150, 180, 206];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Hamlin's Lead Over Bell"
        value="12"
        caption="Points - narrowed sharply after Darlington. Hamlin starts Sunday 10th."
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
