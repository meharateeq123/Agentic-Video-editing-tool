import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 121; // 0.00 -> 4.03s
export const S01_CUTS = [42, 42, 37];

/** His own lower-third, a close-up, then the record board - no synthetic card. */
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Caption text="Tomoyuki Matsushita is becoming a serious name in the 400 IM." outAt={S01_DUR - 6} fontSize={44} />
  </>
);
