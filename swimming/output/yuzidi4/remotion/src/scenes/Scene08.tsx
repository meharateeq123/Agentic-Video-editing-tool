import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - the one graphic this film leans on: "Yu Zidi is now the second-fastest woman to ever
 * swim the 200 meter individual medley. Only Summer McIntosh... has gone faster." One chart, placed
 * late in the scene once the VO has said all three names, nothing else on screen.
 */
const W: Win = [560, 590, 860, 888];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const grow = [p(frame, 610, 640), p(frame, 626, 656), p(frame, 642, 672)];
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.05} maxBlur={12} dim={0.36}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="All-Time Fastest 200m Individual Medley (Women)"
          rows={[
            {name: 'MCINTOSH', frac: 1.0, value: '2:05.70', color: C.steel},
            {name: 'YU ZIDI', frac: 105.7 / 126.1, value: '2:06.10', color: C.amber},
            {name: 'HOSSZU', frac: 105.7 / 126.12, value: '2:06.12', color: C.muted},
          ]}
          k={k}
          grow={grow}
          x={130}
          y={560}
          width={800}
          footnote="Hosszu's old world record - now pushed to third all-time"
          nameW={170}
        />
      </Overlay>
    </BedChain>
  );
};
