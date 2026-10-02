import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 67; // 6.40 -> 8.62s

const CUT_FRAMES = [34, 33];

/** The late wrecks — no card. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.07} />
    <Caption text="But LATE-RACE CHAOS changed everything..." outAt={S02_DUR - 3} fontSize={50} />
  </>
);
