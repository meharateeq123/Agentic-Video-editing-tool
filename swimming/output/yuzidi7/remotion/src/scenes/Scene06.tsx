import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6
 * Introduces Summer McIntosh: 19, reigning Olympic 200 IM champion, four individual long-course
 * world records at once (200 IM, 400 IM, 400 free, 200 fly since July 2026).
 */
const ID_W: Win = [10, 42, 300, 326];
const STAT_W: Win = [520, 552, 940, 966];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[ID_W, STAT_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/mcintosh.jpg"
        name="Summer McIntosh"
        affiliation="Canada · Olympic 200m IM champion"
        focus={[50, 38]}
        zoom={1.25}
        win={ID_W}
      />
      <Overlay k={winK(frame, STAT_W)} rise={22}>
        <StatCard
          label="Individual world records held at once"
          value="4"
          caption="200 IM · 400 IM · 400 free · 200 fly (since July 2026)"
          k={winK(frame, STAT_W)}
          accent={C.amber}
          x={130}
          y={280}
          width={660}
          valueSize={150}
        />
      </Overlay>
    </BedChain>
  );
};
