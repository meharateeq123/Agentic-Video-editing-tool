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
 * Heats results: Zhang 25.57 fastest, Ikee 25.98, Wu 26.00.
 */
const BARS_W: Win = [444, 474, 690, 716];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Heats - Women's 50m Butterfly"
          rows={[
            {name: 'ZHANG', frac: 25.57 / 26.0, value: '25.57', color: C.amber},
            {name: 'IKEE', frac: 25.98 / 26.0, value: '25.98', color: C.steel},
            {name: 'WU', frac: 1, value: '26.00', color: C.steel},
          ]}
          k={k}
          grow={[p(frame, 494, 524), p(frame, 510, 540), p(frame, 526, 556)]}
          x={130}
          y={310}
          width={900}
          nameW={200}
        />
      </Overlay>
    </BedChain>
  );
};
