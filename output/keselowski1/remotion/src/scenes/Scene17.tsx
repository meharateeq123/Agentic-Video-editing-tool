import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 - "I do everything for TV and entertainment purposes based off everybody else... So I
 * don't know. Whatever makes us good TV. I just do it for the clicks." Confirmed on-camera, from the
 * same interview where the reporter then directly asks about the stage-one contact.
 */
const W: Win = [4, 20, 232, 258];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const k1 = ease(frame, 6, 28);
  const k2 = ease(frame, 130, 156);
  const attr = ease(frame, 176, 200);

  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.04} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={14}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0.55) 34%, rgba(6,6,8,0) 62%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 100, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.8,
              lineHeight: 1.3,
              opacity: k1,
              transform: `translateY(${(1 - k1) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            &ldquo;I do everything for TV and entertainment purposes...&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 60,
              fontWeight: 800,
              color: C.amber,
              letterSpacing: -1.2,
              marginTop: 12,
              opacity: k2,
              transform: `translateY(${(1 - k2) * 14}px)`,
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;I just do it for the clicks.&rdquo;
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 18, opacity: attr}}>
            Carson Hocevar
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
