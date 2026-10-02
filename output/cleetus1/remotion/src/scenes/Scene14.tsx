import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {PositionChart} from '../components/DataViz';
import {bed} from '../footage';

export const S14_DUR = 341; // 154.17 -> 167.65s

/** Running position across the 75 laps: flat at P2, then the tyre-wear fade. */
const RUN: [number, number][] = [
  [0, 2], [6, 2], [12, 2], [18, 2], [24, 2], [30, 2],
  [37, 4], [44, 6], [51, 8], [58, 10], [65, 12], [70, 13], [75, 13],
];

/**
 * Scene 14 — the second race, drawn as it happened. The chart rides on the
 * blurred clip and draws in time with the line, then lifts off it.
 */
const W: Win = [103, 135, 310, 337];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const card = ease(g, 8, 48);
  // start with a stretch of the line already down, so the panel is never
  // an empty box waiting for data
  const draw = interpolate(g, [10, 44, 150, 232], [0.1, 0.2, 0.42, 1], {
    easing: Easing.bezier(0.35, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBed {...bed(14)} dur={S14_DUR} wins={[W]} accent={C.steel} amp={0.09} maxBlur={16} dim={0.34}>
      <Overlay k={winK(frame, W)} rise={16}>
        <PositionChart
          data={RUN}
          maxLap={75}
          top={1}
          bottom={15}
          draw={draw}
          k={card}
          x={336}
          y={322}
          width={1248}
          height={436}
          title="Running position — Berlin, 75 laps"
          color={C.emerald}
          fadeColor={C.red}
          fadeFrom={0.4}
          xTicks={[0, 30, 75]}
        />
      </Overlay>
    </SceneBed>
  );
};

