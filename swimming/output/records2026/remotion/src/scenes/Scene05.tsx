import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "... Walsh lowered her own 100 fly record to 54.33 seconds ... more than a second clear
 * of the second-fastest performer in history, Sarah Sjostrom, at 55.48 ..."
 *
 * The two fastest 100 fly swims ever, landing on "55.48" (99.14s = +682f). Bars are drawn on a
 * 53-56s axis so the gap reads at its true proportion. The second bar finishes growing at 754, so
 * out0 = 784.
 */
const W: Win = [678, 708, 784, 810];
const AXIS = (t: number) => (t - 53) / 3;

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.5}>
      <CompareBars
        title="Women's 100m butterfly - fastest ever"
        rows={[
          {name: 'Gretchen Walsh', frac: AXIS(54.33), value: '54.33', color: C.amber},
          {name: 'Sarah Sjöström', frac: AXIS(55.48), value: '55.48', color: C.steel},
        ]}
        k={winK(frame, W)}
        grow={[ease(frame, 708, 742), ease(frame, 720, 754)]}
        x={420}
        y={380}
        width={1080}
        nameW={290}
        rowH={70}
        footnote="More than a second clear - bars start at 53 seconds"
      />
    </BedChain>
  );
};
