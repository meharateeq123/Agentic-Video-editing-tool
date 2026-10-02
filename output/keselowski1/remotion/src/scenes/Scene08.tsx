import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - quote: "He ran into me," Keselowski said, describing the incident. Very short (2.3s) -
 * same sharp-footage, bottom-centre caption treatment every quote in this film uses (no blur/dim on
 * the underlying clip, matching the style every prior film in this series settled on).
 */
const W: Win = [4, 16, 44, 62];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 6, 22);

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.04} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={12}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 52,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;He ran into me.&rdquo;
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 16, opacity: k}}>
            Brad Keselowski
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
