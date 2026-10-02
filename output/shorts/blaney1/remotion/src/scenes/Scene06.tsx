import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';

export const S06_DUR = 51; // 14.04 -> 15.72s

export const Scene06: React.FC = () => (
  <>
    <SceneBed {...SCENE6_CUTS[0]} dur={S06_DUR} wins={[]} amp={0.06} />
    <Caption text="...and SHAKE UP the championship?" outAt={S06_DUR - 2} fontSize={52} />
  </>
);
