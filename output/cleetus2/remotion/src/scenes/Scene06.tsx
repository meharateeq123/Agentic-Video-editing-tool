import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "Third, a 2026 Challenger twenty foot car hauler trailer, worth roughly ten thousand
 * dollars... the truck and the trailer are a matched set... a complete race day setup." Prize 3 of
 * 4 - a stat card rather than a photo card: no confirmed real photo of this exact trailer could be
 * sourced (candidates found were either the wrong equipment entirely or a full semi-truck
 * transporter, not the small towable trailer the script describes), so this stays text-only rather
 * than risk showing the wrong item.
 */
const W: Win = [20, 46, 76, 102];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.5}>
      <StatCard
        label="Prize 3 of 4"
        value="$10,000"
        caption="20-Ft car hauler trailer - a matched set with the truck. Load the Corvette on, tow it away."
        k={k}
        accent={C.emerald}
        x={560}
        y={400}
        width={800}
        align="center"
        valueSize={100}
      />
    </BedChain>
  );
};
