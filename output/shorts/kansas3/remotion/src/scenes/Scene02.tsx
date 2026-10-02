import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 130;
export const S02_CUTS = [33, 33, 32, 32];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={3} durationInFrames={50} layout="none">
      <Caption text="TOYOTA HAS BEEN" inAt={0} outAt={38} fontSize={62} />
    </Sequence>
    <Sequence from={54} durationInFrames={76} layout="none">
      <Caption text="EXTREMELY STRONG on 1.5-MILE TRACKS" inAt={0} outAt={58} fontSize={44} />
    </Sequence>
  </>
);
