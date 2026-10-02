import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12
 * The 4x100 medley relay breaks the old Games record: 3:54.73 -> 3:54.55.
 */
const BARS_W: Win = [405, 435, 660, 686];

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(12)} dur={S12_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Women's 4x100m medley relay"
          rows={[
            {name: 'PREVIOUS GR', frac: 1, value: '3:54.73', color: C.steel},
            {name: 'CHINA (NEW GR)', frac: 234.55 / 234.73, value: '3:54.55', color: C.amber},
          ]}
          k={k}
          grow={[p(frame, 455, 485), p(frame, 471, 501)]}
          x={130}
          y={330}
          width={900}
          footnote="Games record"
          nameW={220}
        />
      </Overlay>
    </BedChain>
  );
};
