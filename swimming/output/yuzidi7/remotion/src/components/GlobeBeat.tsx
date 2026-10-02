import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {RealisticGlobe, type GlobePlace} from './RealisticGlobe';
import {ease} from './base';

/**
 * A short (about 6s) establishing globe beat laid over the scene's real footage: it fades in, dollies down
 * onto the named place, and fades out again so the footage carries the rest of the scene. A map is a beat,
 * never a whole scene (swimming/CLAUDE.md rule 4).
 */
const Beat: React.FC<{place: GlobePlace; frames: number}> = ({place, frames}) => {
  const frame = useCurrentFrame();
  const o = ease(frame, 0, 10) * (1 - ease(frame, frames - 30, frames));
  return (
    <AbsoluteFill style={{opacity: o}}>
      <RealisticGlobe target={place} dur={frames} />
    </AbsoluteFill>
  );
};

export const GlobeBeat: React.FC<{place: GlobePlace; from: number; frames?: number}> = ({place, from, frames = 180}) => (
  <Sequence from={from} durationInFrames={frames} layout="none">
    <Beat place={place} frames={frames} />
  </Sequence>
);
