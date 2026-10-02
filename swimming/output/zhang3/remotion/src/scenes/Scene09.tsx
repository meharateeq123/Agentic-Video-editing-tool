import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9
 * Zhang's three fastest 50 fly swims: PB 25.05, season-best 25.27, this Games 25.41.
 */
const BARS_W: Win = [1020, 1050, 1260, 1286];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Zhang Yufei - fastest 50m fly swims"
          rows={[
            {name: 'PB (2023)', frac: 25.05 / 25.41, value: '25.05', color: C.amber},
            {name: 'SEASON BEST', frac: 25.27 / 25.41, value: '25.27', color: C.steel},
            {name: 'THIS RACE', frac: 1, value: '25.41', color: C.steel},
          ]}
          k={k}
          grow={[p(frame, 1070, 1100), p(frame, 1086, 1116), p(frame, 1102, 1132)]}
          x={130}
          y={300}
          width={900}
          nameW={220}
        />
      </Overlay>
    </BedChain>
  );
};
