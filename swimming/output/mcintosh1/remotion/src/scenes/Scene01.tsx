import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 107; // 0 -> 3.58s
export const S01_CUTS = [54, 53];

// "Pan Pacific Championships" starts at 2.40s = frame 72, so the venue bug is already up by then
// and leaves through the transition bleed.
const STAMP_WIN: Win = [52, 60, 98, 116];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <VenueStamp title="Pan Pacs" sub="Irvine, California" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="Summer McIntosh WON the 400 IM" outAt={48} fontSize={56} />
    </Sequence>
    <Sequence from={60} durationInFrames={47} layout="none">
      <Caption text="at the PAN PACIFIC CHAMPIONSHIPS" outAt={38} fontSize={54} />
    </Sequence>
  </>
);
