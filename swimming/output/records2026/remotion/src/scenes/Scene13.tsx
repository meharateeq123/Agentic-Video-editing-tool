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
 * Scene 13 - "... she still went on to win the 400 IM in a championship record time of 4:28.01 ..."
 *
 * On "28" (320.58s = +326f). out0 = in1 + 30.
 */
const W: Win = [323, 353, 383, 409];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="Women's 400m IM - championship record"
        value="4:28.01"
        caption="Summer McIntosh, gold at the 2026 Pan Pacific Championships."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={800}
        valueSize={150}
      />
    </BedChain>
  );
};
