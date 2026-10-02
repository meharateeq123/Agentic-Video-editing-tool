import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {Quote} from '../components/Quote';
import {BEDS} from '../footage';

export const S21_DUR = 870; // 412.84 -> 441.84s

/** Scene 21 — the reflective close. Sharp, unblurred, bottom-centre. */
export const Scene21: React.FC = () => (
  <SceneShell beds={BEDS[21]} dur={S21_DUR}>
    <Quote
      text="Records at this age are a strong signal of talent and training quality — not a guarantee of what comes next."
      inAt={16}
      outAt={S21_DUR - 100}
    />
  </SceneShell>
);
