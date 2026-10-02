import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 142;
export const S02_CUTS = [48, 47, 47];

// "10.80" is spoken from 5.30s = scene frame 101, over the finish and its running clock.
export const S02_STAMP_AT = 101;
const W_STAMP: Win = [95, 101, 131, 142];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="10.80" label="Athlos Meeting Record" at={S02_STAMP_AT} win={W_STAMP} size={200} />
    <Sequence from={1} durationInFrames={43} layout="none">
      <Caption text="SHE CAME BACK AT ATHLOS LONDON" inAt={0} outAt={32} fontSize={48} />
    </Sequence>
    <Sequence from={45} durationInFrames={53} layout="none">
      <Caption text="AND WON THE 100 METERS" inAt={0} outAt={39} fontSize={54} />
    </Sequence>
    <Sequence from={101} durationInFrames={41} layout="none">
      <Caption text="IN 10.80 SECONDS" inAt={0} outAt={30} fontSize={60} />
    </Sequence>
  </>
);
