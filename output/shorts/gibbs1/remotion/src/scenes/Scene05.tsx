import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 67; // 18.02 -> 20.28s

export const Scene05: React.FC = () => (
  <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.07}>
    <Caption text="Could Ty Gibbs actually win it all?" outAt={S05_DUR - 4} fontSize={56} />
  </SceneBed>
);
