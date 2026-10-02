import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {BigType} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 123; // 5.40 -> 9.50s
export const S03_CUTS = [61, 62];

// "decided to stop racing and focus on" is frames 7-61; then the type IS the line: "2027" lands at
// 7.44s = scene frame 61 and "2028" at 8.58s = frame 95, one per spoken word, so the caption track
// stops at 58. The last thing to animate settles at 106; the scene ends 17 frames later and the push
// into scene 4 takes the type out.
export const S03_ATS = [61, 95];
const TYPE_WIN: Win = [55, 62, 123, 133];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="Lyles decided to STOP RACING and FOCUS on" outAt={50} fontSize={52} />
    </Sequence>
    <BigType lines={['2027', '2028']} ats={S03_ATS} win={TYPE_WIN} />
  </>
);