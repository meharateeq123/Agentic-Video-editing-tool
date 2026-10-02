import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 160; // 9.44 -> 14.78s
export const S03_CUTS = [54, 30, 38, 38];

// "ultimate" is said at 2.10s = frame 63, "championship" at 2.36s = frame 71, settling by 88. The bug
// goes up just before the words land and is gone well before the Athlos line at 124.
const STAMP_WIN: Win = [58, 66, 118, 144];

/** Frame the venue bug starts sliding in - FinalFilm puts a pop on it. */
export const S03_STAMP_AT = 58;

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <VenueStamp title="Budapest" sub="Ultimate Championship" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={34} layout="none">
      <Caption text="Even with the INJURY," outAt={27} fontSize={54} />
    </Sequence>
    <Sequence from={34} durationInFrames={60} layout="none">
      <Caption text="she still RACED at the ULTIMATE CHAMPIONSHIP" outAt={48} fontSize={40} />
    </Sequence>
    <Sequence from={94} durationInFrames={30} layout="none">
      <Caption text="and is now SET for" outAt={24} fontSize={52} />
    </Sequence>
    <Sequence from={124} durationInFrames={36} layout="none">
      <Caption text="ATHLOS in LONDON." outAt={30} fontSize={58} />
    </Sequence>
  </>
);