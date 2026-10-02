import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 141;
export const S05_CUTS = [47, 47, 47];

// "Zhang" is said at 15.32s = scene frame 2. The card lands on it over the mixed-zone interview and
// leaves ~1s after it has finished animating in (flick-graphic-exit-timing).
const W_CARD: Win = [0, 6, 48, 60];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[W_CARD]} amp={0.05} maxBlur={4} dim={0.16} />
    <IdCard photo="id/zhang-id.jpg" name="Zhang Zhanshuo" sub="19 · China" label="200m Freestyle · Asian Record" win={W_CARD} />
    <Sequence from={2} durationInFrames={29} layout="none">
      <Caption text="ZHANG IS NOW OFFICIALLY" inAt={0} outAt={22} fontSize={54} />
    </Sequence>
    <Sequence from={33} durationInFrames={46} layout="none">
      <Caption text="ONE OF THE BIGGEST NAMES TO WATCH" inAt={0} outAt={34} fontSize={48} />
    </Sequence>
    <Sequence from={80} durationInFrames={61} layout="none">
      <Caption text="HEADING TOWARD LA 2028" inAt={0} outAt={45} fontSize={56} />
    </Sequence>
  </>
);
