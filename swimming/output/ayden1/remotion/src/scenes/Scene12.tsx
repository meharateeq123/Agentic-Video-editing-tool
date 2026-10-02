import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - "In the same meet, he lowered his 50 yard backstroke to 27.54, another second-level
 * drop from his 28.86 the previous August."
 *
 * "27.54" lands at 139.96s (+87f) and "28.86" at 143.08s (+180f). The second bar finishes at 192,
 * so out0 = 192 + 30.
 */
const W: Win = [75, 87, 222, 248];
const span = (t: number) => (t - 27) / 2.5;

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(12)} dur={S12_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <CompareBars
        title="50 yard backstroke - a year apart"
        rows={[
          {name: 'Aug 2025', frac: span(28.86), value: '28.86', color: C.muted},
          {name: 'July 2026', frac: span(27.54), value: '27.54', color: C.amber},
        ]}
        grow={[ease(frame, 180, 192), ease(frame, 87, 121)]}
        k={winK(frame, W)}
        x={140}
        y={360}
        width={900}
        footnote="Bars start at 27 seconds"
      />
    </BedChain>
  );
};
