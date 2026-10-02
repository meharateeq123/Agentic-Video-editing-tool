import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 114; // 0.00 -> 3.80s
export const S01_CUTS = [38, 38, 38];

/** Her own post-race interview, then two real Asian Games swims with "YU ZIDI" on the cap. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={62} layout="none">
      <Caption text="Yu Zidi is only 13" outAt={52} fontSize={70} />
    </Sequence>
    <Sequence from={60} durationInFrames={54} layout="none">
      <Caption text="and she just shocked the swimming world" outAt={44} fontSize={54} />
    </Sequence>
  </>
);
