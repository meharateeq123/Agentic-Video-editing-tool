import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 74; // 13.98 -> 16.43s
export const S03_CUTS = [74];

/** Her real reaction in Budapest, bib and all — no extra card needed. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Caption text="She also completed the sprint double in Budapest." outAt={S03_DUR - 5} fontSize={40} />
  </>
);
