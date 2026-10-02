import React from 'react';
import {Sequence} from 'remotion';
import {SceneBed, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import type {Bed} from '../footage';

/**
 * Plays a scene's beds back to back, each one a continuous clip, with a short dissolve between
 * them. `wins` are in scene frames; each cut sees them shifted into its own local time so the
 * bed blur tracks an overlay that spans a cut.
 */
export const Cuts: React.FC<{
  cuts: Bed[];
  frames: number[];
  wins?: Win[];
  amp?: number;
  maxBlur?: number;
  dim?: number;
}> = ({cuts, frames, wins = [], amp = 0.06, maxBlur = 12, dim = 0.28}) => {
  let from = 0;
  return (
    <>
      {frames.map((dur, i) => {
        const isFirst = i === 0;
        const isLast = i === frames.length - 1;
        const local = wins.map((w) => w.map((f) => f - from) as Win);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur + (isLast ? 10 : 0)} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...cuts[i]} dur={dur} wins={local} amp={amp} maxBlur={maxBlur} dim={dim} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </>
  );
};
