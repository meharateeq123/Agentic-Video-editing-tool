import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 — the close. "Now he has the win, the momentum, and a real shot at the top of the
 * standings... the rest of the Chase field just found out how dangerous Bell can be."
 *
 * The card the film has been building toward: his face beside the win itself. Two films ago this
 * card was missing entirely and the user caught it; it is written first now, not last.
 */
const W: Win = [120, 150, 400, 450];

export const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(21)} dur={S21_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 250,
            width: 1320,
            opacity: g,
            transform: `translateY(${(1 - g) * 26}px)`,
            ...cardStyle({radius: 20, pad: 0}),
            overflow: 'hidden',
          }}
        >
          <div style={{display: 'flex', alignItems: 'stretch'}}>
            <Img
              src={staticFile('id/bell.png')}
              style={{width: 300, height: 300, objectFit: 'cover', display: 'block'}}
            />
            <Img
              src={staticFile('id/bell-win.jpg')}
              style={{flex: 1, height: 300, objectFit: 'cover', objectPosition: '50% 45%', display: 'block'}}
            />
          </div>
          <div style={{padding: '30px 38px 34px'}}>
            <div style={{...labelStyle(18), color: C.amber}}>Cook Out Southern 500 — Darlington</div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 52,
                fontWeight: 800,
                color: C.text,
                letterSpacing: -1.8,
                lineHeight: 1.08,
                marginTop: 10,
              }}
            >
              Christopher Bell — first win of 2026
            </div>
            <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 10}}>
              Second in the Chase, with nine races left to run.
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
