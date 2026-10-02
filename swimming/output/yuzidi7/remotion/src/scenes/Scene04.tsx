import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4
 * Yu's 400 IM (4:28.56) just misses Ye Shiwen's 2012 continental record (4:28.43) by 0.13s.
 */
const BARS_W: Win = [320, 352, 720, 746];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Women's 400m IM - continental record"
          rows={[
            {name: 'YE SHIWEN (2012)', frac: 268.43 / 268.56, value: '4:28.43', color: C.steel},
            {name: 'YU ZIDI (2026)', frac: 1, value: '4:28.56', color: C.amber},
          ]}
          k={k}
          grow={[p(frame, 372, 402), p(frame, 388, 418)]}
          x={130}
          y={330}
          width={900}
          footnote="Missed by 0.13 seconds"
          nameW={230}
        />
      </Overlay>
    </BedChain>
  );
};
