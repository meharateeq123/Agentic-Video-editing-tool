import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {BELL_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 140; // 0.00 -> 4.68s

const CUT_FRAMES = [45, 50, 45];

// The card lands on "Christopher Bell" (0.00s), the P3 chip on "third" (1.24s, f37). Complete at
// 48, so out0 = 48 + 30.
const CHIP_AT = 36;
const CARD_WIN: Win = [4, 16, 78, 104];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Who Bell is, and where he now sits. */
const IdCard: React.FC = () => {
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
          ...cardStyle({radius: 22, pad: 26}),
          borderLeft: `5px solid ${C.amber}`,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <Img src={staticFile(BELL_ID)} style={{width: 150, height: 150, objectFit: 'cover', borderRadius: 16}} />
        <div style={{flex: 1}}>
          <div style={{...labelStyle(18), color: C.amber}}>Chase standings after Gateway</div>
          <div style={{fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 10}}>
            Christopher Bell
          </div>
          <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6}}>No. 20 · Joe Gibbs Racing</div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '10px 20px',
            borderRadius: 14,
            background: C.amberDim,
            opacity: g,
            transform: `scale(${0.8 + 0.2 * g})`,
          }}
        >
          <div style={numStyle(64, C.amber)}>P3</div>
          <div style={{...labelStyle(14), color: C.amber, marginTop: 6}}>Points</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <IdCard />
    <Sequence from={0} durationInFrames={70} layout="none">
      <Caption text="Christopher Bell DROPPED TO THIRD in the standings" outAt={62} fontSize={48} />
    </Sequence>
    <Sequence from={70} durationInFrames={70} layout="none">
      <Caption text="after getting caught in Gateway's LATE-RACE CHAOS." outAt={62} fontSize={48} />
    </Sequence>
  </>
);
