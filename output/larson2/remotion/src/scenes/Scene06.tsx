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
 * Scene 6 - "...He led 80 laps, won Stage 2, and passed Joey Logano for the lead following a
 * restart with 13 laps to go. He held on through the final overtime, crossing the line 0.333
 * seconds ahead of his own Hendrick Motorsports teammate, Alex Bowman..." Real restart-pass
 * footage under it (highlights.mp4 offset 1611). VO transcript: "0 .33 seconds" lands at
 * scene-local frame ~491-522, right near the scene's own end - the card is compressed to fit.
 */
const W: Win = [455, 485, 500, 526];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Winning Margin"
        value="0.333s"
        caption="Ahead of his own Hendrick Motorsports teammate, Alex Bowman."
        k={k}
        accent={C.emerald}
        x={470}
        y={370}
        width={980}
        align="center"
        valueSize={120}
      />
    </BedChain>
  );
};
