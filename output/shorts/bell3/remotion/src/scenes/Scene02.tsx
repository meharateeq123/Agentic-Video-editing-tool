import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 66; // 4.68 -> 6.86s

const CUT_FRAMES = [66];

/** Bristol under the lights - the footage carries it, no card. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="But BRISTOL could be EXACTLY WHAT HE NEEDS." outAt={58} fontSize={52} />
  </>
);
