import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S02_DUR = 174; // 3.30 -> 9.10s
export const S02_CUTS = [45, 45, 42, 42];

// "brake rotor failed" at 3.58s (f8): the card pops. "31st" at 6.60s (f99): P31 slams in and
// settles at 109, so out0 = 109 + 30.
export const S02_POPS = [8];
export const S02_SLAM_AT = 99;
const CARD_WIN: Win = [6, 12, 139, 165];

/** What failed, and where it left him. */
const FailureCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const p = pop(frame, S02_POPS[0]);
  const s = slam(frame, S02_SLAM_AT);
  return (
    <Overlay k={k} rise={0}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 920,
          width: 860,
          ...cardStyle({radius: 24, pad: 30}),
          borderLeft: `6px solid ${C.red}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: p.k,
          transform: `scale(${p.s})`,
          transformOrigin: 'left center',
        }}
      >
        <div>
          <div style={{...labelStyle(18), color: C.red}}>No. 9 · Lap 214</div>
          <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 900, color: C.text, letterSpacing: -1.2, lineHeight: 1.05, marginTop: 10}}>
            Brake rotor
            <br />
            failure
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '14px 24px',
            borderRadius: 18,
            background: C.redDim,
            border: `2px solid ${C.red}`,
            opacity: s.k,
            transform: `scale(${s.s})`,
          }}
        >
          <div style={numStyle(96, C.red)}>P31</div>
          <div style={{...labelStyle(16), color: C.red, marginTop: 6}}>Finish</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <FailureCard />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="His BRAKE ROTOR FAILED," outAt={38} fontSize={62} />
    </Sequence>
    <Sequence from={46} durationInFrames={54} layout="none">
      <Caption text="ending his race and dropping him all the way to" outAt={48} fontSize={50} />
    </Sequence>
    <Sequence from={98} durationInFrames={20} layout="none">
      <Caption text="31ST." inAt={0} outAt={14} fontSize={80} />
    </Sequence>
    <Sequence from={118} durationInFrames={56} layout="none">
      <Caption text="And this WASN'T an ISOLATED PROBLEM." outAt={46} fontSize={56} />
    </Sequence>
  </>
);
