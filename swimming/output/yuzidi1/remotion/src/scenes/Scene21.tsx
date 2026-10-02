import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - "Three finals against the best adults in the world. Three fourth-place finishes. Every
 * single one decided by less than a second."
 *
 * The three margins the previous scenes named, side by side: 0.06s to bronze (200 IM), 0.31s to the
 * podium (200 fly), about half a second to silver (400 IM). The last row grows in at 106-140, so
 * out0 = 140 + 30.
 */
const W: Win = [24, 54, 170, 196];

export const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = ease(frame, 54, 88);
  const g2 = ease(frame, 80, 114);
  const g3 = ease(frame, 106, 140);
  return (
    <BedChain segs={chain(21)} dur={S21_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <CompareBars
        title="How close she came - Singapore 2025"
        rows={[
          {name: '200m IM', frac: 0.06 / 0.5, value: '0.06s', color: C.amber},
          {name: '200m fly', frac: 0.31 / 0.5, value: '0.31s', color: C.steel},
          {name: '400m IM', frac: 0.5 / 0.5, value: '~0.5s', color: C.red},
        ]}
        k={winK(frame, W)}
        grow={[g1, g2, g3]}
        x={470}
        y={300}
        width={980}
        nameW={190}
        footnote="Three finals - three fourth places"
      />
    </BedChain>
  );
};
