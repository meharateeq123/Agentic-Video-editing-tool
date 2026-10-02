import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S06_DUR = 90; // 15.59 -> 18.60s

/**
 * Scene 6 — the closing line. Wide pack-racing action for the "future just got interesting"
 * close — motion and possibility, not a resolved answer.
 */
export const Scene06: React.FC = () => (
  <SceneBed {...bed(6)} dur={S06_DUR} wins={[]} amp={0.06}>
    <Caption text="His NASCAR future just got VERY interesting" outAt={S06_DUR - 6} fontSize={50} />
  </SceneBed>
);
