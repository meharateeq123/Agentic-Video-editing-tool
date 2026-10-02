import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, cardStyle, labelStyle} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S03_DUR = 95; // 6.88 -> 10.02s

/**
 * Scene 3 — "his replacement is already locked in: Riley Herbst." His own post-win interview,
 * face on screen for the whole beat — the strongest way to show a named person is to actually
 * show them. A small centred nameplate confirms who's on screen at a glance.
 */
const W: Win = [10, 26, 74, 95];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBed {...bed(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={6} dim={0.14}>
      <Overlay k={winK(frame, W)} rise={10}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 400}}>
          <div
            style={{
              ...cardStyle({radius: 16, pad: 24}),
              display: 'inline-block',
              borderBottom: `2px solid ${C.emerald}`,
            }}
          >
            <div style={{...labelStyle(28), color: C.text, letterSpacing: 28 * 0.1, whiteSpace: 'nowrap'}}>
              Riley Herbst
            </div>
          </div>
        </AbsoluteFill>
      </Overlay>
      <Caption text="His replacement is already locked in: Riley Herbst" outAt={S03_DUR - 4} fontSize={50} />
    </SceneBed>
  );
};
