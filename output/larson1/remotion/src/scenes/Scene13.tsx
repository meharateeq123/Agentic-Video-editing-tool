import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Really happy with the day. Much better than we've been in Darlington the last couple
 * times." One line, bottom-centre, same sharp-footage quote treatment as scene 11.
 *
 * The VO reads this line in 2.7s, so the whole scene is only 98 mounted frames - the quote and its
 * attribution come in together (staggered by 14f rather than sequenced) and the graphic is fully
 * out by frame 86, leaving the last stretch clean before the cut into scene 14.
 */
const W: Win = [2, 22, 70, 86];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 6, 28);
  const attr = ease(frame, 20, 40);

  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={14}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 90, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;Really happy with the day.&rdquo;
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 16, opacity: attr}}>
            Kyle Larson
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
