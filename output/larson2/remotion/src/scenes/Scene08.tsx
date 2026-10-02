import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Larson's victory...vaulted him from seventh to second in the Chase standings in a
 * single afternoon..." VO transcript: "7th to 2nd" lands at scene-local frame ~330-348, close to
 * this short scene's own end - the card is compressed to fit before the cut.
 */
const W: Win = [300, 330, 355, 384];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Chase Standings"
        value="P2"
        caption="Up from seventh, in a single afternoon."
        k={k}
        accent={C.emerald}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={140}
      />
    </BedChain>
  );
};
