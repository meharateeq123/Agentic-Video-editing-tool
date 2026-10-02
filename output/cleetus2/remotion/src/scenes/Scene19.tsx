import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - "Here is the clock you are racing against. The giveaway began on August seventh,
 * 2026, and it ends on September twenty fifth at 11:59 at night, Eastern time. If you mail your
 * entry, it needs to be postmarked by September twenty sixth and land in the mailbox by September
 * thirtieth." The one date worth pinning on screen.
 */
const W: Win = [24, 54, 84, 110];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(19)} dur={S19_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Entry Deadline"
        value="Sept 25"
        caption="11:59 PM Eastern - mailed entries postmarked by the 26th, in the mailbox by the 30th."
        k={k}
        accent={C.amber}
        x={560}
        y={380}
        width={800}
        align="center"
        valueSize={120}
      />
    </BedChain>
  );
};
