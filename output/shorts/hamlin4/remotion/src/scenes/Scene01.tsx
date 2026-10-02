import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 101;
export const S01_CUTS = [51, 50];

// "Hamlin" is said at 0.20s = scene frame 6. The card lands on it over the #11 FedEx car and leaves
// ~1s after it has finished animating in (flick-graphic-exit-timing).
const W_CARD: Win = [0, 6, 48, 60];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W_CARD]} amp={0.05} maxBlur={4} dim={0.16} />
    <IdCard photo="id/hamlin-id.jpg" name="Denny Hamlin" sub="No. 11 · Joe Gibbs Racing" label="NASCAR Cup Series" win={W_CARD} />
    <Sequence from={0} durationInFrames={63} layout="none">
      <Caption text="DENNY HAMLIN HAS DOMINATED KANSAS" inAt={0} outAt={48} fontSize={52} />
    </Sequence>
    <Sequence from={72} durationInFrames={29} layout="none">
      <Caption text="BUT THERE'S A PROBLEM" inAt={0} outAt={22} fontSize={58} />
    </Sequence>
  </>
);
