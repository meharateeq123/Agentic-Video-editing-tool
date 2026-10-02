import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S06_DUR = 35; // 14.70 -> 15.86s

/** Scene 6 — the closing hook. Held on real Cleetus cockpit footage, question left open. */
export const Scene06: React.FC = () => (
  <SceneBed {...bed(6)} dur={S06_DUR} wins={[]} amp={0.05}>
    <Caption text="could this be just the beginning?" inAt={2} outAt={S06_DUR - 2} fontSize={58} />
  </SceneBed>
);
