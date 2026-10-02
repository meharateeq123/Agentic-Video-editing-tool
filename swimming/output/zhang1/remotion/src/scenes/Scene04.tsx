import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 72;
export const S04_CUTS = [24, 24, 24];

// "Rikako Ikee" is said at 11.32s = scene frame 22; the card lands on it and leaves ~1s after it has landed.
export const S04_CARD_AT = 20;
const W1: Win = [20, 32, 60, 72];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/ikee.jpg" name="Rikako Ikee" sub="Japan · 50 m butterfly" label="Bronze medal" win={W1} />
    <Sequence from={3} durationInFrames={40} layout="none">
      <Caption text="WHILE JAPAN'S RIKAKO IKEE" inAt={0} outAt={30} fontSize={46} bottom={430} />
    </Sequence>
    <Sequence from={44} durationInFrames={28} layout="none">
      <Caption text="GRABBED BRONZE" inAt={0} outAt={20} fontSize={58} bottom={430} />
    </Sequence>
  </>
);
