import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 47; // 18.23 -> 19.8s

export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.06} />
    <Caption text="Could he finally STRIKE BACK?" outAt={S05_DUR - 3} fontSize={50} />
  </>
);
