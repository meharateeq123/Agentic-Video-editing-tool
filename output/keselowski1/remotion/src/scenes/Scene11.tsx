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
 * Scene 11 - the line that defines the whole story: "His day is coming, and it's coming hard.
 * Watch out, Carson." The biggest quote treatment in the film - bigger type than scene 8/10, "Watch
 * out, Carson" picked out in amber, held a beat longer before it fades.
 */
const W: Win = [4, 20, 140, 166];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const k1 = ease(frame, 6, 26);
  const k2 = ease(frame, 46, 70);
  const attr = ease(frame, 90, 114);

  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.04} maxBlur={2} dim={0.08}>
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
              fontSize: 60,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.2,
              lineHeight: 1.2,
              opacity: k1,
              transform: `translateY(${(1 - k1) * 14}px)`,
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;His day is coming, and it's coming hard.&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 60,
              fontWeight: 800,
              color: C.amber,
              letterSpacing: -1.2,
              marginTop: 6,
              opacity: k2,
              transform: `translateY(${(1 - k2) * 14}px)`,
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;Watch out, Carson.&rdquo;
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 18, opacity: attr}}>
            Brad Keselowski
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
