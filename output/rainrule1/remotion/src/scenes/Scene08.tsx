import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {C, FONT} from '../theme';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

// "seven second lead" f279-306, "competition caution" f396-425, "back onto slicks" f509-533.
const W1: Win = [265, 279, 355, 381];
const W2: Win = [382, 396, 460, 486];
const W3: Win = [495, 509, 570, 596];

const Beat: React.FC<{win: Win; text: string; color: string; big?: boolean}> = ({win, text, color, big}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  if (k <= 0.001) return null;
  const s = interpolate(frame, [win[1], win[1] + 10], [1.5, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 130, pointerEvents: 'none'}}>
      <div
        style={{
          opacity: k,
          transform: `scale(${s})`,
          fontFamily: FONT,
          fontSize: big ? 92 : 70,
          fontWeight: 900,
          letterSpacing: -2,
          color,
          textTransform: 'uppercase',
          textAlign: 'center',
          WebkitTextStroke: '3px #000',
          paintOrder: 'stroke fill',
          textShadow: '0 6px 26px rgba(0,0,0,0.75)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Scene 8 - the hero beat: "...he built more than a seven-second lead... Then NASCAR stepped in,
 * throwing a competition caution and forcing every car... back onto slicks." Three sequential
 * stamps, each timed to its own spoken phrase, each gone before the next lands.
 */
export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} wins={[W1, W2, W3]} amp={0.06} maxBlur={6} dim={0.28}>
    <Beat win={W1} text="+7 SECOND LEAD" color={C.emerald} big />
    <Beat win={W2} text="COMPETITION CAUTION" color={C.red} />
    <Beat win={W3} text="FORCED BACK TO SLICKS" color="#fff" />
  </BedChain>
);
