import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S01_DUR = 140; // 0.00 -> 4.66s

/**
 * Scene 1 — the hook. Legacy Motor Club's own No. 42 victory lane, carrying the line's weight
 * without a graphic: this is the team the announcement is about.
 */
export const Scene01: React.FC = () => (
  <SceneBed {...bed(1)} dur={S01_DUR} wins={[]} amp={0.06}>
    <Caption
      text="Legacy Motor Club has confirmed Nemechek won't return to the No. 42 Toyota in 2027"
      outAt={S01_DUR - 4}
      fontSize={46}
    />
  </SceneBed>
);
