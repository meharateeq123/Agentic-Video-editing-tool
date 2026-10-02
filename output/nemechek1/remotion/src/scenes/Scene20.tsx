import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {CompareBars} from '../components/DataViz';
import {Chip} from '../components/Elements';
import {bed} from '../footage';

export const S20_DUR = 632; // 271.18 -> 292.22s

/**
 * Scene 20 — the record that says he can drive. The narration's argument is that the Cup
 * results are the outlier, not the driver, so the graphic puts the two lower series side by
 * side at their real win counts and then adds the two seasons the script singles out.
 *
 * 13 Truck wins, 11 O'Reilly Series wins, 2021 (five wins, third in points) and 2023 (seven
 * wins for Joe Gibbs Racing, fourth in the championship) — all from the script.
 */
const W: Win = [28, 62, 548, 600];

const ROWS = [
  {name: 'Truck Series', frac: 1, value: '13 wins', color: C.amber},
  {name: "O'Reilly Series", frac: 11 / 13, value: '11 wins', color: C.steel},
];

export const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const card = ease(g, 6, 46);
  const grow = [ease(g, 30, 86), ease(g, 70, 126)];
  const y1 = ease(g, 230, 274);
  const y2 = ease(g, 330, 374);

  return (
    <SceneBed {...bed(20)} dur={S20_DUR} wins={[W]} accent={C.amber} amp={0.11} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={16}>
        <CompareBars
          title="Career wins below Cup level"
          rows={ROWS}
          k={card}
          grow={grow}
          x={300}
          y={286}
          width={1320}
          nameW={230}
        />
        <Chip
          text="2021 — five Truck Series wins, third in points"
          k={y1}
          accent={C.emerald}
          x={300}
          y={578}
          width={1320}
          size={28}
        />
        <Chip
          text="2023 — seven O'Reilly Series wins for Joe Gibbs Racing, fourth in the championship"
          k={y2}
          accent={C.emerald}
          x={300}
          y={684}
          width={1320}
          size={28}
        />
      </Overlay>
    </SceneBed>
  );
};
