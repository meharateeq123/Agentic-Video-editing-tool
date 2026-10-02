import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {ELLIOTT_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop} from './pop';

export const S01_DUR = 99; // 0.00 -> 3.30s
export const S01_CUTS = [50, 49];

// The card pops on "Chase Elliott" (0.00s) and settles at 16, so out0 = 16 + 30.
export const S01_POPS = [2];
const CARD_WIN: Win = [2, 8, 46, 72];

/** Who Elliott is. */
const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const p = pop(frame, S01_POPS[0]);
  return (
    <Overlay k={k} rise={0}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 960,
          width: 860,
          ...cardStyle({radius: 24, pad: 26}),
          borderLeft: `6px solid ${C.red}`,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          opacity: p.k,
          transform: `scale(${p.s})`,
          transformOrigin: 'left center',
        }}
      >
        <Img src={staticFile(ELLIOTT_ID)} style={{width: 160, height: 160, objectFit: 'cover', borderRadius: 18}} />
        <div>
          <div style={{...labelStyle(18), color: C.red}}>Enjoy Illinois 300 · Gateway</div>
          <div style={{fontFamily: FONT, fontSize: 56, fontWeight: 900, color: C.text, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 10}}>
            Chase Elliott
          </div>
          <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6}}>No. 9 · Hendrick Motorsports</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <IdCard />
    <Sequence from={0} durationInFrames={62} layout="none">
      <Caption text="Chase Elliott was running around 7TH at GATEWAY" inAt={0} outAt={56} fontSize={50} />
    </Sequence>
    <Sequence from={62} durationInFrames={37} layout="none">
      <Caption text="when DISASTER STRUCK." outAt={30} fontSize={64} />
    </Sequence>
  </>
);
