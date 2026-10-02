import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S05_DUR = 102; // 11.30 -> 14.70s

/** Scene 5 — the pivot to real life: real Cleetus ARCA/NASCAR footage, not the game. */
export const Scene05: React.FC = () => (
  <SceneBed {...bed(5)} dur={S05_DUR} wins={[]} amp={0.06}>
    <Caption
      text="And with Cleetus racing even more NASCAR events in real life"
      outAt={S05_DUR - 4}
      fontSize={50}
    />
  </SceneBed>
);
