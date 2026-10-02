import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 109; // 15.13 -> 18.76s
export const S04_CUTS = [41, 40, 28];

/** Closes on him - the post-race graphic, then a smile straight to camera. */
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Caption text="and at just 21, Matsushita could have plenty more speed coming." outAt={S04_DUR - 6} fontSize={44} />
  </>
);
