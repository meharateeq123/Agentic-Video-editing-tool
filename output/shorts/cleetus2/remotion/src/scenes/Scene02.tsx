import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S02_DUR = 87; // 4.34 -> 7.24s

/**
 * Scene 2 — the payoff of "first look": real NASCAR 25 gameplay showing the #30 McFarland car
 * on track in-game.
 */
export const Scene02: React.FC = () => (
  <SceneBed {...bed(2)} dur={S02_DUR} wins={[]} amp={0.06}>
    <Caption
      text="and fans got their first look at Cleetus back in the game"
      outAt={S02_DUR - 4}
      fontSize={50}
    />
  </SceneBed>
);
