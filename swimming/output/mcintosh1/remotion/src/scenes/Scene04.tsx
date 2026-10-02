import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 114; // 8.10 -> 11.90s
export const S04_CUTS = [38, 38, 38];

// This whole scene runs over the Pan Pacs post-race interview — the line is about what she said,
// so the picture is her saying it. "because her time was" starts at 9.54s = scene frame 43.
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={43} layout="none">
      <Caption text="She WASN'T SATISFIED with the swim," outAt={35} fontSize={54} />
    </Sequence>
    <Sequence from={43} durationInFrames={71} layout="none">
      <Caption text="because her time was more than FOUR SECONDS SLOWER" outAt={58} fontSize={48} />
    </Sequence>
  </>
);
