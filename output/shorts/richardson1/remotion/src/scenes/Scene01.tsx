import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 122; // 0 -> 4.06s
export const S01_CUTS = [41, 41, 40];

// "after Budapest" starts at 3.08s = frame 92, so the venue bug is already up by then and leaves
// into the transition bleed.
const STAMP_WIN: Win = [80, 88, 112, 130];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <VenueStamp title="Budapest" sub="Ultimate Championship · Sep 12" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={62} layout="none">
      <Caption text="Sha'Carri Richardson just REVEALED" outAt={50} fontSize={58} />
    </Sequence>
    <Sequence from={62} durationInFrames={60} layout="none">
      <Caption text="something VERY INTERESTING after BUDAPEST." outAt={48} fontSize={52} />
    </Sequence>
  </>
);
