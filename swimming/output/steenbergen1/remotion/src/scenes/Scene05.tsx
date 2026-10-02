import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {BigType} from '../components/Stamp';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 116; // 15.12 -> 19.00s
export const S05_CUTS = [30, 28, 58];

// "short" is said at 15.58s = scene frame 14 and "course" at 15.82s = frame 21, so the type lands word
// for word; it settles by 32 and is out by 72. "racing ahead" is 28-58, then "could Steenbergen" 58-79
// and "get even faster" 79-116.
const TYPE_WIN: Win = [8, 16, 62, 72];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <BigType lines={['SHORT', 'COURSE']} ats={[14, 21]} win={TYPE_WIN} />
    <Sequence from={28} durationInFrames={30} layout="none">
      <Caption text="racing AHEAD," outAt={24} fontSize={58} />
    </Sequence>
    <Sequence from={58} durationInFrames={21} layout="none">
      <Caption text="COULD STEENBERGEN" outAt={16} fontSize={52} />
    </Sequence>
    <Sequence from={79} durationInFrames={37} layout="none">
      <Caption text="get even FASTER?" outAt={34} fontSize={66} />
    </Sequence>
  </>
);