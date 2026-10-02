import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13
 * The age gap at LA 2028: McIntosh will be 21, in her prime; Yu Zidi will be 15, years from hers.
 */
const STAT_W: Win = [300, 332, 880, 906];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, STAT_W);
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[STAT_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <StatCard
          label="Years apart at Los Angeles 2028"
          value="6"
          caption="McIntosh will be 21, in her prime. Yu Zidi will be 15."
          k={k}
          accent={C.steel}
          x={130}
          y={290}
          width={680}
          valueSize={140}
        />
      </Overlay>
    </BedChain>
  );
};
