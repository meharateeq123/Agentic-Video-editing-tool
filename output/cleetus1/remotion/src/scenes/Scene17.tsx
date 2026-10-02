import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {CompareBars, p} from '../components/DataViz';
import {bed} from '../footage';

export const S17_DUR = 387; // 184.26 -> 201.03s

/**
 * Scene 17 — the two Berlin races side by side. Bars are scaled against a
 * 25-car field, so longer really does mean better. The comparison leaves the
 * frame before the closing line, which plays on the footage alone.
 */
const W: Win = [55, 83, 228, 254];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const card = ease(g, 6, 46);
  const g1 = p(g, 46, 104);
  const g2 = p(g, 104, 162);

  return (
    <SceneBed {...bed(17)} dur={S17_DUR} wins={[W]} accent={C.steel} amp={0.1} maxBlur={16} dim={0.34}>
      <Overlay k={winK(frame, W)} rise={16}>
        <CompareBars
          title="Two races at Berlin, days apart"
          rows={[
            {name: 'Tekton 250', frac: 0.28, value: 'P19', color: C.red},
            {name: 'His own series', frac: 0.52, value: 'P13', color: C.emerald},
          ]}
          grow={[g1, g2]}
          k={card}
          x={302}
          y={352}
          width={1316}
          nameW={300}
          rowH={62}
          footnote="One ended in a wreck — the other, a top-15"
        />
      </Overlay>
    </SceneBed>
  );
};

