import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed} from './Bed';
import {FadeIn} from './base';
import type {Bed} from '../footage';

/**
 * Wires a scene's list of Bed cuts into sequential <Sequence> blocks (never one clip stretched
 * across a long scene), each cross-fading in over its own SceneBed. `children` renders once,
 * as a sibling to every cut, so an overlay (SideIntro, StatCard, Quote) spans the whole scene
 * regardless of how many internal cuts it sits on top of.
 */
export const SceneShell: React.FC<{
  beds: Bed[];
  dur: number;
  children?: React.ReactNode;
}> = ({beds, dur, children}) => {
  const n = beds.length;
  const base = Math.floor(dur / n);
  const cutFrames = beds.map((_, i) => (i === n - 1 ? dur - base * (n - 1) : base));

  let from = 0;
  return (
    <>
      {cutFrames.map((cutDur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={cutDur} layout="none">
            <FadeIn len={isFirst ? 0 : 10} skip={isFirst}>
              <SceneBed {...beds[i]} dur={cutDur} wins={[]} amp={0.1} />
            </FadeIn>
          </Sequence>
        );
        from += cutDur;
        return seq;
      })}
      {children}
    </>
  );
};
