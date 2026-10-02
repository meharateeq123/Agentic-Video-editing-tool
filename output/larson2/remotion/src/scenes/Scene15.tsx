import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "That's not just a driver enjoying a win... And he backed up his mindset through the
 * whole losing streak, too. 'I haven't doubted myself; I haven't doubted our team,' Larson said."
 * The doubted-myself quote is the LAST thing said in this scene (VO transcript: "I haven't"
 * starts at scene-local frame ~480, "...our team," ends ~542) so the card only appears late,
 * leaving the scene's first ~16s on plain real footage (larson-interview.mp4 continues) under the
 * setup narration and the tail of Scene 14's quote.
 */
const W: Win = [465, 493, 560, 586];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 465, 493);
  const attr = ease(frame, 505, 530);

  return (
    <BedChain segs={chain(15)} dur={S15_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              maxWidth: 1450,
              margin: '0 auto',
              lineHeight: 1.3,
            }}
          >
            &ldquo;I haven&apos;t doubted myself. I haven&apos;t doubted our team.&rdquo;
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
            Kyle Larson - Victory Lane
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
