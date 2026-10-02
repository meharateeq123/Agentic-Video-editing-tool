import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {KineticSequence} from '../components/KineticLine';
import {BEDS} from '../footage';

export const S01_DUR = 237; // 0.00 -> 7.90s

const LINES = [
  {text: 'Touches the wall.', start: 0, end: 55},
  {text: 'A new record.', start: 58, end: 143, accent: true},
  {text: 'Not his first.', start: 146, end: 194},
  {text: 'Not even his fifth.', start: 197, end: 237},
];

/** Scene 1 — the hook, modern kinetic-typography treatment synced to the VO's own beats. */
export const Scene01: React.FC = () => (
  <SceneShell beds={BEDS[1]} dur={S01_DUR}>
    <KineticSequence lines={LINES} />
  </SceneShell>
);
