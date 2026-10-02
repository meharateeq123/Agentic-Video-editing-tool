import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6
 * Wu's gap to Zhang narrows from 0.43s in heats to 0.21s in the final.
 */
const BARS_W: Win = [435, 465, 690, 716];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Wu's gap to Zhang"
          rows={[
            {name: 'HEATS', frac: 1, value: '0.43s', color: C.steel},
            {name: 'FINAL', frac: 0.21 / 0.43, value: '0.21s', color: C.amber},
          ]}
          k={k}
          grow={[p(frame, 485, 515), p(frame, 505, 535)]}
          x={130}
          y={330}
          width={900}
          footnote="The gap closed by more than half"
          nameW={200}
        />
      </Overlay>
    </BedChain>
  );
};
