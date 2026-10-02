import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S04_DUR = 115; // 10.02 -> 13.86s

/**
 * Scene 4 — "after a tough 2026 season." Real pack-racing action carries the grind the line
 * describes.
 */
export const Scene04: React.FC = () => (
  <SceneBed {...bed(4)} dur={S04_DUR} wins={[]} amp={0.06}>
    <Caption
      text="After a tough 2026 season, Nemechek now faces a huge question"
      outAt={S04_DUR - 4}
      fontSize={48}
    />
  </SceneBed>
);
