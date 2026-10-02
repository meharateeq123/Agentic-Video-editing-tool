import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {RealisticGlobe} from '../components/RealisticGlobe';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {TRACKS} from '../geo';

export const S17_DUR = mountedFrames(17);

// ~5.5s establishing beat: the globe dollies in on Bristol, then dissolves away once it arrives
// so the real drone footage underneath appears to smoothly "arrive" out of the zoom - a swoop
// down from orbit into the actual track, not a separate map scene (map-animation-screen-time).
const GLOBE_FRAMES = 165;

const GlobeBeat: React.FC = () => {
  const frame = useCurrentFrame();
  // RealisticGlobe's own camera arrives ~frame 102 of its 165-frame mount (dur*0.62, its default
  // arriveAt); the fade starts just after that so the dissolve reads as "arrived, now revealing"
  // rather than the globe vanishing mid-swoop.
  const out = 1 - ease(frame, 112, 163);
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
 * Scene 17 - "The Chase now moves to Bristol Motor Speedway for the Bass Pro Shops Night Race on
 * Saturday, September 19th, a half-mile track that rewards precision..." Globe swoop-in reveals
 * the real Bristol drone footage, then the location tag lands on top of it once revealed.
 */
const W: Win = [180, 208, 258, 284];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 180, 208);
  const sub = ease(frame, 200, 228);

  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Sequence from={0} durationInFrames={GLOBE_FRAMES} layout="none">
        <GlobeBeat />
      </Sequence>

      <Overlay k={winK(frame, W)} rise={14}>
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: C.text,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            }}
          >
            Bristol Motor Speedway
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 600,
              color: C.amber,
              letterSpacing: 0.5,
              marginTop: 14,
              opacity: sub,
            }}
          >
            Bass Pro Shops Night Race - Saturday, September 19th
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
