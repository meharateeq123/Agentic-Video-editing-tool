import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {HAMLIN_ID, LARSON_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 192; // 0.00 -> 6.40s

const CUT_FRAMES = [64, 92, 36];

// Hamlin's row lands on "Hamlin's" (2.02s, f61), Larson's on "cut" (3.72s, f112), the gap chip on
// "nine" (4.30s, f129). Complete at 138, so out0 = 138 + 30.
const HAMLIN_AT = 50;
const LARSON_AT = 100;
const GAP_AT = 126;
const CARD_WIN: Win = [40, 52, 168, 180];

const ease = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{pos: string; photo: string; name: string; pts: string; k: number; hot?: boolean; first?: boolean; children?: React.ReactNode}> = ({
  pos,
  photo,
  name,
  pts,
  k,
  hot,
  first,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '16px 0',
      borderTop: first ? 'none' : `1px solid ${C.hairline}`,
      opacity: k,
      transform: `translateX(${(1 - k) * -26}px)`,
    }}
  >
    <div style={{...numStyle(52, hot ? C.amber : C.muted), width: 44}}>{pos}</div>
    <Img src={staticFile(photo)} style={{width: 104, height: 104, objectFit: 'cover', borderRadius: 14}} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1.5, lineHeight: 1.05}}>{name}</div>
      <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.muted, marginTop: 6}}>{pts} pts</div>
    </div>
    {children}
  </div>
);

/** Top two in the Chase after Gateway, and the gap between them. */
const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const g = ease(frame, GAP_AT);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 940, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>Chase standings after Gateway</div>
        <div style={{marginTop: 8}}>
          <Row first hot pos="1" photo={HAMLIN_ID} name="Denny Hamlin" pts="2,168" k={ease(frame, HAMLIN_AT)} />
          <Row pos="2" photo={LARSON_ID} name="Kyle Larson" pts="2,159" k={ease(frame, LARSON_AT)}>
            <div
              style={{
                ...numStyle(58, C.amber),
                padding: '8px 18px',
                borderRadius: 14,
                background: C.amberDim,
                opacity: g,
                transform: `scale(${0.8 + 0.2 * g})`,
              }}
            >
              −9
            </div>
          </Row>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <GapCard />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="After Kyle Larson WON GATEWAY," outAt={52} fontSize={50} />
    </Sequence>
    <Sequence from={60} durationInFrames={98} layout="none">
      <Caption text="Hamlin's championship lead has been cut to just NINE POINTS." outAt={90} fontSize={44} />
    </Sequence>
    <Sequence from={160} durationInFrames={32} layout="none">
      <Caption text="That's a MASSIVE change" outAt={28} fontSize={52} />
    </Sequence>
  </>
);
