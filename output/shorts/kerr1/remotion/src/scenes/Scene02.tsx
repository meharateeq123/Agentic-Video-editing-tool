import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 139; // 3.40 -> 8.04s
export const S02_CUTS = [46, 46, 47];

// "Budapest" is said at 0.12s = frame 4, so the bug goes up on it and is gone before the kick line.
const STAMP_WIN: Win = [2, 10, 44, 58];

/** Frame the venue bug starts sliding in - FinalFilm puts a pop on it. */
export const S02_STAMP_AT = 2;

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <VenueStamp title="Budapest" sub="Ultimate Championship" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={30} layout="none">
      <Caption text="In BUDAPEST," outAt={24} fontSize={60} />
    </Sequence>
    <Sequence from={30} durationInFrames={56} layout="none">
      <Caption text="KERR WAITED until the FINAL STAGES" outAt={48} fontSize={46} />
    </Sequence>
    <Sequence from={86} durationInFrames={53} layout="none">
      <Caption text="before UNLEASHING his FAMOUS KICK." outAt={46} fontSize={48} />
    </Sequence>
  </>
);