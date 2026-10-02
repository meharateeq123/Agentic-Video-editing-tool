import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {Chip} from '../components/Elements';
import {bed} from '../footage';

export const S06_DUR = 547; // 56.51 -> 74.73s

/**
 * Scene 6 — the reversal, as the dates actually fell. The line's whole point is that the
 * sponsorship was public months before the seat was pulled, so the graphic is three dates in
 * the order the narration says them: sponsors announced, extension agreed, decision reversed.
 * Every date and claim here is stated in the script; nothing is inferred.
 *
 * The bed keeps playing underneath and only blurs while the dates are up.
 */
const W: Win = [30, 64, 470, 520];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const c1 = ease(g, 8, 44);
  const c2 = ease(g, 96, 132);
  const c3 = ease(g, 196, 232);

  return (
    <SceneBed {...bed(6)} dur={S06_DUR} wins={[W]} accent={C.amber} amp={0.09} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={14}>
        <Chip
          text="MAY & JUNE — 2027 sponsors announced with Nemechek"
          k={c1}
          accent={C.steel}
          x={250}
          y={330}
          width={1420}
          size={30}
        />
        <Chip
          text="SEPT 1 — Reported: extension agreed for the No. 42"
          k={c2}
          accent={C.emerald}
          x={250}
          y={456}
          width={1420}
          size={30}
        />
        <Chip
          text="SEPT 2 — Legacy confirms he will not return"
          k={c3}
          accent={C.red}
          x={250}
          y={582}
          width={1420}
          size={30}
        />
      </Overlay>
    </SceneBed>
  );
};
