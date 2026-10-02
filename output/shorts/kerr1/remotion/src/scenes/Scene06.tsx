import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 210; // 19.72 -> 26.72s

export const S06_CUTS = [210];

/**
 * The payoff. The voiceover has finished; this scene is seven seconds of the real World Athletics
 * call of the finish at full volume, over one continuous take of Kerr and the crowd. The captions
 * follow the COMMENTATOR, not a script - that is the thing the reference short the user shared does
 * and the reason it lands: "...a year he'll never forget. He is the ultimate champion over 1500
 * metres." Word timings are from a Whisper pass over the clip's own audio.
 */
export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} />
    <Sequence from={10} durationInFrames={42} layout="none">
      <Caption text="a YEAR he'll NEVER FORGET." outAt={38} fontSize={54} />
    </Sequence>
    <Sequence from={52} durationInFrames={94} layout="none">
      <Caption text="HE IS THE ULTIMATE CHAMPION" outAt={62} fontSize={56} />
    </Sequence>
    <Sequence from={146} durationInFrames={64} layout="none">
      <Caption text="OVER 1500 METRES." outAt={52} fontSize={62} />
    </Sequence>
  </>
);