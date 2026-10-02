import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 207;
export const S03_CUTS = [52, 52, 52, 51];

// "one" is said at 11.38s = scene frame 68; the +1 stamp lands on it and leaves ~1s later.
export const S03_STAMP_AT = 68;
const W1: Win = [62, 68, 98, 110];

// "Kyle Larson" is said at 10.48-11.0s (frames 41-48) and "Denny Hamlin" at 12.44-13.2s (frames 100-108);
// each ID card lands on its name and leaves ~1s after it has landed.
export const S03_LARSON_AT = 40;
export const S03_HAMLIN_AT = 99;
const W_LARSON: Win = [34, 40, 72, 82];
const W_HAMLIN: Win = [93, 99, 131, 141];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1, W_LARSON, W_HAMLIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <IdCard photo="id/larson-id.jpg" name="Kyle Larson" sub="No. 5 · Hendrick Motorsports" label="NASCAR Cup Series" win={W_LARSON} />
    <IdCard photo="id/hamlin-id.jpg" name="Denny Hamlin" sub="No. 11 · Joe Gibbs Racing" label="NASCAR Cup Series" win={W_HAMLIN} />
    <RankStamp value="+1" label="Larson Over Hamlin" at={S03_STAMP_AT} win={W1} size={330} />
    <Sequence from={8} durationInFrames={34} layout="none">
      <Caption text="NOW the CHASE ARRIVES" inAt={0} outAt={20} fontSize={54} />
    </Sequence>
    <Sequence from={33} durationInFrames={30} layout="none">
      <Caption text="with KYLE LARSON" inAt={0} outAt={20} fontSize={58} />
    </Sequence>
    <Sequence from={58} durationInFrames={34} layout="none">
      <Caption text="ONLY ONE POINT AHEAD" inAt={0} outAt={34} fontSize={56} />
    </Sequence>
    <Sequence from={93} durationInFrames={28} layout="none">
      <Caption text="of DENNY HAMLIN" inAt={0} outAt={18} fontSize={58} />
    </Sequence>
    <Sequence from={123} durationInFrames={30} layout="none">
      <Caption text="while SEVERAL DRIVERS" inAt={0} outAt={20} fontSize={54} />
    </Sequence>
    <Sequence from={150} durationInFrames={57} layout="none">
      <Caption text="are DESPERATELY trying to CLOSE the GAP" inAt={0} outAt={46} fontSize={52} />
    </Sequence>
  </>
);
