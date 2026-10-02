import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 90; // 16.68 -> 19.68s

export const S05_CUTS = [90];

/**
 * The real-voice payoff. There is no voiceover here at all - the film hands off to Hodgkinson's own
 * sync audio (baked into h5 with its audio track, played at full volume by FinalFilm's HITS-adjacent
 * <Audio volume> on the bed itself - see footage.ts). Captions transcribe HER words, not a script,
 * the same move kerr1 made with the live Budapest commentary.
 */
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={40} layout="none">
      <Caption text="I'M actually PROUD of my team" outAt={32} fontSize={46} />
    </Sequence>
    <Sequence from={44} durationInFrames={46} layout="none">
      <Caption text="and how we've HANDLED it and COME BACK." outAt={38} fontSize={42} />
    </Sequence>
  </>
);
