import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 194;
export const S02_CUTS = [80, 66, 48];

// "2:04.83" is spoken at 7.40-8.50s = scene frames 85-118. The stamp lands on it, over the wall shot
// whose own broadcast ticker reads "4 OHASHI 2:04.83 WR", and leaves ~1s after it has landed
// (flick-graphic-exit-timing: last animation ends at 95, so out0 = 95 + 30).
export const S02_STAMP_AT = 85;
const W1: Win = [80, 86, 125, 151];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="2:04.83" label="World Record" at={S02_STAMP_AT} win={W1} size={170} />
    <Sequence from={4} durationInFrames={32} layout="none">
      <Caption text="THE JAPANESE TEENAGER" inAt={0} outAt={24} fontSize={58} />
    </Sequence>
    <Sequence from={34} durationInFrames={38} layout="none">
      <Caption text="DESTROYED THE OLD MARK" inAt={0} outAt={28} fontSize={56} />
    </Sequence>
    <Sequence from={73} durationInFrames={59} layout="none">
      <Caption text="WITH A STUNNING 2:04.83" inAt={0} outAt={45} fontSize={54} />
    </Sequence>
    <Sequence from={142} durationInFrames={52} layout="none">
      <Caption text="FIRST MAN EVER UNDER 2:05" inAt={0} outAt={40} fontSize={54} />
    </Sequence>
  </>
);
