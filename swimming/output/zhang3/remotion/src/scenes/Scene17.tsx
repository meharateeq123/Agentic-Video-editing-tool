import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * China's depth in the 50m fly: world record, Zhang, Wu, and Yu Yiting all inside 26 seconds.
 */
const BARS_W: Win = [600, 630, 726, 752];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Women's 50m fly - world record & China's depth"
          rows={[
            {name: 'WR (SJOSTROM)', frac: 24.43 / 25.92, value: '24.43', color: C.steel},
            {name: 'ZHANG', frac: 25.05 / 25.92, value: '25.05', color: C.amber},
            {name: 'WU', frac: 25.48 / 25.92, value: '25.48', color: C.steel},
            {name: 'YU YITING', frac: 1, value: '25.92', color: C.steel},
          ]}
          k={k}
          grow={[p(frame, 650, 672), p(frame, 662, 684), p(frame, 674, 696), p(frame, 686, 708)]}
          x={110}
          y={260}
          width={940}
          nameW={230}
          rowH={50}
        />
      </Overlay>
    </BedChain>
  );
};
