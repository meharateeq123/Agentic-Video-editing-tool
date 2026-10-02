import React from 'react';
import {C} from '../theme';
import {SceneBed, type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {bed} from '../footage';

export const S01_DUR = 344; // 0.00 -> 11.45s

/**
 * Scene 1 — the hook. The race clip runs underneath from the first frame to the last, and the
 * ID card lands on the opening line's own name: it appears centre-frame at a larger size, holds
 * there for a beat so it can be read, then settles down to the bottom-left corner and leaves as
 * the line turns to "what happens to him next".
 *
 * The portrait is a frame from the interview section in the bed pool, whose source video is
 * titled as a Nemechek interview. That is inference from the source, not a positive
 * identification — worth eyeballing before this ships.
 */
const W_NEMECHEK: Win = [15, 52, 232, 286];

export const Scene01: React.FC = () => (
  <SceneBed
    {...bed(1)}
    dur={S01_DUR}
    wins={[W_NEMECHEK]}
    accent={C.amber}
    amp={0.11}
    maxBlur={5}
    dim={0.12}
  >
    <IdCard
      photo="id/nemechek.png"
      name="John Hunter Nemechek"
      affiliation="No. 42 — Legacy Motor Club"
      focus={[50, 34]}
      zoom={1.25}
      win={W_NEMECHEK}
    />
  </SceneBed>
);
