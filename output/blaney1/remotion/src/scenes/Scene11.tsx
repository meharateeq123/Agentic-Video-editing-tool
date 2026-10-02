import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "'I was right behind Ryan when he blew his,' Elliott said. 'I guess it's kind of the
 * luck of the draw, unfortunately. I just went to make a move on the No. 19 there. I stepped on
 * the brakes, exploded a rotor, and that was about it.'" REAL footage - this is Chase Elliott's
 * actual #9 car brake failure from the same highlights reel (offset 1555, collecting Chase
 * Briscoe), not a stand-in shot. No real audio of Elliott's own quote was found, so it plays as a
 * text caption over his real crash footage rather than forcing a mismatched clip.
 */
const W: Win = [30, 58, 106, 132];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 30, 58);
  const attr = ease(frame, 48, 76);

  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 40,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1450,
              margin: '0 auto',
              lineHeight: 1.3,
            }}
          >
            &ldquo;I was right behind Ryan when he blew his. I stepped on the brakes, exploded a
            rotor, and that was about it.&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 19,
              fontWeight: 500,
              color: C.muted,
              marginTop: 16,
              opacity: attr,
            }}
          >
            Chase Elliott - on his own brake failure, laps later
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
