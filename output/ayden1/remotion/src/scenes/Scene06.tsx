import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {SideIntro} from '../components/SideIntro';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S06_DUR = 883; // 79.02 -> 108.44s

const WIN: [number, number, number, number] = [30, 52, 100, 116];

/** Scene 6 — the 50 fly record, breaking Thomas Heilman's 2019 mark. Heilman gets a real
 * full-frame cutaway (the second cut in footage.ts) instead of a small card. */
export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[6]} dur={S06_DUR}>
      <StatCard
        label="50 Yard Butterfly — Saratoga"
        value={<div style={{fontSize: 96, fontWeight: 800, color: '#fff', lineHeight: 1}}>22.85</div>}
        caption="Broke Thomas Heilman's 22.87 — Heilman later made the 2024 Paris Olympic team"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
      <SideIntro name="Thomas Heilman" role="2024 Paris Olympic Team" side="left" inAt={745} outAt={875} />
    </SceneShell>
  );
};
