import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 (longest scene) - "Look closer at what the splits actually reveal about her race shape...
 * McIntosh's own world record is built on a strong opening fly and a dominant closing freestyle...
 * Yu's swim followed a different pattern... competitive on three different strokes rather than
 * dominant on just one, is rare at any age, let alone 13."
 * All four legs, side by side against McIntosh's own world-record splits.
 */
const W: Win = [70, 96, 1000, 1030];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const grow = [
    p(frame, 100, 128),
    p(frame, 116, 144),
    p(frame, 132, 160),
    p(frame, 148, 176),
  ];
  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.05} maxBlur={12} dim={0.38}>
      <Overlay k={k} rise={24}>
        <CompareBars
          title="Yu Zidi's Split vs McIntosh's World-Record Pace, Leg by Leg"
          rows={[
            {name: 'FLY', frac: 1.0, value: '-0.28', color: C.emerald},
            {name: 'BACK', frac: 30.8 / 31.96, value: '+1.16', color: C.red},
            {name: 'BREAST', frac: 36.88 / 37.04, value: '+0.16', color: C.amber},
            {name: 'FREE', frac: 29.95 / 30.19, value: '+0.24', color: C.steel},
          ]}
          k={k}
          grow={grow}
          x={130}
          y={430}
          width={820}
          footnote="Ahead on fly, close on breast and free, only backstroke trails by a real margin"
          nameW={130}
        />
      </Overlay>
    </BedChain>
  );
};
