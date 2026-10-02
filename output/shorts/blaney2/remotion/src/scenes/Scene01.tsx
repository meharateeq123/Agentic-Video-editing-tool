import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {BLANEY_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 151; // 0.00 -> 5.02s

const CUT_FRAMES = [75, 76];

// The card lands on "Ryan Blaney" (0.08s), the P6 chip on "top six" (1.64s, f49). Complete at 64,
// so out0 = 64 + 30.
const CHIP_AT = 52;
const CARD_WIN: Win = [4, 16, 94, 120];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Who Blaney is, and where he was running. */
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
        <Img src={staticFile(BLANEY_ID)} style={{width: 150, height: 150, objectFit: 'cover', borderRadius: 16}} />
        <div style={{flex: 1}}>
          <div style={{...labelStyle(18), color: C.amber}}>Enjoy Illinois 300 · Gateway</div>
          <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 10}}>
            Ryan Blaney
          </div>
          <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6}}>No. 12 · Team Penske</div>
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
          <div style={numStyle(64, C.amber)}>P6</div>
          <div style={{...labelStyle(14), color: C.amber, marginTop: 6}}>Running</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <IdCard />
    <Sequence from={0} durationInFrames={72} layout="none">
      <Caption text="But Ryan Blaney was running inside the TOP SIX at GATEWAY" outAt={66} fontSize={48} />
    </Sequence>
    <Sequence from={74} durationInFrames={77} layout="none">
      <Caption text="...and looked set for a STRONG PLAYOFF FINISH." outAt={70} fontSize={50} />
    </Sequence>
  </>
);
