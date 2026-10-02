import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 177; // 9.12 -> 15.02s
export const S03_CUTS = [177];

// "25th" lands at 10.8s = scene frame 50; "42" at 11.54s = frame 73. The card holds through
// "Bristol could give him a chance to recover" and falls compressed into the scene's own tail.
export const S03_TILES_AT = [38, 61];
const CARD_WIN: Win = [4, 16, 165, 177];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

const Tile: React.FC<{big: string; small: string; color: string; frame: number; at: number}> = ({big, small, color, frame, at}) => {
  const p = pop(frame, at);
  return (
    <div
      style={{
        flex: 1,
        padding: '18px 10px',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${C.hairline}`,
        textAlign: 'center',
        opacity: p.k,
        transform: `scale(${p.s})`,
      }}
    >
      <div style={numStyle(56, color)}>{big}</div>
      <div style={{...labelStyle(16), color: C.text, marginTop: 10}}>{small}</div>
    </div>
  );
};

const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1010, width: 860, ...cardStyle({radius: 22, pad: 26}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.muted}}>Chase Standings — Gateway</div>
        <div style={{display: 'flex', gap: 14, marginTop: 16}}>
          <Tile big="P25" small="Finish" color={C.red} frame={frame} at={S03_TILES_AT[0]} />
          <Tile big="-42" small="Behind Hamlin" color={C.amber} frame={frame} at={S03_TILES_AT[1]} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={12} dim={0.3} />
    <StandingsCard />
    <Caption
      text="Reddick finished just 25TH — 42 POINTS behind Hamlin. But Bristol could give him a chance."
      outAt={S03_DUR - 4}
      fontSize={38}
    />
  </>
);
