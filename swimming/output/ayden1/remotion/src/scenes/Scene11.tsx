import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "... Tan dropped his 100 yard freestyle to a personal best of 53.90 seconds, a full
 * second faster than the 54.91 he had swum the previous July."
 *
 * "53.90" lands at 130.78s (+261f) and "54.91" at 134.20s (+364f), so each bar grows as its own
 * time is said. The second finishes at 376, so out0 = 376 + 30.
 */
const W: Win = [249, 261, 406, 432];
const span = (t: number) => (t - 53) / 2.5;

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <CompareBars
        title="100 yard freestyle - a year apart"
        rows={[
          {name: 'July 2025', frac: span(54.91), value: '54.91', color: C.muted},
          {name: 'July 2026', frac: span(53.9), value: '53.90', color: C.amber},
        ]}
        grow={[ease(frame, 364, 376), ease(frame, 261, 295)]}
        k={winK(frame, W)}
        x={140}
        y={360}
        width={900}
        footnote="Bars start at 53 seconds"
      />
    </BedChain>
  );
};
