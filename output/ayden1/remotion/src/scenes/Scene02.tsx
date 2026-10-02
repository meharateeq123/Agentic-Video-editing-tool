import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {SideIntro} from '../components/SideIntro';
import {BEDS} from '../footage';

export const S02_DUR = 488; // 7.90 -> 24.16s

/** Scene 2 — who he is. */
export const Scene02: React.FC = () => (
  <SceneShell beds={BEDS[2]} dur={S02_DUR}>
    <SideIntro name="Ayden Tan" role="San Ramon Valley Aquatics — California" side="right" inAt={12} outAt={S02_DUR - 60} />
  </SceneShell>
);
