import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S03_DUR = 472; // 24.16 -> 39.90s

const WIN: [number, number, number, number] = [10, 32, 62, 78];

/** Scene 3 — 7 records in a single summer. */
export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[3]} dur={S03_DUR}>
      <StatCard
        label="Summer 2025"
        value={<div style={{fontSize: 132, fontWeight: 800, color: '#fff', lineHeight: 1}}>7</div>}
        caption="National Age Group Records — before he even turned 13"
        k={k}
        x={1250}
        y={620}
        width={560}
      />
    </SceneShell>
  );
};
