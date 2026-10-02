import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {BigType} from '../components/Stamp';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 115; // 0 -> 3.82s
export const S01_CUTS = [38, 38, 39];

// "100" is said at 2.08s = frame 62 and "record" at 2.88s = frame 86, so the type lands word for word.
// The last thing to animate settles at 97; the scene ends 18 frames later and the whip into scene 2
// takes it out.
export const S01_ATS = [62, 86];
const TYPE_WIN: Win = [56, 64, 115, 125];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="MARRIT STEENBERGEN just CHANGED" outAt={36} fontSize={52} />
    </Sequence>
    <Sequence from={44} durationInFrames={22} layout="none">
      <Caption text="the WOMEN'S" outAt={16} fontSize={62} />
    </Sequence>
    <BigType lines={['100 FREE', 'RECORD']} ats={S01_ATS} win={TYPE_WIN} />
  </>
);