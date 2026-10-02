import React from 'react';
import {BedChain} from '../components/BedChain';
import {GlobeBeat} from '../components/GlobeBeat';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * Then, in late September 2026, everything changed. Smith confirmed she is officially reversing her
 * retirement. She will return to racing this week at the South African Short Course Championships in
 * Pietermaritzburg. But this comeback is not about chasing the same events that made her famous.
 *
 * Map beat: the globe drops onto Pietermaritzburg while the line names it (6.9s = frame 207 onward).
 */
export const Scene05: React.FC = () => (
  <>
    <BedChain segs={chain(5)} dur={S05_DUR} amp={0.04} maxBlur={0} dim={0} />
    <GlobeBeat
      from={196}
      frames={180}
      place={{
        name: 'Pietermaritzburg',
        lat: -29.6006,
        lon: 30.3794,
        sub: 'SA Short Course Championships',
        country: 'South Africa',
      }}
    />
  </>
);
