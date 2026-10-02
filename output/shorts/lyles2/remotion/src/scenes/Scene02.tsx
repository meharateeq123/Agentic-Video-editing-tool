import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 162;
export const S02_CUTS = [48, 42, 72];

// "9.79" is spoken from 0.94s = scene frame 28, over the sprint drive.
export const S02_STAMP_AT = 28;
const W_STAMP: Win = [22, 28, 70, 82];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="9.79" label="Personal Best" at={S02_STAMP_AT} win={W_STAMP} size={190} />
    <Sequence from={5} durationInFrames={101} layout="none">
      <Caption text="HE BLASTED TO 9.79 SECONDS IN THE 100 METERS" inAt={0} outAt={88} fontSize={44} />
    </Sequence>
    <Sequence from={115} durationInFrames={47} layout="none">
      <Caption text="MATCHING HIS PERSONAL BESTS" inAt={0} outAt={36} fontSize={52} />
    </Sequence>
  </>
);
