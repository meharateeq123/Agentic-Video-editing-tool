import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S28_DUR = mountedFrames(28);

/**
 * Scene 28 - "She touched the wall in 2 minutes, 7.41 seconds."
 *
 * The film's signature number, over the CGTN footage of that exact swim. The scene is only 118
 * mounted frames, so the window is compressed: rise 30-52 as she says "minutes" (+47f), complete at
 * 52, out0 = 52 + 30, gone by 108.
 */
const W: Win = [30, 52, 82, 108];

export const Scene28: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(28)} dur={S28_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="200m IM - National Games, Nov 2025"
        value="2:07.41"
        k={winK(frame, W)}
        accent={C.emerald}
        x={600}
        y={360}
        width={720}
        align="center"
        valueSize={160}
      />
    </BedChain>
  );
};
