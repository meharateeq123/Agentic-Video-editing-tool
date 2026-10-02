import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "Fourth, seventy five thousand dollars in cash, paid to the winner as a check."
 * Prize 4 of 4 - short scene, a quick stat card rather than a photo (there's no single object to
 * show for a cash prize).
 */
const W: Win = [10, 26, 56, 82];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.5}>
      <StatCard
        label="Prize 4 of 4"
        value="$75,000"
        caption="Paid to the winner as a check."
        k={k}
        accent={C.red}
        x={610}
        y={420}
        width={700}
        align="center"
        valueSize={110}
      />
    </BedChain>
  );
};
