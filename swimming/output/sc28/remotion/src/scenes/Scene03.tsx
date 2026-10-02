import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 44; // 9.62 -> 11.10s

export const S03_CUTS = [22, 22];

/** Two quick race cuts - the footage carries it, no card. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <Caption text="the sport is CHANGING FAST." outAt={38} fontSize={64} />
  </>
);
