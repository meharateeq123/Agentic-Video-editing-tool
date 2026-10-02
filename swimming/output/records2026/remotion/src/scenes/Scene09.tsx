import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - Marchand's 200 IM world record, then Pan Zhanle's 100 free world record.
 *
 * Two cards, each on its number, each gone a second after it lands:
 *   - "1 minute 52.69" (200.50s = +343f). The old record was Ryan Lochte's 1:54.00.
 *   - "46.40" (211.94s = +686f).
 */
const W1: Win = [340, 370, 400, 426];
const W2: Win = [683, 713, 743, 769];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W1, W2]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="Men's 200m individual medley - world record"
        value="1:52.69"
        caption="Léon Marchand. 1.31s under Ryan Lochte's 1:54.00."
        k={winK(frame, W1)}
        accent={C.steel}
        x={120}
        y={300}
        width={820}
        valueSize={150}
      />
      <StatCard
        label="Men's 100m freestyle - world record"
        value="46.40"
        caption="Pan Zhanle, Olympic final, Paris 2024."
        k={winK(frame, W2)}
        accent={C.red}
        x={120}
        y={300}
        width={760}
        valueSize={150}
      />
    </BedChain>
  );
};
