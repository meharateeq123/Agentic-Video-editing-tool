import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S08_DUR = 485; // 139.22 -> 155.38s

const WIN: [number, number, number, number] = [10, 32, 62, 78];

/** Scene 8 — 12 records across two age brackets. */
export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[8]} dur={S08_DUR}>
      <StatCard
        label="Two Age Brackets"
        value={<div style={{fontSize: 132, fontWeight: 800, color: '#fff', lineHeight: 1}}>12</div>}
        caption="National Age Group Records set, 10-and-Under through 11-12"
        k={k}
        x={1250}
        y={620}
        width={560}
      />
    </SceneShell>
  );
};
