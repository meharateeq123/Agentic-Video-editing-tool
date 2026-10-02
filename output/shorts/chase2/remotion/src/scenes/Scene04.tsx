import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 104;
export const S04_CUTS = [35, 35, 34];

// "Kyle Larson" is said at 9.18-9.7s (frames 17-33), "1" at 10.14s (frame 46), "Denny Hamlin" at 11.30-11.9s
// (frames 81-99). Each graphic lands on its word and leaves ~1s after it has landed. The Larson card sits over
// the #5 cut, the Hamlin card over the #11 cut.
export const S04_LARSON_AT = 17;
export const S04_STAMP_AT = 46;
export const S04_HAMLIN_AT = 81;
const W_LARSON: Win = [11, 17, 47, 57];
const W_STAMP: Win = [40, 46, 70, 80];
const W_HAMLIN: Win = [75, 81, 111, 121];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W_LARSON, W_STAMP, W_HAMLIN]} amp={0.05} maxBlur={4} dim={0.16} />
    <IdCard photo="id/larson-id.jpg" name="Kyle Larson" sub="No. 5 · Hendrick Motorsports" label="NASCAR Cup Series" win={W_LARSON} />
    <IdCard photo="id/hamlin-id.jpg" name="Denny Hamlin" sub="No. 11 · Joe Gibbs Racing" label="NASCAR Cup Series" win={W_HAMLIN} />
    <RankStamp value="+1" label="Larson Over Hamlin" at={S04_STAMP_AT} win={W_STAMP} size={330} />
    <Sequence from={5} durationInFrames={38} layout="none">
      <Caption text="AND WITH KYLE LARSON" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
    <Sequence from={36} durationInFrames={40} layout="none">
      <Caption text="ONLY ONE POINT AHEAD" inAt={0} outAt={30} fontSize={56} />
    </Sequence>
    <Sequence from={74} durationInFrames={30} layout="none">
      <Caption text="of DENNY HAMLIN" inAt={0} outAt={16} fontSize={58} />
    </Sequence>
  </>
);
