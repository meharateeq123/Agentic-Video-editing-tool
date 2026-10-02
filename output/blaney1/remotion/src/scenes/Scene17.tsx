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
 * Scene 17 - "His crew chief, Jonathan Hassler, tried to find the positive in a day that could
 * have gone even worse. 'Fortunately, we were in a decent spot with the points coming in,'
 * Hassler said. 'We've got a lot of good tracks coming up, so we will move on and do the best we
 * can every week.'" No real footage of Hassler was found, so this plays as a text quote over real
 * Gateway race footage rather than forcing a mismatched clip.
 */
const W: Win = [24, 52, 100, 126];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 24, 52);
  const attr = ease(frame, 42, 70);

  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
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
              fontSize: 40,
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
            &ldquo;We&apos;ve got a lot of good tracks coming up. We will move on and do the best we
            can every week.&rdquo;
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
            Jonathan Hassler - Blaney's crew chief
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
