import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {CompareBars} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "Behind Larson and Hamlin, the field is far from settled. Christopher Bell sits
 * third, 18 points back... Ryan Blaney dropped to fourth... now 33 points behind." VO transcript:
 * "Larson and Hamlin" lands at scene-local frame ~227, "Bell...18" at ~342-362, "Blaney...33" at
 * ~590 - the four rows grow on those exact words, not a generic stagger.
 */
const W: Win = [190, 220, 640, 666];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const g1 = ease(frame, 220, 250);
  const g2 = ease(frame, 230, 260);
  const g3 = ease(frame, 340, 375);
  const g4 = ease(frame, 575, 610);

  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <CompareBars
        title="Gap to Hamlin - Chase Standings"
        rows={[
          {name: 'Hamlin', frac: 0, value: 'Leader', color: C.amber},
          {name: 'Larson', frac: 9 / 33, value: '-9', color: C.emerald},
          {name: 'Bell', frac: 18 / 33, value: '-18', color: C.steel},
          {name: 'Blaney', frac: 1, value: '-33', color: C.red},
        ]}
        k={k}
        grow={[g1, g2, g3, g4]}
        x={430}
        y={330}
        width={1060}
        footnote="No elimination cutoff at Bristol - every one of them stays in the fight."
      />
    </BedChain>
  );
};
