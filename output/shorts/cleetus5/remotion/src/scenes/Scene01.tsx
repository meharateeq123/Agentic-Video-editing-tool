import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {CLEETUS_ID, MCNUTT_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 172; // 0.00 -> 5.72s

const CUT_FRAMES = [70, 59, 43];

// Each driver lands as the VO reaches him: "featured" 2.00s (f60), "alongside Squirrel" 4.30s (f129).
// Last row complete at 142; the card starts out at 168 as the scene hands over.
const ROW_AT = [48, 130];
const CARD_WIN: Win = [36, 48, 168, 180];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{photo: string; name: string; sub: string; k: number; first?: boolean}> = ({
  photo,
  name,
  sub,
  k,
  first,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '16px 0',
      borderTop: first ? 'none' : `1px solid ${C.hairline}`,
      opacity: k,
      transform: `translateX(${(1 - k) * -26}px)`,
    }}
  >
    <Img src={staticFile(photo)} style={{width: 118, height: 118, objectFit: 'cover', borderRadius: 14}} />
    <div>
      <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05}}>{name}</div>
      <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 8}}>{sub}</div>
    </div>
  </div>
);

/** The two YouTube racers confirmed for NASCAR 26 - each one as the VO names him. */
const RosterCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 960, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>NASCAR 26 — out Sept 18</div>
        <div style={{marginTop: 8}}>
          <Row first photo={CLEETUS_ID} name="Cleetus McFarland" sub="ARCA · Truck Series · O'Reilly Series" k={rowIn(frame, ROW_AT[0])} />
          <Row photo={MCNUTT_ID} name="Squirrel McNutt" sub="No. 0 · ARCA Menards Series" k={rowIn(frame, ROW_AT[1])} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <RosterCard />
    <Sequence from={0} durationInFrames={128} layout="none">
      <Caption text="The famous YOUTUBE RACER is now officially featured in the upcoming NASCAR video game" outAt={120} fontSize={42} />
    </Sequence>
    <Sequence from={129} durationInFrames={43} layout="none">
      <Caption text="...alongside SQUIRREL MCNUTT." outAt={36} fontSize={50} />
    </Sequence>
  </>
);
