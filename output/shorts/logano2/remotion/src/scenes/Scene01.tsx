import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {LOGANO_ID, SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 192; // 0.00 -> 6.40s

const CUT_FRAMES = [45, 75, 72];

// Each stat lands as it is said: "pole" 0.98s (f29), "stage" 2.02s (f61), "96" 2.94s (f88).
// Last tile complete at 97, so out0 = 97 + 30.
const TILE_AT = [26, 58, 85];
const CARD_WIN: Win = [4, 16, 127, 143];

const tileIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Tile: React.FC<{big: string; small: string; k: number}> = ({big, small, k}) => (
  <div
    style={{
      flex: 1,
      padding: '18px 10px',
      borderRadius: 14,
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${C.hairline}`,
      textAlign: 'center',
      opacity: k,
      transform: `translateY(${(1 - k) * 18}px) scale(${0.92 + 0.08 * k})`,
    }}
  >
    <div style={numStyle(56, C.amber)}>{big}</div>
    <div style={{...labelStyle(16), color: C.text, marginTop: 10}}>{small}</div>
  </div>
);

/** Who he is, then the three things he did — each one as the VO says it. */
const DominanceCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1010, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.amber}`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <Img src={staticFile(LOGANO_ID)} style={{width: 118, height: 118, objectFit: 'cover', borderRadius: 14}} />
          <div>
            <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05}}>Joey Logano</div>
            <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 8}}>No. 22 Team Penske Ford — Gateway</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: 14, marginTop: 22}}>
          <Tile big="P1" small="Started" k={tileIn(frame, TILE_AT[0])} />
          <Tile big="S1" small="Stage win" k={tileIn(frame, TILE_AT[1])} />
          <Tile big="96" small="Laps led" k={tileIn(frame, TILE_AT[2])} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={10} dim={0.25} />
    <DominanceCard />
    <Sequence from={0} durationInFrames={120} layout="none">
      <Caption text="Logano started on POLE, won the first stage and led 96 LAPS." outAt={112} fontSize={42} />
    </Sequence>
    <Sequence from={122} durationInFrames={80} layout="none">
      <Caption text="Everything looked PERFECT for a huge victory..." outAt={66} fontSize={46} />
    </Sequence>
  </>
);
