import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 76; // 2.88 -> 5.40s

// Rows land at 18 and 24; the card is complete at 24, so out0 = 24 + 30.
const CARD_WIN: Win = [6, 18, 54, 70];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{pos: string; name: string; time: string; accent: string; k: number}> = ({pos, name, time, accent, k}) => (
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
    <div style={{...numStyle(64, accent), width: 110}}>{pos}</div>
    <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.text, letterSpacing: -1.5, flex: 1}}>{name}</div>
    <div style={{...numStyle(40, C.muted)}}>{time}</div>
  </div>
);

/** The front row, from the official qualifying times. Sits low, under Logano's face. */
const FrontRowCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1060, width: 860, ...cardStyle({radius: 20, pad: 30})}}>
        <div style={{...labelStyle(18), color: C.amber}}>Front row — Enjoy Illinois 300</div>
        <div style={{marginTop: 8}}>
          <Row pos="P1" name="Joey Logano" time="32.817s" accent={C.amber} k={rowIn(frame, 6)} />
          <div style={{height: 1, background: C.hairline}} />
          <Row pos="P2" name="Kyle Larson" time="33.093s" accent={C.steel} k={rowIn(frame, 12)} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <SceneBed {...SCENE2_CUTS[0]} dur={S02_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={10} dim={0.25} />
    <FrontRowCard />
    <Caption text="...pole sitter JOEY LOGANO in today's race." outAt={S02_DUR - 4} fontSize={44} />
  </>
);
