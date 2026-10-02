import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 187; // 13.24 -> 19.48s

const CUT_FRAMES = [45, 42, 100];

// "can Hamlin" starts at 14.84s = scene frame 48, so the question caption takes over there.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="The BIG QUESTION now is..." outAt={40} fontSize={54} />
    </Sequence>
    <Sequence from={47} durationInFrames={140} layout="none">
      <Caption text="Can Hamlin HOLD OFF LARSON before this championship battle gets completely OUT OF CONTROL?" outAt={124} fontSize={44} />
    </Sequence>
  </>
);
