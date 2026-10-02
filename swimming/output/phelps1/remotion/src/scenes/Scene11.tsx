import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "... In 2024, he signed a new multi-year partnership with Talkspace worth a reported 3
 * million dollars ..."
 *
 * Over the Talkspace ad itself. Lands on "$3 million" (+692f). out0 = W[1] + 30.
 */
const W: Win = [687, 717, 747, 773];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Talkspace partnership - 2024"
        value="$3M"
        caption="Multi-year, reported."
        k={winK(frame, W)}
        accent={C.emerald}
        x={120}
        y={300}
        width={780}
        valueSize={150}
      />
    </BedChain>
  );
};
