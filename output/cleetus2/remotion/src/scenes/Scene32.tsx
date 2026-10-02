import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S32_DUR = mountedFrames(32);

/**
 * Scene 32 - "Now he is standing at three hundred thousand. That is nearly double the spring
 * package, and it is the largest one in that entire run." Closes the climb the previous scene's
 * narration walked through (2024 GMC ~$85K, 2025 Corvette ~$70K, Spring King of the Streets ~$190K,
 * now $300K) - the second and last comparison card in the film.
 */
const W: Win = [24, 54, 194, 220];

export const Scene32: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 54, 88);
  const g2 = ease(frame, 78, 112);
  const g3 = ease(frame, 102, 136);
  const g4 = ease(frame, 126, 164);

  return (
    <BedChain segs={chain(32)} dur={S32_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <CompareBars
        title="Giveaway Value - By Year"
        rows={[
          {name: '2024', frac: 85 / 300, value: '$85K', color: C.dim},
          {name: '2025', frac: 70 / 300, value: '$70K', color: C.steel},
          {name: 'Spring \'26', frac: 190 / 300, value: '$190K', color: C.emerald},
          {name: 'Now', frac: 300 / 300, value: '$300K', color: C.amber},
        ]}
        k={k}
        grow={[g1, g2, g3, g4]}
        x={510}
        y={280}
        width={900}
        footnote="Biggest Giveaway Yet"
      />
    </BedChain>
  );
};
