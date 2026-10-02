import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';

export const S06_DUR = 84; // 15.78 -> 18.60s

export const Scene06: React.FC = () => (
  <>
    <SceneBed {...SCENE6_CUTS[0]} dur={S06_DUR} wins={[]} amp={0.06} />
    <Caption text="Could this win be the START of another CHAMPIONSHIP run?" outAt={S06_DUR - 3} fontSize={48} />
  </>
);
