import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 75; // 17.95 -> 20.48s
export const S04_CUTS = [36, 39];

/** The podium, then Yu straight to camera - the question lands on her face. */
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Caption text="Is Yu Zidi the next swimming superstar?" outAt={S04_DUR + 12} fontSize={52} />
  </>
);
