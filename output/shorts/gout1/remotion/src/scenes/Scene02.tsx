import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {BigType} from '../components/Stamp';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 67; // 3.44 -> 5.66s
export const S02_CUTS = [34, 33];

// "but now the focus is" runs to 4.48s = scene frame 31, where "2027" lands as full-bleed type. The
// caption stops at 28 so the type IS the line; the last thing to settle is at 42, and the scene ends
// 25 frames later, so the push into scene 3 takes the type out.
export const S02_ATS = [31];
const TYPE_WIN: Win = [26, 33, 67, 77];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <Sequence from={0} durationInFrames={30} layout="none">
      <Caption text="but now the FOCUS is" outAt={24} fontSize={58} />
    </Sequence>
    <BigType lines={['2027']} ats={S02_ATS} win={TYPE_WIN} />
  </>
);