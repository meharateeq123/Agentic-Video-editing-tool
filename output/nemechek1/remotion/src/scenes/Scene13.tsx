import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {Chip, Statement} from '../components/Elements';
import {bed} from '../footage';

export const S13_DUR = 640; // 154.36 -> 175.71s

/**
 * Scene 13 — Legacy's 2027 line-up as the narration builds it: two cars becoming three, one
 * seat already locked, one new seat spoken for, and the No. 42 left as the open question. The
 * chips arrive in the order the voiceover names them, so nothing is on screen before it is
 * said. Herbst is marked "expected" because the script says expected, not confirmed.
 */
const W: Win = [28, 62, 560, 610];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const head = ease(g, 4, 40);
  const c1 = ease(g, 108, 146);
  const c2 = ease(g, 210, 248);
  const c3 = ease(g, 320, 358);

  return (
    <SceneBed {...bed(13)} dur={S13_DUR} wins={[W]} accent={C.steel} amp={0.1} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={14}>
        <Statement
          label="Legacy Motor Club — 2027"
          headline="Two cars become three"
          k={head}
          accent={C.steel}
          x={250}
          y={250}
          width={1420}
          size={58}
        />
        <Chip
          text="No. 43 — Erik Jones, signed through a multi-year extension"
          k={c1}
          accent={C.emerald}
          x={250}
          y={430}
          width={1420}
          size={29}
        />
        <Chip
          text="Third entry — Riley Herbst expected, leaving 23XI"
          k={c2}
          accent={C.steel}
          x={250}
          y={548}
          width={1420}
          size={29}
        />
        <Chip
          text="No. 42 — open, no replacement announced"
          k={c3}
          accent={C.amber}
          x={250}
          y={666}
          width={1420}
          size={29}
        />
      </Overlay>
    </SceneBed>
  );
};
