import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 74; // 5.72 -> 8.21s

const CUT_FRAMES = [36, 38];

/** Real racing: his No. 30 at Rockingham, on track and on pit road. No card - the footage carries it. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="Cleetus has built his name racing in the REAL WORLD," outAt={S02_DUR - 4} fontSize={48} />
  </>
);
