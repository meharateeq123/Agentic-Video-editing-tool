import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S09_DUR = 721; // 155.38 -> 179.40s

const WIN: [number, number, number, number] = [340, 362, 400, 416];

/** Scene 9 — the lifetime best at Sectionals that didn't break a record but still mattered. */
export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[9]} dur={S09_DUR}>
      <StatCard
        label="200m Backstroke — Novato Sectionals"
        value={<div style={{fontSize: 96, fontWeight: 800, color: '#fff', lineHeight: 1}}>2:12.39</div>}
        caption="A lifetime best — no record, but still progress"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
    </SceneShell>
  );
};
