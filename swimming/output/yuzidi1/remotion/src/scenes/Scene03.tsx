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
 * Scene 3 - opens straight off scene 2's "She is twelve years old."
 *
 * Scene 2 is only 1.4s (58 mounted frames), too short for a card to rise, hold and fall, so the
 * number lands at the top of this scene instead - still on the beat, since it cuts in immediately.
 * StatCard's content is complete at W[1]; out0 = W[1] + 30.
 */
const W: Win = [6, 36, 66, 92];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Age at Singapore 2025"
        value="12"
        caption="Years old - in a World Championship final."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={620}
        valueSize={150}
      />
    </BedChain>
  );
};
