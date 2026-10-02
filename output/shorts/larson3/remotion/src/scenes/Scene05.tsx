import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 102; // 12.36 -> 15.78s

/** The burnout through the catchfence, crew on the wall — no card. */
export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.07} />
    <Caption text="With the playoffs heating up, Larson is suddenly RIGHT BACK in the fight." outAt={S05_DUR - 4} fontSize={42} />
  </>
);
