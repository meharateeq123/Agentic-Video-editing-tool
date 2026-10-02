import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 34; // 6.96 -> 8.10s
export const S03_CUTS = [34];

// A 1.1s beat — one shot, one line, nothing on screen but the caption.
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.07} />
    <Caption text="But there was a TWIST." outAt={26} fontSize={70} />
  </>
);
