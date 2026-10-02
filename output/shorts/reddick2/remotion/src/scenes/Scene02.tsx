import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 180; // 3.13 -> 9.12s
export const S02_CUTS = [70, 55, 55];

/** Fast punch-cuts through the real wreck footage — no card, the clips do the talking. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.08} maxBlur={4} dim={0.12} />
    <Caption
      text="Contact with Daniel Suárez sent him into the WALL on Lap 3 — and later, ANOTHER major wreck."
      outAt={S02_DUR - 4}
      fontSize={38}
    />
  </>
);
