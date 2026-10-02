import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 88; // 9.50 -> 12.44s
export const S04_CUTS = [44, 44];

// "missed" is 0.58s in (frame 17), "ultimate championship" 1.02s-1.9s (frames 31-57), "Budapest" 2.18s
// (frame 65). The venue bug goes up on "ultimate" and rides out into the wipe.
const STAMP_WIN: Win = [30, 38, 80, 98];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <VenueStamp title="Budapest" sub="Ultimate Championship" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="That means he MISSED" outAt={32} fontSize={62} />
    </Sequence>
    <Sequence from={40} durationInFrames={48} layout="none">
      <Caption text="the ULTIMATE CHAMPIONSHIP in BUDAPEST." outAt={38} fontSize={52} />
    </Sequence>
  </>
);