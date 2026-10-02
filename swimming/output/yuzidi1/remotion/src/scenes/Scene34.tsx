import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S34_DUR = mountedFrames(34);

/**
 * Scene 34 - "The next Olympics are in Los Angeles in 2028. When those Games arrive, Yu Zidi will be
 * fifteen."
 *
 * Lands on "15" (+219f). StatCard's content is complete at W[1]; out0 = W[1] + 30.
 */
const W: Win = [212, 242, 272, 298];

export const Scene34: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(34)} dur={S34_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Los Angeles 2028"
        value="Age 15"
        caption="With three World Championship finals and an Asian record already behind her."
        k={winK(frame, W)}
        accent={C.steel}
        x={120}
        y={300}
        width={780}
        valueSize={132}
      />
    </BedChain>
  );
};
