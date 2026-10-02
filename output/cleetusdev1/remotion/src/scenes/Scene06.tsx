import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6); // 457f, 3 links

/**
 * Scene 6 — "Putting that exact car, in that exact paint scheme, into the first real look at
 * NASCAR 26 is not a coincidence. It's the game studio choosing to represent Cleetus with the
 * moment that best captures how much progress he's actually made behind the wheel."
 *
 * The card holds the actual frame from the Dev Diary, so the in-game shot is already on screen as
 * a still. That frees the footage under it to be the real race — the "moment that best captures
 * how much progress he has made" the line ends on — rather than a third repeat of the same seven
 * seconds of game capture.
 */
const W: Win = [56, 76, 121, 146];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const g = Math.max(0, Math.min(1, ease(frame - W[0], 0, 20) * 1.3));

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.08} maxBlur={14} dim={0.36}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 400,
            top: 300,
            width: 1120,
            opacity: g,
            transform: `translateY(${(1 - g) * 24}px)`,
            ...cardStyle({radius: 18, pad: 0}),
            overflow: 'hidden',
          }}
        >
          <Img
            src={staticFile('id/cleetus30-ingame.jpg')}
            style={{width: '100%', height: 400, objectFit: 'cover', objectPosition: '52% 58%', display: 'block'}}
          />
          <div style={{padding: '26px 34px 30px'}}>
            <div style={{...labelStyle(18), color: C.amber}}>Not a coincidence</div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 44,
                fontWeight: 800,
                color: C.text,
                letterSpacing: -1.4,
                lineHeight: 1.1,
                marginTop: 8,
              }}
            >
              The scheme he ran at Talladega
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
