import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Tan had opened the year at 51.11 in that same event back in January 2025. He dropped
 * nearly two full seconds in about a year ..."
 *
 * "51.11" lands at 91.36s (+92f). The second bar finishes growing at 138, so out0 = 138 + 30.
 * Bars start at 48 seconds so the 1.86s difference is readable; the footnote says so.
 */
const W: Win = [80, 92, 168, 194];
const span = (t: number) => (t - 48) / 4;

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <CompareBars
        title="100 yard backstroke - a year apart"
        rows={[
          {name: 'Jan 2025', frac: span(51.11), value: '51.11', color: C.muted},
          {name: 'Apr 2026', frac: span(49.25), value: '49.25', color: C.amber},
        ]}
        grow={[ease(frame, 92, 126), ease(frame, 104, 138)]}
        k={winK(frame, W)}
        x={140}
        y={360}
        width={900}
        footnote="Bars start at 48 seconds"
      />
    </BedChain>
  );
};
