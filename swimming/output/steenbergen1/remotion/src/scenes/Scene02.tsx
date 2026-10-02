import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 95; // 3.82 -> 7.00s
export const S02_CUTS = [32, 32, 31];

// "Settecolli" is said at 4.78s = scene frame 29, and the bug goes up on it.
const STAMP_WIN: Win = [26, 34, 84, 95];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <VenueStamp title="Settecolli" sub="Rome · June 2026" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={61} layout="none">
      <Caption text="At the 2026 SETTECOLLI meet," outAt={50} fontSize={50} />
    </Sequence>
    <Sequence from={61} durationInFrames={34} layout="none">
      <Caption text="the DUTCH STAR blasted" outAt={28} fontSize={52} />
    </Sequence>
  </>
);