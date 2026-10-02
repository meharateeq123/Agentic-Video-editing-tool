import React from 'react';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 59; // 4.06 -> 6.02s
export const S02_CUTS = [30, 29];

// "third" is said at 4.44s = scene frame 11, and the stamp lands on the word. It settles at 21,
// and the scene only runs 59 frames, so it leaves through the transition bleed.
export const S02_STAMP_AT = 11;
const STAMP_WIN: Win = [9, 14, 48, 68];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={5} dim={0.16} />
    <RankStamp value="3RD" label="in the 100m final" at={S02_STAMP_AT} win={STAMP_WIN} />
    <Caption text="She finished THIRD in the 100 METRES." outAt={46} fontSize={52} />
  </>
);
