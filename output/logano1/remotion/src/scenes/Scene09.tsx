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
 * Scene 9 - "There's also history working in his favor here. Logano won the very first Cup Series
 * race ever held at Gateway back in 2022, and he's finished inside the top five in every single
 * one of his four career starts at the track."
 */
const W: Win = [110, 140, 170, 196];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Gateway Track Record"
        value="4-for-4"
        caption="Top-5 finishes in every career start - including the win in 2022, the track's first Cup race"
        k={k}
        accent={C.emerald}
        x={480}
        y={380}
        width={960}
        align="center"
        valueSize={110}
      />
    </BedChain>
  );
};
