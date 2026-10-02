import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';

export const S06_DUR = 68; // 14.17 -> 16.44s

/** Scene 6 — the button: real racing, question carried by the caption, no graphic in the way. */
export const Scene06: React.FC = () => (
  <>
    <SceneBed {...SCENE6_CUTS[0]} dur={S06_DUR} wins={[]} amp={0.07} />
    <Caption text="Is ANYONE stopping Toyota this year?" outAt={S06_DUR - 3} fontSize={46} />
  </>
);
