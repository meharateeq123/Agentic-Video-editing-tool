import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {RealisticGlobe} from '../components/RealisticGlobe';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {TRACKS} from '../geo';

export const S20_DUR = mountedFrames(20);

const GLOBE_FRAMES = 200; // ~6.7s establishing beat, then fades to reveal the real footage under it

const GlobeBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const out = 1 - ease(frame, GLOBE_FRAMES - 30, GLOBE_FRAMES);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <RealisticGlobe
        target={{
          name: 'Bristol',
          lat: TRACKS.bristol.ll[1],
          lon: TRACKS.bristol.ll[0],
          sub: 'Bass Pro Shops Night Race - Sept 19',
          country: 'United States of America',
        }}
        dur={GLOBE_FRAMES}
      />
    </AbsoluteFill>
  );
};

/**
 * Scene 20 - "The Chase moves to Bristol Motor Speedway for the Bass Pro Shops Night Race on
 * Saturday, September 19th..." Per the map-animation-screen-time rule, the globe is a ~6.7s
 * establishing beat (not the whole scene) laid over the real Bristol drone footage, fading out at
 * frame 200 so the real footage carries the rest of the scene.
 */
export const Scene20: React.FC = () => (
  <>
    <BedChain segs={chain(20)} dur={S20_DUR} />
    <Sequence from={0} durationInFrames={GLOBE_FRAMES} layout="none">
      <GlobeBeat />
    </Sequence>
  </>
);
