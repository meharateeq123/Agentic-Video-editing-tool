import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 238; // 3.80 -> 11.72s
export const S02_CUTS = [36, 40, 38, 42, 40, 42];

/**
 * The Asian Games podium, then her real 200 IM race (lane-4 "Yu Zidi" graphic, the dive, the
 * butterfly, "4 Yu Zidi / 5 Yu Yiting +0.15", the wall) - words land on 2:06.10, IM, the record.
 */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="At the Asian Games," outAt={36} fontSize={60} />
    </Sequence>
    <Sequence from={40} durationInFrames={77} layout="none">
      <Caption text="Yu blasted a 2:06.10" outAt={66} fontSize={64} />
    </Sequence>
    <Sequence from={113} durationInFrames={80} layout="none">
      <Caption text="in the 200 meter individual medley," outAt={68} fontSize={52} />
    </Sequence>
    <Sequence from={189} durationInFrames={49} layout="none">
      <Caption text="breaking the Asian Games record" outAt={40} fontSize={52} />
    </Sequence>
  </>
);
