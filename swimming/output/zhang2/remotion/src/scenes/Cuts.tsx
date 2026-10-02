import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {SceneBed, type Win} from '../components/Bed';
import type {Bed} from '../footage';

const PUNCH = Easing.bezier(0.2, 0, 0, 1);

/**
 * One cut with a hard-hitting entry: the clip lands zoomed in and snaps back over ~8 frames,
 * under a 4-frame white flash. The first cut of a scene skips both (the scene transition covers it).
 */
const PunchIn: React.FC<{children: React.ReactNode; skip: boolean}> = ({children, skip}) => {
  const f = useCurrentFrame();
  if (skip) return <>{children}</>;
  const scale = interpolate(f, [0, 8], [1.14, 1], {easing: PUNCH, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const flash = interpolate(f, [0, 1, 4], [0.85, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`, willChange: 'transform'}}>{children}</AbsoluteFill>
      {flash > 0.001 ? <AbsoluteFill style={{backgroundColor: '#fff', opacity: flash}} /> : null}
    </AbsoluteFill>
  );
};

/**
 * Plays a scene's beds back to back, each one a continuous clip, hard-cut with a flash and a
 * zoom punch. `wins` are in scene frames; each cut sees them shifted into its own local time so
 * the bed blur tracks an overlay that spans a cut.
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
        const isLast = i === frames.length - 1;
        const local = wins.map((w) => w.map((f) => f - from) as Win);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur + (isLast ? 10 : 0)} layout="none">
            <PunchIn skip={i === 0}>
              <SceneBed {...cuts[i]} dur={dur} wins={local} amp={amp} maxBlur={maxBlur} dim={dim} />
            </PunchIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </>
  );
};

/** Scene-local frames where each cut after the first begins - used to place the cut SFX. */
export const cutStarts = (frames: number[]) => frames.slice(0, -1).map((_, i) => frames.slice(0, i + 1).reduce((a, b) => a + b, 0));
