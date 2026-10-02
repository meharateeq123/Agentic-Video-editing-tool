import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 104;
export const S03_CUTS = [52, 52];

// "won" is said at 9.06s = scene frame 27; the year is the real Hollywood Casino 400 ticker's race.
export const S03_STAMP_AT = 27;
const STAMP_WIN: Win = [21, 27, 58, 70];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="2022" label="Kansas Winner" at={S03_STAMP_AT} win={STAMP_WIN} size={250} />
    <Sequence from={2} durationInFrames={64} layout="none">
      <Caption text="WALLACE has ALREADY WON at KANSAS before" inAt={0} outAt={52} fontSize={52} />
    </Sequence>
    <Sequence from={66} durationInFrames={38} layout="none">
      <Caption text="so he KNOWS what it TAKES" inAt={0} outAt={26} fontSize={56} />
    </Sequence>
  </>
);
