import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {Ordinal, StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "... Tan lowered his 100 yard backstroke to a lifetime best of 49.25 seconds. That
 * moved him to 18th all-time in the 13-14 boys rankings ..."
 *
 * "49.25" lands at 78.60s (+236f) and "18th" at 81.34s (+318f), so the time card leaves before the
 * ranking card arrives. Each is complete 12 frames after it lands: out0 = complete + 30.
 */
const W1: Win = [224, 236, 278, 304];
const W2: Win = [306, 318, 360, 386];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W1, W2]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="100 yard backstroke - Spring Age Group Champs"
        value="49.25"
        caption="A lifetime best, and second-fastest in the country in 13-14 that season."
        k={winK(frame, W1)}
        accent={C.amber}
        x={140}
        y={320}
        width={840}
        valueSize={150}
      />
      <StatCard
        label="All-time, 13-14 boys"
        value={<Ordinal n={18} size={150} color={C.text} />}
        k={winK(frame, W2)}
        accent={C.steel}
        x={140}
        y={360}
        width={620}
        valueSize={150}
      />
    </BedChain>
  );
};
