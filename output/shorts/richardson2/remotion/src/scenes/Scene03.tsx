import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {BigType} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 130; // 8.76 -> 13.08s
export const S03_CUTS = [65, 65];

// "2027" is said at 3.34s = frame 100; the type lands on it, sub line under it.
export const S03_TYPE_AT = 100;
const TYPE_WIN: Win = [94, 102, 130, 140];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="But now she's PROMISING to" outAt={50} fontSize={50} />
    </Sequence>
    <Sequence from={60} durationInFrames={34} layout="none">
      <Caption text="bring back the OLD SHA'CARRI" outAt={28} fontSize={40} />
    </Sequence>
    <BigType lines={['2027']} ats={[S03_TYPE_AT]} sub="The old Sha'Carri is back" subAt={108} win={TYPE_WIN} />
  </>
);