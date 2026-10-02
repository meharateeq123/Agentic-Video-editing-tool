import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {StatCard} from '../components/DataViz';
import {bed} from '../footage';

export const S11_DUR = 157; // 140.03 -> 145.27s

/**
 * Scene 11 — the turn. The 133-point deficit the previous scenes built up gets erased in one
 * card, in the same red the deficit itself would carry, with a line under it that says why.
 */
// Capped at 2s total: reveal (20f), a brief readable pause (15f), then leaves the moment it's
// done — no lingering hold once the animation has finished making its point.
const W: Win = [8, 28, 43, 68];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame - W[0], 0, 20);

  return (
    <SceneBed {...bed(11)} dur={S11_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.36}>
      <Overlay k={winK(frame, W)} rise={18}>
        <StatCard
          label="Regular-season deficit"
          value={
            <span style={{fontFamily: FONT, fontSize: 128, fontWeight: 800, color: C.red, letterSpacing: -4, lineHeight: 1}}>
              -133
            </span>
          }
          caption="Doesn't matter anymore — the Chase resets every driver's points."
          k={k}
          accent={C.red}
          x={660}
          y={400}
          width={600}
        />
      </Overlay>
    </SceneBed>
  );
};
