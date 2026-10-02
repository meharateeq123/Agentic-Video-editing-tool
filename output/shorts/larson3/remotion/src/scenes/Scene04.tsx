import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 138; // 7.76 -> 12.36s

const CUT_FRAMES = [50, 88];

// "9 points" is said at 8.94s = scene frame 35. Rows land at 30 and 38, the gap tag at 46 —
// complete at 46, so out0 = 46 + 30.
const CARD_WIN: Win = [18, 30, 76, 92];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{pos: string; name: string; tag: string; accent: string; k: number}> = ({pos, name, tag, accent, k}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: '18px 0',
      opacity: k,
      transform: `translateX(${(1 - k) * -28}px)`,
    }}
  >
    <div style={{...numStyle(64, accent), width: 90}}>{pos}</div>
    <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.text, letterSpacing: -1.5, flex: 1}}>{name}</div>
    <div style={{...labelStyle(20), color: accent}}>{tag}</div>
  </div>
);

/** Chase standings after Gateway (NASCAR.com recap). */
const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const gapK = rowIn(frame, 34);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1040, width: 860, ...cardStyle({radius: 20, pad: 30})}}>
        <div style={{...labelStyle(18), color: C.muted}}>Chase standings — after Gateway</div>
        <div style={{marginTop: 8}}>
          <Row pos="1" name="Denny Hamlin" tag="Leader" accent={C.red} k={rowIn(frame, 18)} />
          <div style={{height: 1, background: C.hairline}} />
          <Row
            pos="2"
            name="Kyle Larson"
            tag=""
            accent={C.amber}
            k={rowIn(frame, 26)}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 30,
            bottom: 38,
            opacity: gapK,
            transform: `scale(${0.8 + 0.2 * gapK})`,
            ...numStyle(58, C.amber),
          }}
        >
          −9 pts
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3} />
    <StandingsCard />
    <Caption text="Larson is now just 9 POINTS behind Denny Hamlin in the NASCAR championship battle." outAt={S04_DUR - 4} fontSize={42} />
  </>
);
