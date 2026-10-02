import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S05_DUR = 837; // 51.12 -> 79.02s

const WIN: [number, number, number, number] = [420, 442, 500, 516];

/** Scene 5 — the 200 IM record, breaking Richard Poplawski's 2019 mark. */
export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[5]} dur={S05_DUR}>
      <StatCard
        label="200m Individual Medley — Fresno"
        value={<div style={{fontSize: 96, fontWeight: 800, color: '#fff', lineHeight: 1}}>2:12.80</div>}
        caption="Broke Richard Poplawski's 2:13.59 — a mark that had stood since 2019"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
    </SceneShell>
  );
};
