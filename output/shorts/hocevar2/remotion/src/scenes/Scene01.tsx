import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {HOCEVAR_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop} from './pop';

export const S01_DUR = 159; // 0.00 -> 5.30s
export const S01_CUTS = [40, 40, 40, 39];

// The card pops on "Carson Hocevar" (0.00s) and settles at 16, so out0 = 16 + 30.
export const S01_POPS = [2];
const CARD_WIN: Win = [2, 8, 46, 72];

/** Who Hocevar is. */
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
          borderLeft: `6px solid ${C.steel}`,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          opacity: p.k,
          transform: `scale(${p.s})`,
          transformOrigin: 'left center',
        }}
      >
        <Img src={staticFile(HOCEVAR_ID)} style={{width: 160, height: 160, objectFit: 'cover', borderRadius: 18}} />
        <div>
          <div style={{...labelStyle(18), color: C.steel}}>Enjoy Illinois 300 · Gateway</div>
          <div style={{fontFamily: FONT, fontSize: 56, fontWeight: 900, color: C.text, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 10}}>
            Carson Hocevar
          </div>
          <div style={{fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6}}>No. 77 · Spire Motorsports</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <IdCard />
    <Sequence from={0} durationInFrames={90} layout="none">
      <Caption text="Carson Hocevar survived ABSOLUTE CHAOS at Gateway" inAt={0} outAt={82} fontSize={52} />
    </Sequence>
    <Sequence from={90} durationInFrames={69} layout="none">
      <Caption text="and still came away with a HUGE RESULT." outAt={56} fontSize={54} />
    </Sequence>
  </>
);
