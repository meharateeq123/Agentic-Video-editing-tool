import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 165; // 3.94 -> 9.44s
export const S02_CUTS = [41, 41, 41, 42];

/**
 * No graphic in this scene: there is no footage of a private cooldown run or a hamstring tear, and
 * no single number to stamp, so the line stays on her own words in the interview rather than
 * inventing a card for something the camera never saw.
 */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="She says a FREAK FALL during a" outAt={36} fontSize={48} />
    </Sequence>
    <Sequence from={44} durationInFrames={44} layout="none">
      <Caption text="COOL DOWN RUN in JULY" outAt={36} fontSize={52} />
    </Sequence>
    <Sequence from={88} durationInFrames={38} layout="none">
      <Caption text="may have CONTRIBUTED to the" outAt={30} fontSize={48} />
    </Sequence>
    <Sequence from={126} durationInFrames={39} layout="none">
      <Caption text="HAMSTRING TEAR that hit her LATER." outAt={32} fontSize={44} />
    </Sequence>
  </>
);