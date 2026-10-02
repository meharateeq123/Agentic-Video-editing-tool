import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RealisticGlobe} from '../components/RealisticGlobe';
import {mountedFrames} from '../timeline';
import {TRACKS} from '../geo';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 — "Bell took the checkered flag at the Cook Out Southern 500, beating his own Joe Gibbs
 * Racing teammate Ty Gibbs to the line."
 *
 * The film's establishing shot of where all of this happened: down from orbit onto Darlington
 * itself. This is the globe treatment; scene 20's move to Gateway uses the flat route map instead,
 * so the two map moments in the film never repeat the same trick.
 *
 * No bed footage here — the globe is the picture, full frame.
 */
export const Scene03: React.FC = () => (
  <AbsoluteFill>
    <RealisticGlobe
      target={{
        name: 'Darlington',
        lat: TRACKS.darlington.ll[1],
        lon: TRACKS.darlington.ll[0],
        sub: 'Cook Out Southern 500',
        country: 'United States of America',
      }}
      dur={S03_DUR}
    />
  </AbsoluteFill>
);
