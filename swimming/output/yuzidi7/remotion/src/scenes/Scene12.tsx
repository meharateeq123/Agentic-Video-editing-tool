import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PositionChart, p} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

const mmss = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(2).padStart(5, '0');
  return `${m}:${sec}`;
};

/**
 * Scene 12
 * McIntosh's 400 IM world record has moved three times: 2023, 2024, June 2025.
 */
const CHART_W: Win = [280, 312, 940, 966];

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CHART_W);
  const draw = p(frame, 330, 420);
  return (
    <BedChain segs={chain(12)} dur={S12_DUR} wins={[CHART_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <PositionChart
          title="McIntosh's 400m IM world record"
          data={[
            [0, 265.87],
            [1, 264.38],
            [2, 263.65],
          ]}
          maxLap={2}
          top={263.65}
          bottom={265.87}
          draw={draw}
          k={k}
          x={110}
          y={280}
          width={940}
          height={420}
          color={C.amber}
          xTicks={[0, 1, 2]}
          yLabel={mmss}
          xLabel={(t) => ['2023', '2024', '2025'][t]}
        />
      </Overlay>
    </BedChain>
  );
};
