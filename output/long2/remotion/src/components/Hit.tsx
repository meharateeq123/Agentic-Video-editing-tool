import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

/**
 * A single one-shot sound effect fired at `at` (scene frame) - the motion graphic's own hit, not
 * VO. Kept quiet (default 0.34) so it sits under the narration rather than competing with it.
 */
export const Hit: React.FC<{file: 'Pop.mp3' | 'Popups.mp3' | 'Zoomin-OR-out.mp3'; at: number; volume?: number}> = ({
  file,
  at,
  volume = 0.34,
}) => (
  <Sequence from={Math.max(0, at)} layout="none">
    <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
  </Sequence>
);
