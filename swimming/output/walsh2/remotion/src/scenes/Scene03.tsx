import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 71; // 8.28 -> 10.62s
export const S03_CUTS = [71];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Caption text="It was the fourth time Walsh had lowered the mark." outAt={S03_DUR - 5} fontSize={40} />
  </>
);
