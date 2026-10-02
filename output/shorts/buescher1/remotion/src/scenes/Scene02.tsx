import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 248; // 3.18 -> 11.43s
export const S02_CUTS = [62, 62, 62, 62];

// "27th" lands at 6.56s = scene frame 101; "13th" at 8.74s = frame 167; "111" at 10.1s = frame
// 208. The card box itself only fades in right before the first tile pops (not at scene start,
// which left an empty label floating for ~2.4s) and holds through "behind Hamlin" before falling
// compressed into the scene's own tail.
export const S02_TILES_AT = [89, 155, 196];
const CARD_WIN: Win = [79, 89, 238, 248];

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
        padding: '16px 8px',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${C.hairline}`,
        textAlign: 'center',
        opacity: p.k,
        transform: `scale(${p.s})`,
      }}
    >
      <div style={numStyle(46, color)}>{big}</div>
      <div style={{...labelStyle(14), color: C.text, marginTop: 8}}>{small}</div>
    </div>
  );
};

const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 90, top: 1000, width: 900, ...cardStyle({radius: 22, pad: 24}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.muted}}>Chase Standings — Gateway</div>
        <div style={{display: 'flex', gap: 12, marginTop: 14}}>
          <Tile big="P27" small="Finish" color={C.red} frame={frame} at={S02_TILES_AT[0]} />
          <Tile big="P13" small="In Chase" color={C.amber} frame={frame} at={S02_TILES_AT[1]} />
          <Tile big="-111" small="Behind Hamlin" color={C.red} frame={frame} at={S02_TILES_AT[2]} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[CARD_WIN]} amp={0.08} maxBlur={8} dim={0.24} />
    <StandingsCard />
    <Caption
      text="A brake failure ended his race — 27TH, dropping him to 13TH, 111 points behind Hamlin."
      outAt={S02_DUR - 6}
      fontSize={34}
    />
  </>
);
