import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Before Sunday, Blaney sat third in the Chase standings, 16 points behind leader
 * Denny Hamlin... After the brake failure, that gap exploded. Blaney now trails Hamlin by 33
 * points, more than double what it was heading into the race."
 */
const W: Win = [40, 70, 160, 186];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 70, 104);
  const g2 = ease(frame, 90, 130);

  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <CompareBars
        title="Gap to Hamlin - Chase Standings"
        rows={[
          {name: 'Before', frac: 16 / 33, value: '-16', color: C.steel},
          {name: 'After', frac: 1, value: '-33', color: C.red},
        ]}
        k={k}
        grow={[g1, g2]}
        x={460}
        y={380}
        width={1000}
        footnote="More than double the gap, from one race."
      />
    </BedChain>
  );
};
