import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 208; // 5.02 -> 11.97s

const CUT_FRAMES = [50, 70, 58, 30];

// "lap 155" starts at 5.64s (f19); "right front brake rotor" at 7.54s (f76). Complete at 88, so
// out0 = 88 + 30.
const LAP_AT = 20;
const ROTOR_AT = 76;
const CARD_WIN: Win = [8, 20, 118, 144];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** When and what failed. */
const FailureCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const lap = ease(frame, LAP_AT);
  const rotor = ease(frame, ROTOR_AT);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 960, width: 860, ...cardStyle({radius: 22, pad: 28}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.red}}>No. 12 · Ryan Blaney</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 12, opacity: lap, transform: `translateX(${(1 - lap) * -26}px)`}}>
          <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.muted}}>Lap</div>
          <div style={numStyle(110, C.text)}>155</div>
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: `1px solid ${C.hairline}`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: rotor,
            transform: `translateX(${(1 - rotor) * -26}px)`,
          }}
        >
          <div style={{width: 18, height: 18, borderRadius: 9, background: C.red, boxShadow: `0 0 18px ${C.red}`}} />
          <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1}}>Right-front brake rotor fails</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <FailureCard />
    <Sequence from={0} durationInFrames={70} layout="none">
      <Caption text="Then, on LAP 155," outAt={60} fontSize={56} />
    </Sequence>
    <Sequence from={70} durationInFrames={60} layout="none">
      <Caption text="his right-front BRAKE ROTOR FAILED," outAt={52} fontSize={50} />
    </Sequence>
    <Sequence from={130} durationInFrames={78} layout="none">
      <Caption text="sending DEBRIS through the hood and forcing him INTO THE WALL." outAt={70} fontSize={46} />
    </Sequence>
  </>
);
