import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - "We're still leading." Three words, so they get bottom-centre and nothing else - no
 * panel, no rule, no dimmed-out footage. It is his closing line, so his own face stays sharp behind
 * it rather than buried under a graphic.
 */
const W: Win = [30, 62, 220, 262];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 58, 96);
  const sub = ease(frame, 150, 190);

  return (
    <BedChain segs={chain(19)} dur={S19_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={18}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.86) 0%, rgba(6,6,8,0.5) 30%, rgba(6,6,8,0) 56%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 110, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 88,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -3,
              opacity: k,
              transform: `translateY(${(1 - k) * 18}px)`,
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            &ldquo;We&rsquo;re still leading.&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 500,
              color: C.muted,
              marginTop: 18,
              opacity: sub,
            }}
          >
            Denny Hamlin
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
