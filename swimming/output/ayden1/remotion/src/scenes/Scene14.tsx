import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "During his record-breaking 11-12 summer, Tan raced in six of seven consecutive
 * weekends."
 *
 * "six" lands at 166.24s (+218f); the card is complete at 230, so out0 = 230 + 30.
 */
const W: Win = [206, 218, 260, 286];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="His 11-12 record summer"
        value="6 of 7"
        caption="Consecutive weekends raced."
        k={winK(frame, W)}
        accent={C.steel}
        x={140}
        y={340}
        width={760}
        valueSize={130}
      />
    </BedChain>
  );
};
