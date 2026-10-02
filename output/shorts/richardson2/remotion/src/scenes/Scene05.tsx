import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 132; // 18.47 -> 22.87s

export const S05_CUTS = [132];

/**
 * The real-voice payoff: no voiceover, her own sync audio from the on-track interview after the 10.80
 * ("I'm so excited for more next year. I felt really good."). Captions transcribe HER words.
 */
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={66} layout="none">
      <Caption text="I'm so EXCITED for MORE next year." outAt={54} fontSize={44} />
    </Sequence>
    <Sequence from={72} durationInFrames={60} layout="none">
      <Caption text="I felt REALLY GOOD." outAt={48} fontSize={60} />
    </Sequence>
  </>
);