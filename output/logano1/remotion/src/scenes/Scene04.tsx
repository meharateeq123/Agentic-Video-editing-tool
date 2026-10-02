import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "That's not a narrow win. That's a gap. Logano beat second-place qualifier Kyle
 * Larson, who ran 135.980 miles per hour, by 0.276 seconds..." The whole scene is the comparison,
 * so the card lands at the top.
 */
const W: Win = [24, 54, 138, 164];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 54, 88);
  const g2 = ease(frame, 74, 108);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <CompareBars
        title="Qualifying Speed (mph)"
        rows={[
          {name: 'Logano', frac: 137.124 / 137.124, value: '137.124', color: C.amber},
          {name: 'Larson', frac: 135.98 / 137.124, value: '135.980', color: C.steel},
        ]}
        k={k}
        grow={[g1, g2]}
        x={480}
        y={360}
        width={960}
        footnote="0.276s covers both laps - the largest pole margin in recent memory"
      />
    </BedChain>
  );
};
