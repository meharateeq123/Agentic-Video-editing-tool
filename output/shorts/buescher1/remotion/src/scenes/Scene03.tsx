import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 121; // 11.43 -> 15.45s
export const S03_CUTS = [121];

/** His real Bristol win, on-screen graphic and all — no extra card needed. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <Caption text="But there's hope: Buescher has ALREADY WON the Bristol Night Race before." outAt={S03_DUR - 5} fontSize={38} />
  </>
);
