import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars, StatCard} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "... his eight gold medals at the Beijing Olympics in 2008 earned him roughly 2 million
 * dollars in performance bonuses ... around 7 million dollars total ... a small fraction ..."
 *
 * Two graphics, each gone a second after it completes:
 *   - "$2M" lands on "2 million" (+184f): complete at 210, out0 240.
 *   - the comparison lands on "7 million" (+499f): bonuses against the low net-worth estimate. The
 *     last bar finishes growing at 585, so out0 = 615.
 */
const W1: Win = [180, 210, 240, 266];
const W2: Win = [495, 525, 615, 641];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = ease(frame, 525, 559);
  const g2 = ease(frame, 540, 574);
  const g3 = ease(frame, 551, 585);
  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W1, W2]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Beijing 2008 - eight golds"
        value="~$2M"
        caption="In performance bonuses from USA Swimming and sponsors."
        k={winK(frame, W1)}
        accent={C.amber}
        x={120}
        y={300}
        width={820}
        valueSize={140}
      />
      <CompareBars
        title="Medal money vs. the fortune"
        rows={[
          {name: 'Beijing bonuses', frac: 2 / 80, value: '~$2M', color: C.amber},
          {name: 'Career medal bonuses', frac: 7 / 80, value: '~$7M', color: C.steel},
          {name: 'Net worth (low estimate)', frac: 1, value: '$80M+', color: C.emerald},
        ]}
        k={winK(frame, W2)}
        grow={[g1, g2, g3]}
        x={420}
        y={300}
        width={1080}
        nameW={330}
        footnote="Endorsements, not medals, built the fortune"
      />
    </BedChain>
  );
};
