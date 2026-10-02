import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 57; // 5.08 -> 6.98s

/** A beat of Blaney's car before the Penske stat — no card. */
export const Scene03: React.FC = () => (
  <>
    <SceneBed {...SCENE3_CUTS[0]} dur={S03_DUR} wins={[]} amp={0.07} />
    <Caption text="And there's ANOTHER reason to watch him." outAt={S03_DUR - 3} fontSize={50} />
  </>
);
