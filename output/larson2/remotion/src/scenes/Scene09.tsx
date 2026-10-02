import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - "That's a 40-point swing in one race... Larson isn't a long shot chasing the leader
 * anymore." The centerpiece stat of the whole film - the gap narrowing, not widening, so the bar
 * shrinks. VO transcript: "49...points behind" lands ~frame 76-119, "9...points back" lands
 * ~frame 157-177 - the two bars grow on those exact words.
 */
const W: Win = [50, 80, 210, 236];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 76, 110);
  const g2 = ease(frame, 150, 180);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <CompareBars
        title="Gap to Hamlin - Chase Standings"
        rows={[
          {name: 'Morning', frac: 1, value: '-49', color: C.steel},
          {name: 'Night', frac: 9 / 49, value: '-9', color: C.emerald},
        ]}
        k={k}
        grow={[g1, g2]}
        x={460}
        y={380}
        width={1000}
        footnote="A 40-point swing, in one race."
      />
    </BedChain>
  );
};
