import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "Qualifying for the Enjoy Illinois 300 at World Wide Technology Raceway came down to a
 * single flying lap from Joey Logano. Driving the No. 22 Team Penske Ford, Logano covered the
 * 1.25-mile Gateway oval in 32.817 seconds, an average speed of 137.124 miles per hour. He was the
 * only driver in the entire 36-car field to break the 33-second barrier..." The lap time lands
 * mid-scene, after the setup line names the race and the car.
 */
const W: Win = [220, 250, 280, 306];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);

  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <StatCard
        label="Pole-Winning Lap"
        value="32.817s"
        caption="137.124 mph - the only driver in the 36-car field under 33 seconds"
        k={k}
        accent={C.steel}
        x={480}
        y={380}
        width={960}
        align="center"
        valueSize={130}
      />
    </BedChain>
  );
};
