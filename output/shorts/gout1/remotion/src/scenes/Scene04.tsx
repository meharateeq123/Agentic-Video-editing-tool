import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 151; // 11.18 -> 16.20s
export const S04_CUTS = [37, 53, 61];

// "But before that, he ran an incredible" is frames 0-37; "19" lands at 1.72s = frame 52 and ".67"
// at 64, so the stamp slams onto the finish-line shot and settles by 62, out by 104. The last cut is
// the celebration under "Under 20 World record" (104-130).
const STAMP_WIN: Win = [50, 56, 92, 104];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="19.67" label="Under-20 World Record" at={52} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={37} layout="none">
      <Caption text="But before that, he ran an INCREDIBLE" outAt={30} fontSize={48} />
    </Sequence>
    <Sequence from={90} durationInFrames={61} layout="none">
      <Caption text="for the UNDER-20 WORLD RECORD." outAt={52} fontSize={54} />
    </Sequence>
  </>
);