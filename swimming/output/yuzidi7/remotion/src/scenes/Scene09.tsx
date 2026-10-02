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
 * The gap to McIntosh across all three shared events: close in the 200 IM, real distance in the
 * 400 IM and 200 fly.
 */
const BARS_W: Win = [300, 332, 860, 886];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Yu Zidi's gap to McIntosh's world records"
          rows={[
            {name: '200 IM', frac: 0.4 / 4.91, value: '0.40s', color: C.amber},
            {name: '200 FLY', frac: 3.43 / 4.91, value: '3.43s', color: C.steel},
            {name: '400 IM', frac: 1, value: '4.91s', color: C.steel},
          ]}
          k={k}
          grow={[p(frame, 352, 382), p(frame, 368, 398), p(frame, 384, 414)]}
          x={130}
          y={300}
          width={900}
          nameW={160}
        />
      </Overlay>
    </BedChain>
  );
};
