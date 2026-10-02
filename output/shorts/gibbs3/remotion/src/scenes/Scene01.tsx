import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {GIBBS_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 140; // 0.00 -> 4.68s

const CUT_FRAMES = [44, 44, 52];

// The card lands on "Ty Gibbs" (0.00s), the P18 chip on "18th" (2.30s, f69). Complete at 78, so
// out0 = 78 + 30.
const CHIP_AT = 66;
const CARD_WIN: Win = [4, 16, 108, 134];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Who Gibbs is, and where he finished. */
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
          borderLeft: `5px solid ${C.red}`,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <Img src={staticFile(GIBBS_ID)} style={{width: 150, height: 150, objectFit: 'cover', borderRadius: 16}} />
        <div style={{flex: 1}}>
          <div style={{...labelStyle(18), color: C.red}}>Enjoy Illinois 300 · Gateway</div>
          <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 10}}>
            Ty Gibbs
          </div>
          <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6}}>No. 54 · Joe Gibbs Racing</div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '10px 20px',
            borderRadius: 14,
            background: C.redDim,
            opacity: g,
            transform: `scale(${0.8 + 0.2 * g})`,
          }}
        >
          <div style={numStyle(64, C.red)}>P18</div>
          <div style={{...labelStyle(14), color: C.red, marginTop: 6}}>Finish</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <IdCard />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="Ty Gibbs had a ROUGH GATEWAY RACE," outAt={54} fontSize={52} />
    </Sequence>
    <Sequence from={60} durationInFrames={80} layout="none">
      <Caption text="finishing 18TH after getting caught in the LATE CHAOS." outAt={72} fontSize={48} />
    </Sequence>
  </>
);
