import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 221;
export const S01_CUTS = [56, 55, 55, 55];

// "the Chinese star" is said at 1.7s = scene frame 51; the card pops in on the medal-reveal cut and leaves ~1s after landing.
export const S01_CARD_AT = 168;
const W1: Win = [168, 180, 208, 221];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/yuzidi.jpg" name="Yu Zidi" sub="China · 13 years old" label="Triple gold medalist" win={W1} />
    <Sequence from={2} durationInFrames={44} layout="none">
      <Caption text="AT ONLY 13 YEARS OLD" inAt={0} outAt={34} fontSize={58} bottom={430} />
    </Sequence>
    <Sequence from={48} durationInFrames={64} layout="none">
      <Caption text="the CHINESE STAR WON THE" inAt={0} outAt={48} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={114} durationInFrames={52} layout="none">
      <Caption text="200 FLY, 200 IM, and 400 IM" inAt={0} outAt={40} fontSize={48} bottom={430} />
    </Sequence>
    <Sequence from={168} durationInFrames={50} layout="none">
      <Caption text="SHE DIDN'T JUST WIN" inAt={0} outAt={38} fontSize={54} bottom={430} />
    </Sequence>
  </>
);
