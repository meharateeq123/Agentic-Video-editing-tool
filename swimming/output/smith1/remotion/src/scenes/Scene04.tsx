import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 211; // 15.04 -> 22.08s
export const S04_CUTS = [53, 53, 53, 52];

// "2:04.13" is spoken 13.8s-46.8s in (frames 14-47) - a longer number, so the stamp holds a bit
// longer before it is gone, well ahead of the real "2:05.57" results board (s4d) at the end.
const STAMP_WIN: Win = [12, 20, 78, 96];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="2:04.13" label="200 Back Prelim" at={14} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={68} layout="none">
      <Caption text="then POSTED 2:04.13 in the" outAt={54} fontSize={48} />
    </Sequence>
    <Sequence from={68} durationInFrames={70} layout="none">
      <Caption text="200 BACK PRELIM before WINNING" outAt={54} fontSize={42} />
    </Sequence>
    <Sequence from={138} durationInFrames={73} layout="none">
      <Caption text="the final in 2:05.57." outAt={54} fontSize={54} />
    </Sequence>
  </>
);