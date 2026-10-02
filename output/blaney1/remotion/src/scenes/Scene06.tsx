import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "He knew immediately how bad it was. 'I have no brakes,' Blaney radioed his team.
 * 'So, tell everyone to look out here.'" Sharp, unblurred bottom-centre caption per the
 * quote-scene-style rule, over the real crash-aftermath footage (highlights.mp4, continuing
 * straight out of scene 5) - no real audio of this exact radio call was found, so this plays as
 * a text quote over the real visual rather than forcing mismatched audio.
 */
const W: Win = [20, 48, 96, 122];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 20, 48);
  const attr = ease(frame, 38, 66);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 42,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1400,
              margin: '0 auto',
              lineHeight: 1.3,
            }}
          >
            &ldquo;I have no brakes. So, tell everyone to look out here.&rdquo;
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
            Ryan Blaney - team radio, moments after the failure
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
