import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 68; // 15.45 -> 17.72s
export const S04_CUTS = [68];

export const Scene04: React.FC = () => (
  <>
    <SceneBed {...SCENE4_CUTS[0]} dur={S04_DUR} wins={[]} amp={0.06} />
    <Caption text="Can Bristol save his CHAMPIONSHIP hopes?" outAt={S04_DUR - 5} fontSize={46} />
  </>
);
