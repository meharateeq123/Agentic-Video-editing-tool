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
 * 12 career Asian Games medals, across Incheon 2014, Jakarta 2018, Hangzhou 2023, and now Aichi-Nagoya.
 */
const MEDALS_W: Win = [210, 240, 300, 326];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, MEDALS_W);
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[MEDALS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <StatCard
          label="Career Asian Games medals"
          value="12"
          caption="Across four Games, dating back to Incheon 2014"
          k={k}
          accent={C.amber}
          x={130}
          y={280}
          width={620}
          valueSize={150}
        />
      </Overlay>
    </BedChain>
  );
};
