import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 323; // 3.21 -> 13.98s
export const S02_CUTS = [90, 80, 80, 73];

// "10.62" lands at 5.78s = scene frame 77; "21.47" at 9.00s = frame 174; "third...all-time" at
// 12.42s = frame 276. The card box only fades in right before the first tile pops (not at scene
// start) and fades out ~1s after the last tile finishes, well before the scene cut.
export const S02_TILES_AT = [77, 174, 276];
const CARD_WIN: Win = [67, 77, 300, 313];

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
      <div style={numStyle(44, color)}>{big}</div>
      <div style={{...labelStyle(14), color: C.text, marginTop: 8}}>{small}</div>
    </div>
  );
};

const StatsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 90, top: 1000, width: 900, ...cardStyle({radius: 22, pad: 24}), borderLeft: `5px solid ${C.emerald}`}}>
        <div style={{...labelStyle(18), color: C.muted}}>Budapest — World Athletics</div>
        <div style={{display: 'flex', gap: 12, marginTop: 14}}>
          <Tile big="10.62" small="100m" color={C.emerald} frame={frame} at={S02_TILES_AT[0]} />
          <Tile big="21.47" small="200m" color={C.emerald} frame={frame} at={S02_TILES_AT[1]} />
          <Tile big="#3" small="All-Time" color={C.amber} frame={frame} at={S02_TILES_AT[2]} />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[CARD_WIN]} amp={0.08} maxBlur={8} dim={0.24} />
    <StatsCard />
    <Caption
      text="100m in 10.62. Then an incredible 21.47 in the 200m — third on the world all-time list."
      outAt={S02_DUR - 8}
      fontSize={34}
    />
  </>
);
