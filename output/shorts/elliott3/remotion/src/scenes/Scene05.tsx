import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S05_DUR = 119; // 15.50 -> 19.48s
export const S05_CUTS = [40, 40, 39];

// "Bristol" is said at 16.46s = scene frame 29, so the name slams in there; the two tiles pop at
// 40 / 46 and settle at 60, so out0 = 60 + 30.
export const S05_SLAM_AT = 29;
export const S05_POPS = [40, 46];
const CARD_WIN: Win = [24, 30, 90, 116];

/** What he has to recover at: the next race on the schedule. */
const NextCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const s = slam(frame, S05_SLAM_AT);
  const a = pop(frame, S05_POPS[0]);
  const b = pop(frame, S05_POPS[1]);
  const tile = {flex: 1, padding: '18px 22px', borderRadius: 20, background: 'rgba(255,255,255,0.07)'};
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 940, width: 860, ...cardStyle({radius: 24, pad: 26}), borderLeft: `6px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>Next race</div>
        <div style={{opacity: s.k, transform: `scale(${s.s})`, transformOrigin: 'left center', marginTop: 6}}>
          <div style={numStyle(96, C.text)}>BRISTOL</div>
          <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.muted, marginTop: 8}}>Night Race</div>
        </div>
        <div style={{display: 'flex', gap: 18, marginTop: 18}}>
          <div style={{...tile, opacity: a.k, transform: `scale(${a.s})`}}>
            <div style={numStyle(72, C.amber)}>500</div>
            <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.muted, marginTop: 6}}>Laps</div>
          </div>
          <div style={{...tile, opacity: b.k, transform: `scale(${b.s})`}}>
            <div style={numStyle(72, C.text)}>0.533</div>
            <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.muted, marginTop: 6}}>Miles, concrete</div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

// "or is his championship" starts at 17.04s = scene frame 46.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <NextCard />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="Can he RECOVER at BRISTOL," outAt={38} fontSize={60} />
    </Sequence>
    <Sequence from={46} durationInFrames={73} layout="none">
      <Caption text="or is his CHAMPIONSHIP FIGHT slipping away?" outAt={56} fontSize={54} />
    </Sequence>
  </>
);
