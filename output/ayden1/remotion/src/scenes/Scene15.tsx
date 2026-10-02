import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {Quote} from '../components/Quote';
import {BEDS} from '../footage';

export const S15_DUR = 914; // 267.24 -> 297.70s

/** Scene 15 — the SwimSwam reporting quote. Sharp, unblurred, bottom-centre. */
export const Scene15: React.FC = () => (
  <SceneShell beds={BEDS[15]} dur={S15_DUR}>
    <Quote
      text="More than half of the boys who produced this level of dominance went on to make a senior national team."
      attribution="SwimSwam reporting"
      inAt={16}
      outAt={S15_DUR - 90}
    />
  </SceneShell>
);
