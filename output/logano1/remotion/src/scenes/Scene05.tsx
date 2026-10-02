import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "...'I feel like I've had good cars here for qualifying, I just have always screwed up
 * Turn 1,' Logano admitted afterward. 'It's in your head, right? ... It's nice to have a good,
 * clean lap.'" Sharp, unblurred bottom-centre caption per the quote-scene-style rule - the setup
 * about his 35th pole/first at Gateway plays as plain footage first, then the quote lands roughly
 * halfway through the scene.
 */
const W: Win = [340, 368, 416, 442];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 340, 368);
  const attr = ease(frame, 358, 386);

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
            &ldquo;I&apos;ve always screwed up Turn 1&hellip; it&apos;s nice to have a good, clean lap.&rdquo;
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
            Joey Logano - his 35th career pole, first ever at Gateway
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
