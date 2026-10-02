import React from 'react';
import {BedChain} from '../components/BedChain';
import {GlobeBeat} from '../components/GlobeBeat';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13
 * The comeback comes with real changes behind the scenes. Smith has relocated from Pretoria to
 * Stellenbosch and started working with a new coach ... Her first competitive test comes this week at the
 * South African Short Course Championships. From there she is targeting the selection meet for the Short
 * Course World Championships in Beijing this December ...
 *
 * Two map beats, each about 6s over the real footage: Stellenbosch as the move is named (3.1s = frame 93)
 * and Beijing as the worlds are named (19.6s onward = frame 588).
 */
export const Scene13: React.FC = () => (
  <>
    <BedChain segs={chain(13)} dur={S13_DUR} amp={0.04} maxBlur={0} dim={0} />
    <GlobeBeat
      from={88}
      frames={180}
      place={{
        name: 'Stellenbosch',
        lat: -33.9321,
        lon: 18.8602,
        sub: 'New home, new coach',
        country: 'South Africa',
      }}
    />
    <GlobeBeat
      from={584}
      frames={180}
      place={{
        name: 'Beijing',
        lat: 39.9042,
        lon: 116.4074,
        sub: 'Short Course Worlds - December 2026',
        country: 'China',
      }}
    />
  </>
);
