import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "... earning well over 10 million dollars a year through sponsorship deals with brands
 * like Under Armour, Omega, Visa, Subway, and Speedo."
 *
 * Lands on "$10 million" (+106f), before the brands are named, so the ads themselves stay clear.
 * out0 = W[1] + 30.
 */
const W: Win = [101, 131, 161, 187];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <StatCard
        label="Endorsements at his peak"
        value="$10M+ / year"
        caption="Under Armour, Omega, Visa, Subway, Speedo."
        k={winK(frame, W)}
        accent={C.amber}
        x={120}
        y={300}
        width={900}
        valueSize={124}
      />
    </BedChain>
  );
};
