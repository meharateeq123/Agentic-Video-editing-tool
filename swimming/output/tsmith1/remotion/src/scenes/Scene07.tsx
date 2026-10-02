import React from 'react';
import {BedChain} from '../components/BedChain';
import {GlobeBeat} from '../components/GlobeBeat';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7
 * Here is why that detail matters. The 50 meter breaststroke has never appeared on the Olympic swimming
 * program before. Los Angeles 2028 will be the first Olympics ever to include 50 meter sprint events
 * across all four strokes. ...
 *
 * Map beat: the globe lands on Los Angeles as the line names it (5.6s = frame 168 onward).
 */
export const Scene07: React.FC = () => (
  <>
    <BedChain segs={chain(7)} dur={S07_DUR} amp={0.04} maxBlur={0} dim={0} />
    <GlobeBeat
      from={160}
      frames={180}
      place={{
        name: 'Los Angeles',
        lat: 34.0522,
        lon: -118.2437,
        sub: 'LA 2028',
        country: 'United States of America',
      }}
    />
  </>
);
