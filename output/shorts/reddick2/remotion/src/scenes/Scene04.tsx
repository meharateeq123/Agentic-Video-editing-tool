import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 93; // 15.02 -> 18.12s
export const S04_CUTS = [93];

export const Scene04: React.FC = () => (
  <>
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[]} amp={0.06} />
    <Caption text="Can Reddick finally get a CLEAN RACE when he needs it most?" outAt={S04_DUR - 5} fontSize={44} />
  </>
);
