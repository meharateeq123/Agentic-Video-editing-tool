import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - the hook. "Denny Hamlin walked into the Chase with the biggest cushion in the field.
 * One race later, that cushion is cut in half."
 *
 * The original cut opened cold on a quiet photo card - no punch, nothing to make someone stop
 * scrolling. This opens on kinetic type instead: three short lines punch in fast and hard, the
 * last one lands the whole hook ("CUT IN HALF"), and only once that's said does it hand off to the
 * photo card that names who this is about.
 */
const punchIn = (t: number) =>
  interpolate(t, [0, 1], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Word: React.FC<{
  frame: number;
  at: number;
  len?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({frame, at, len = 18, children, style}) => {
  const t = Math.max(0, Math.min(1, (frame - at) / len));
  const k = punchIn(t);
  return (
    <div
      style={{
        opacity: k,
        transform: `scale(${interpolate(k, [0, 1], [1.32, 1])}) translateY(${(1 - k) * 10}px)`,
        filter: `blur(${interpolate(k, [0, 1], [10, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Kinetic hook: rises with the first word, holds, falls 30 frames after the last line completes.
const K: Win = [0, 12, 150, 190];
// Photo card: starts right as the hook clears.
const W: Win = [170, 196, 320, 360];

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const kK = winK(frame, K);
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(1)} dur={S01_DUR} wins={[K, W]} amp={0.07} maxBlur={17} dim={0.58}>
      {/* Kinetic hook */}
      <AbsoluteFill style={{opacity: kK, pointerEvents: 'none'}}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 330,
            width: 1920,
            textAlign: 'center',
          }}
        >
          <Word frame={frame} at={6} len={16}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 58,
                fontWeight: 700,
                color: C.muted,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              He had the biggest cushion in the field.
            </div>
          </Word>

          <Word frame={frame} at={58} len={22} style={{marginTop: 18}}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 146,
                fontWeight: 800,
                color: C.amber,
                letterSpacing: -5,
                lineHeight: 1,
                textShadow: `0 0 60px ${C.amberDim}`,
              }}
            >
              CUT IN HALF.
            </div>
          </Word>

          <Word frame={frame} at={100} len={18} style={{marginTop: 26}}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 34,
                fontWeight: 600,
                color: C.text,
                letterSpacing: 0.5,
              }}
            >
              One race. One night. That's all it took.
            </div>
          </Word>
        </div>
      </AbsoluteFill>

      {/* The photo card, once the hook has said its piece */}
      <Overlay k={winK(frame, W)} rise={24}>
        <PhotoCard
          photo="id/hamlin.png"
          eyebrow="Cook Out Southern 500 - Darlington"
          title="Denny Hamlin"
          sub="No. 1 seed. 25-point cushion. One race later, half of it is gone."
          width={840}
          photoHeight={545}
          objectPosition="50% 30%"
          style={{
            position: 'absolute',
            left: 150,
            top: 130,
            opacity: g,
            transform: `translateY(${(1 - g) * 28}px)`,
          }}
        />
      </Overlay>
    </BedChain>
  );
};
