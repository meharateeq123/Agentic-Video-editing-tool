import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 91;
export const S03_CUTS = [30, 30, 31];

// "Kyle" is said at 9.06s = scene frame 12, "Denny" at 10.00s = frame 40, "one" at 11.00s = frame 70. Each
// graphic lands on its word and leaves ~1s after it has landed. The Larson card sits over the #5 pane, the
// Hamlin card over the #11 cuts.
export const S03_LARSON_AT = 12;
export const S03_HAMLIN_AT = 40;
export const S03_STAMP_AT = 70;
const W_LARSON: Win = [6, 12, 42, 52];
const W_HAMLIN: Win = [34, 40, 70, 80];
const W_STAMP: Win = [64, 70, 90, 102];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_LARSON, W_HAMLIN, W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <IdCard photo="id/larson-id.jpg" name="Kyle Larson" sub="No. 5 · Hendrick Motorsports" label="NASCAR Cup Series" win={W_LARSON} />
    <IdCard photo="id/hamlin-id.jpg" name="Denny Hamlin" sub="No. 11 · Joe Gibbs Racing" label="NASCAR Cup Series" win={W_HAMLIN} />
    <RankStamp value="+1" label="Larson Leads Hamlin" at={S03_STAMP_AT} win={W_STAMP} size={330} />
    <Sequence from={7} durationInFrames={30} layout="none">
      <Caption text="NOW KYLE LARSON" inAt={0} outAt={20} fontSize={58} />
    </Sequence>
    <Sequence from={30} durationInFrames={32} layout="none">
      <Caption text="LEADS DENNY HAMLIN" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
    <Sequence from={58} durationInFrames={33} layout="none">
      <Caption text="by JUST ONE POINT" inAt={0} outAt={24} fontSize={58} />
    </Sequence>
  </>
);
