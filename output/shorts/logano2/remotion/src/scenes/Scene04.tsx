import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 139; // 12.43 -> 17.05s

const CUT_FRAMES = [69, 70];

/** Out front on lap 228, then Logano afterwards — no card. */
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Caption text="After looking like the FASTEST driver all night, Logano watched the victory SLIP AWAY." outAt={S04_DUR - 4} fontSize={42} />
  </>
);
