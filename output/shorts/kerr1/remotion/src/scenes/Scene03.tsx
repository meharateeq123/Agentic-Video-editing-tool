import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 106; // 8.04 -> 11.56s
export const S03_CUTS = [53, 53];

// "1:47" is said at 1.94s = frame 58 and ".79" at 2.70s = frame 81, so the stamp slams down on the
// number and settles by 68; out0 = 68 + 30. The bed under it is the moment the broadcast's own
// "2 LAPS TO GO / 1:42" bug is up, which is exactly where the last 800 begins.
const STAMP_WIN: Win = [56, 62, 98, 112];

/** Frame the number slams down - FinalFilm puts an impact on it. */
export const S03_SLAM_AT = 58;

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="1:47.79" label="Last 800 metres" at={58} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={56} layout="none">
      <Caption text="He CLOSED the final 800 METERS in" outAt={46} fontSize={46} />
    </Sequence>
  </>
);