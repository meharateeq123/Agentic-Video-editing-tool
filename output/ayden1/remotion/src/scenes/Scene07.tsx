import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {StatCard} from '../components/DataViz';
import {SideIntro} from '../components/SideIntro';
import {band} from '../components/base';
import {BEDS} from '../footage';

export const S07_DUR = 923; // 108.44 -> 139.22s

const WIN: [number, number, number, number] = [200, 222, 270, 286];

/** Scene 7 — the 50 free record, breaking Ronald Dalmacio's 2017 mark. Dalmacio gets a real
 * full-frame cutaway (the second cut in footage.ts) instead of a small card. */
export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...WIN);
  return (
    <SceneShell beds={BEDS[7]} dur={S07_DUR}>
      <StatCard
        label="50m Freestyle — Far Western Championships"
        value={<div style={{fontSize: 96, fontWeight: 800, color: '#fff', lineHeight: 1}}>24.95</div>}
        caption="Broke Ronald Dalmacio's 24.98 — a mark that had stood since 2017"
        k={k}
        x={1200}
        y={650}
        width={600}
      />
      <SideIntro name="Ronald Dalmacio" role="2017 NAG Record Holder" side="left" inAt={796} outAt={913} />
    </SceneShell>
  );
};
