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
 * Scene 3 - "Larson came into the Enjoy Illinois 300 sitting seventh in the Chase standings, 49
 * points behind Hamlin..." VO transcript: "seventh" lands at scene-local frame ~134, "...behind
 * Hamlin." finishes at ~224 - the card is timed to that, not a generic template.
 */
const W: Win = [100, 135, 254, 280];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Chase Standings"
        value="P7"
        caption="49 points behind leader Denny Hamlin, off a 51-race winless streak."
        k={k}
        accent={C.red}
        x={510}
        y={370}
        width={900}
        align="center"
        valueSize={140}
      />
    </BedChain>
  );
};
