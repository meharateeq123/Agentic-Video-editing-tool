import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {RealisticGlobe} from '../components/RealisticGlobe';
import {band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "Her name is Yu Zidi. She was born in October 2012, in Baoding, in northern China."
 *
 * The film's one globe beat: down from orbit onto Baoding, over real footage, for 5.7s - never a
 * whole scene. It starts just before "born" (+51f) and is already over Baoding by "China" (+144f).
 *
 * Baoding is passed as an exact place with NO `country`: the globe assets have no China highlight
 * texture (highlights/china.png does not exist), and asking for one would stall the render waiting
 * on a file that never loads.
 *
 * Exit follows the graphic rule: the dolly arrives at 0.72 of 170 frames (122), holds 30, fades.
 */
const FROM = 36;
const DUR = 170;
const ARRIVE = 0.72;

const GlobeBeat: React.FC = () => {
  const f = useCurrentFrame();
  const arrive = Math.round(DUR * ARRIVE);
  const o = band(f, 0, 14, arrive + 30, DUR);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <RealisticGlobe
        target={{name: 'Baoding', lat: 38.87, lon: 115.46, sub: 'Hebei - northern China'}}
        dur={DUR}
        arriveAt={ARRIVE}
      />
    </AbsoluteFill>
  );
};

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR}>
    <Sequence from={FROM} durationInFrames={DUR} layout="none">
      <GlobeBeat />
    </Sequence>
  </BedChain>
);
