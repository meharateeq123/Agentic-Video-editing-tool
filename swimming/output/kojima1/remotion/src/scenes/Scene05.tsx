import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 139;
export const S05_CUTS = [47, 46, 46];

// "0.06" is said at 18.02s = scene frame 38; "seconds" at 18.82s = frame 62.
export const S05_TYPE_AT = 32;
const TYPE_WIN: Win = [26, 32, 82, 93];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <BigType lines={['0.06', 'SECONDS']} ats={[S05_TYPE_AT, 46]} sub="from gold" subAt={58} win={TYPE_WIN} />
    <Sequence from={0} durationInFrames={56} layout="none">
      <Caption text="and he was JUST" outAt={46} fontSize={56} />
    </Sequence>
    <Sequence from={84} durationInFrames={55} layout="none">
      <Caption text="from GOLD!" outAt={46} fontSize={70} />
    </Sequence>
  </>
);
