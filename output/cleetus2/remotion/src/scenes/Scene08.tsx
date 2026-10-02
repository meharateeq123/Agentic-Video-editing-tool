import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Add it all up and the total value is three hundred thousand dollars. Car, truck,
 * trailer, and cash, going to a single person." The four prize cards (scenes 4-7) add up here -
 * the one comparison card the build-up has been pointing to.
 */
const W: Win = [24, 54, 200, 226];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 54, 92);
  const g2 = ease(frame, 80, 118);
  const g3 = ease(frame, 106, 144);
  const g4 = ease(frame, 132, 170);

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <CompareBars
        title="Total Prize Value"
        rows={[
          {name: 'Corvette', frac: 140 / 140, value: '$140K', color: C.amber},
          {name: 'Silverado', frac: 75 / 140, value: '$75K', color: C.steel},
          {name: 'Trailer', frac: 10 / 140, value: '$10K', color: C.emerald},
          {name: 'Cash', frac: 75 / 140, value: '$75K', color: C.red},
        ]}
        k={k}
        grow={[g1, g2, g3, g4]}
        x={470}
        y={280}
        width={980}
        nameW={190}
        footnote="$300,000 Total - One Winner"
      />
    </BedChain>
  );
};
