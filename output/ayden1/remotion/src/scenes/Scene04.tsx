import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S04_DUR = 337; // 39.90 -> 51.12s

const WIN: [number, number, number, number] = [10, 32, 58, 74];

/** Scene 4 — the 10-and-under record run, before this summer. */
export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[4]} dur={S04_DUR}>
      <StatCard
        label="10-and-Under"
        value={<div style={{fontSize: 100, fontWeight: 800, color: '#fff', lineHeight: 1}}>5</div>}
        caption="Records already held before this summer began"
        k={k}
        x={1250}
        y={650}
        width={560}
      />
    </SceneShell>
  );
};
