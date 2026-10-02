import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 118;
export const S03_CUTS = [36, 41, 41];

// "Dressel's" is said at 12.4s = scene frame 37 (the card lands on the Tokyo cap close-up); "49.45" at 13.9s = frame 82.
export const S03_CARD_AT = 36;
export const S03_STAMP_AT = 82;
const W1: Win = [36, 48, 68, 80];
const W2: Win = [78, 84, 112, 118];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1, W2]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/dressel.jpg" name="Caeleb Dressel" sub="USA · 100 m butterfly" label="World record holder" win={W1} />
    <RankStamp value="49.45" label="World record" at={S03_STAMP_AT} win={W2} size={190} y={-1300} />
    <Sequence from={4} durationInFrames={32} layout="none">
      <Caption text="BUT the CRAZY PART?" inAt={0} outAt={22} fontSize={58} bottom={430} />
    </Sequence>
    <Sequence from={44} durationInFrames={74} layout="none">
      <Caption text="DRESSEL'S WORLD RECORD is" inAt={0} outAt={46} fontSize={54} />
    </Sequence>
  </>
);
