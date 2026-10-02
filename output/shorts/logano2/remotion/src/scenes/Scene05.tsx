import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 77; // 17.05 -> 19.64s

export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.06} />
    <Caption text="Could he BOUNCE BACK in the next playoff race?" outAt={S05_DUR - 3} fontSize={50} />
  </>
);
