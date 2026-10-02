import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 97;
export const S02_CUTS = [49, 48];

// "1:05:15" is said from 4.88s (scene frame 53); the stamp lands on it over the finish-gantry cut.
export const S02_STAMP_AT = 55;
const STAMP_WIN: Win = [49, 55, 90, 97];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="1:05:15" label="World Half Marathon" at={S02_STAMP_AT} win={STAMP_WIN} size={230} />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="In COPENHAGEN, she ran" outAt={36} fontSize={54} />
    </Sequence>
    <Sequence from={46} durationInFrames={51} layout="none">
      <Caption text="an INSANE 1:05:15" outAt={41} fontSize={58} />
    </Sequence>
  </>
);
