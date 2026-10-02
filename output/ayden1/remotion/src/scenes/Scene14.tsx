import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S14_DUR = 926; // 236.36 -> 267.24s

const WIN: [number, number, number, number] = [200, 222, 270, 286];

/** Scene 14 — Memorial Day meet: 2:13.89 in the 200 IM, second on the all-time list. */
export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[14]} dur={S14_DUR}>
      <StatCard
        label="200 IM — Memorial Day, Tiger Aquatics"
        value={<div style={{fontSize: 96, fontWeight: 800, color: '#fff', lineHeight: 1}}>2:13.89</div>}
        caption="Second on the all-time list — three tenths off Poplawski's record"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
    </SceneShell>
  );
};
