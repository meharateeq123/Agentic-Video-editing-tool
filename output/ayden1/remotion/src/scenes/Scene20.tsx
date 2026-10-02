import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S20_DUR = 782; // 386.76 -> 412.84s

const WIN: [number, number, number, number] = [10, 32, 62, 78];

/** Scene 20 — Tan moves into the 13-14 age group. */
export const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[20]} dur={S20_DUR}>
      <StatCard
        label="Now Competing In"
        value={<div style={{fontSize: 90, fontWeight: 800, color: '#fff', lineHeight: 1}}>13–14</div>}
        caption="A new bracket, against the best 13 and 14-year-olds in the country"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
    </SceneShell>
  );
};
