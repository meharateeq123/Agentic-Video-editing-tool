import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {StatCard} from '../components/DataViz';
import {Chip, Statement} from '../components/Elements';
import {bed} from '../footage';

export const S15_DUR = 892; // 183.85 -> 213.60s

/**
 * Scene 15 — the name attached to the seat. The longest scene in the film, so it is staged in
 * two halves: first who Berry is and why he is leaving the No. 21, then the form that makes him
 * the upgrade the narration describes. His five straight top-10s and the best August average in
 * the Cup field are the script's own figures.
 *
 * "Nothing is finalized" is the line's own hedge, and the closing chip keeps it on screen so the
 * graphic never claims more than the reporting does.
 */
const W: Win = [30, 66, 800, 856];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const head = ease(g, 4, 42);
  const c1 = ease(g, 110, 150);
  const c2 = ease(g, 214, 254);
  const streak = ease(g, 380, 430);
  const avg = ease(g, 470, 520);
  const hedge = ease(g, 620, 664);

  return (
    <SceneBed {...bed(15)} dur={S15_DUR} wins={[W]} accent={C.amber} amp={0.11} maxBlur={17} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={16}>
        <Statement
          label="Linked to the No. 42"
          headline="Josh Berry"
          k={head}
          accent={C.amber}
          x={230}
          y={216}
          width={1460}
          size={72}
        />
        <Chip
          text="Currently the No. 21, Wood Brothers Racing"
          k={c1}
          accent={C.steel}
          x={230}
          y={392}
          width={1460}
          size={28}
        />
        <Chip
          text="Told he will not return for 2027 — Jesse Love takes the seat"
          k={c2}
          accent={C.red}
          x={230}
          y={498}
          width={1460}
          size={28}
        />

        <StatCard
          label="Recent form"
          value={
            <span
              style={{
                fontFamily: FONT,
                fontSize: 104,
                fontWeight: 800,
                color: C.emerald,
                letterSpacing: -4,
                lineHeight: 1,
              }}
            >
              5
            </span>
          }
          caption="Straight top-10 finishes."
          k={streak}
          accent={C.emerald}
          x={230}
          y={620}
          width={470}
        />
        <StatCard
          label="August"
          value={
            <span
              style={{
                fontFamily: FONT,
                fontSize: 62,
                fontWeight: 800,
                color: C.emerald,
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              Best average
            </span>
          }
          caption="Of any driver in the Cup Series."
          k={avg}
          accent={C.emerald}
          x={740}
          y={620}
          width={470}
        />
        <Chip
          text="Nothing is finalized"
          k={hedge}
          accent={C.muted}
          x={1256}
          y={700}
          width={434}
          size={28}
        />
      </Overlay>
    </SceneBed>
  );
};
