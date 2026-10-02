import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 72; // 6.86 -> 9.28s

const CUT_FRAMES = [36, 36];

// "won" is said at 7.30s (f13); the chip lands there and completes at 25, so out0 = 25 + 30.
const CHIP_AT = 13;
const CARD_WIN: Win = [2, 12, 55, 72];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Last year's Night Race result. */
const WinCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const g = ease(frame, CHIP_AT);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 960,
          width: 860,
          ...cardStyle({radius: 22, pad: 28}),
          borderLeft: `5px solid ${C.emerald}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <div style={{...labelStyle(18), color: C.emerald}}>September 2025</div>
          <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 800, color: C.text, letterSpacing: -1.2, lineHeight: 1.1, marginTop: 10}}>
            Bass Pro Shops Night Race
          </div>
        </div>
        <div
          style={{
            ...numStyle(56, C.emerald),
            padding: '10px 20px',
            borderRadius: 14,
            background: C.emeraldDim,
            opacity: g,
            transform: `scale(${0.8 + 0.2 * g})`,
          }}
        >
          WON
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <WinCard />
    <Caption text="Bell WON THE BRISTOL NIGHT RACE last year," outAt={64} fontSize={50} />
  </>
);
