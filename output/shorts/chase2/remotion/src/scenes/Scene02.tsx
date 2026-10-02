import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 98;
export const S02_CUTS = [40, 34, 24];

// Each track name is stamped on the word: Kansas 4.00s = frame 12, Las Vegas 5.52s = frame 58,
// Charlotte 6.32s = frame 82. Every stamp leaves ~1s after it has landed (the last one rides the scene end).
export const S02_STAMP1_AT = 12;
export const S02_STAMP2_AT = 58;
export const S02_STAMP3_AT = 82;
const W1: Win = [6, 12, 30, 40];
const W2: Win = [52, 58, 68, 74];
const W3: Win = [76, 82, 100, 108];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1, W2, W3]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="KANSAS" label="Race 1" at={S02_STAMP1_AT} win={W1} size={170} />
    <RankStamp value="LAS VEGAS" label="Race 2" at={S02_STAMP2_AT} win={W2} size={140} />
    <RankStamp value="CHARLOTTE" label="Race 3" at={S02_STAMP3_AT} win={W3} size={140} />
    <Sequence from={11} durationInFrames={32} layout="none">
      <Caption text="KANSAS COMES FIRST" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
    <Sequence from={45} durationInFrames={30} layout="none">
      <Caption text="followed by LAS VEGAS" inAt={0} outAt={26} fontSize={54} />
    </Sequence>
    <Sequence from={74} durationInFrames={24} layout="none">
      <Caption text="and CHARLOTTE" inAt={0} outAt={14} fontSize={58} />
    </Sequence>
  </>
);

