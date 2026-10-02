import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {Chip, Statement} from '../components/Elements';
import {bed} from '../footage';

export const S17_DUR = 742; // 223.62 -> 248.37s

/**
 * Scene 17 — why there is nowhere obvious to go. The narration walks the garage team by team,
 * so the board fills in that order and every row carries the status the script gives it:
 * Hendrick settled until 2028, all three Trackhouse drivers signed through 2027, RCR set, and
 * Kaulig as the single unresolved pair — with Allmendinger's option noted, because the script
 * notes it.
 *
 * Kaulig is the only row in amber. That is the whole point of the beat.
 */
const W: Win = [30, 66, 650, 706];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const head = ease(g, 4, 42);
  const r1 = ease(g, 70, 110);
  const r2 = ease(g, 168, 208);
  const r3 = ease(g, 268, 308);
  const r4 = ease(g, 350, 392);
  const note = ease(g, 452, 494);

  return (
    <SceneBed {...bed(17)} dur={S17_DUR} wins={[W]} accent={C.amber} amp={0.1} maxBlur={17} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={16}>
        <Statement
          label="Cup Series — 2027 seats"
          headline="Almost nothing open"
          k={head}
          accent={C.amber}
          x={240}
          y={196}
          width={1440}
          size={62}
        />
        <Chip
          text="Hendrick Motorsports — Bowman resolved, no change until 2028"
          k={r1}
          accent={C.emerald}
          x={240}
          y={366}
          width={1440}
          size={28}
        />
        <Chip
          text="Trackhouse Racing — Chastain, van Gisbergen, Zilisch all signed through 2027"
          k={r2}
          accent={C.emerald}
          x={240}
          y={472}
          width={1440}
          size={28}
        />
        <Chip
          text="Richard Childress Racing — line-up set"
          k={r3}
          accent={C.emerald}
          x={240}
          y={578}
          width={1440}
          size={28}
        />
        <Chip
          text="Kaulig Racing — Allmendinger and Dillon both unconfirmed for 2027"
          k={r4}
          accent={C.amber}
          x={240}
          y={684}
          width={1440}
          size={28}
        />
        <Chip
          text="Allmendinger holds an option to stay"
          k={note}
          accent={C.muted}
          x={240}
          y={790}
          width={1440}
          size={25}
        />
      </Overlay>
    </SceneBed>
  );
};
