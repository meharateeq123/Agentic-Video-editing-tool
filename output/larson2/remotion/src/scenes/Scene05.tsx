import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "The Enjoy Illinois 300 produced a track-record 18 cautions and 87 caution laps..."
 * VO transcript: "track record 18 cautions and 87 caution laps," spans scene-local frame ~235-324.
 */
const W: Win = [195, 225, 354, 380];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Track Record"
        value="18"
        caption="Cautions - 87 caution laps, and two overtime restarts just to reach a finish."
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
