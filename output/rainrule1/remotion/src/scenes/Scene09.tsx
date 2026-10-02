import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - the real O'Donnell/Kennedy quote. Sharp, unblurred bottom-centre caption
 * (flick-quote-scene-style) over the real footage, not a graphic that dims or blurs the clip.
 * "We always listen..." starts at f205; "...went to work" ends at f653.
 */
const W: Win = [190, 218, 660, 686];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 190, 218);
  const attr = ease(frame, 630, 655);

  return (
    <BedChain segs={chain(9)} dur={S09_DUR} wins={[W]} amp={0.04} maxBlur={0} dim={0.06}>
      <Overlay k={winK(frame, W)} rise={14}>
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to top, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0.55) 30%, rgba(6,6,8,0) 58%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 84, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.3,
              opacity: k,
              transform: `translateY(${(1 - k) * 14}px)`,
              textShadow: '0 2px 18px rgba(0,0,0,0.7)',
              maxWidth: 1500,
              margin: '0 auto',
              lineHeight: 1.4,
            }}
          >
            &ldquo;We always listen to fan and industry feedback, and if there&apos;s an
            opportunity to make a meaningful difference that benefits the racing, we won&apos;t
            waste time acting on it. There were a lot of strong opinions after New Hampshire, and
            Ben Kennedy, John Probst, and the entire competition team went to work.&rdquo;
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
            Steve O&apos;Donnell - NASCAR CEO
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
