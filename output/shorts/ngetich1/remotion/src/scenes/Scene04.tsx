import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 93;
export const S04_CUTS = [47, 46];

// "50" is said at 13.24s = scene frame 58, "seconds" at 13.66s = frame 71.
export const S04_TYPE_AT = 58;
const TYPE_WIN: Win = [52, 58, 84, 93];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <BigType lines={['50', 'SECONDS']} ats={[S04_TYPE_AT, 71]} sub="Winning margin" subAt={78} win={TYPE_WIN} />
    <Sequence from={0} durationInFrames={47} layout="none">
      <Caption text="But here's the CRAZY PART." outAt={38} fontSize={54} />
    </Sequence>
    <Sequence from={47} durationInFrames={46} layout="none">
      <Caption text="She WON by 50 SECONDS" outAt={38} fontSize={54} />
    </Sequence>
  </>
);
