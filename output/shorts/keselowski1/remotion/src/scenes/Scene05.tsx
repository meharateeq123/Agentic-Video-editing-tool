import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 78; // 16.96 -> 19.56s

/** Scene 5 — the button. Hocevar on camera, the question carried by the caption alone. */
export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[]} amp={0.06} />
    <Caption text="So will Hocevar get his payback this weekend?" outAt={S05_DUR - 2} fontSize={46} />
  </>
);
