import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 111;
export const S03_CUTS = [28, 28, 28, 27];

// "Wu Qingfeng" is said at 9.08s = scene frame 67; the card pops in as the cut to her lands and leaves ~1s after it has landed.
export const S03_CARD_AT = 58;
const W1: Win = [58, 70, 98, 111];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/wu.jpg" name="Wu Qingfeng" sub="China · 50 m butterfly" label="Silver medal" win={W1} />
    <Sequence from={4} durationInFrames={54} layout="none">
      <Caption text="SHE LED a CHINESE ONE-TWO" inAt={0} outAt={42} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={62} durationInFrames={49} layout="none">
      <Caption text="WU QINGFENG taking SILVER" inAt={0} outAt={38} fontSize={50} bottom={430} />
    </Sequence>
  </>
);
