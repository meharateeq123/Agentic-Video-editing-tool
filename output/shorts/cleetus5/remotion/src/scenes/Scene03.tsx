import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, capStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 98; // 8.21 -> 11.45s

const CUT_FRAMES = [50, 48];

// "race as him" is said at 9.58s = scene frame 41. Tiles land at 34, 42, 50 - complete at 62,
// so out0 = 62 + 30.
const TILE_AT = [34, 42, 50];
const CARD_WIN: Win = [22, 34, 92, 104];

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
    <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.amber, letterSpacing: -1}}>{big}</div>
    <div style={{...labelStyle(17), color: C.text, marginTop: 10}}>{small}</div>
  </div>
);

/** The three series you can race as Cleetus in NASCAR 26. */
const SeriesCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1000, width: 860, ...cardStyle({radius: 22, pad: 26})}}>
        <div style={{...labelStyle(18), color: C.muted}}>Race as Cleetus in NASCAR 26</div>
        <div style={{display: 'flex', gap: 14, marginTop: 18}}>
          <Tile big="ARCA" small="Menards Series" k={tileIn(frame, TILE_AT[0])} />
          <Tile big="TRUCKS" small="Craftsman Series" k={tileIn(frame, TILE_AT[1])} />
          <Tile big="O'REILLY" small="Auto Parts Series" k={tileIn(frame, TILE_AT[2])} />
        </div>
        <div style={{...capStyle(22), marginTop: 16, opacity: tileIn(frame, TILE_AT[2])}}>Sept 18 · PS5 · Xbox Series X|S · PC</div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={8} dim={0.25} />
    <SeriesCard />
    <Caption text="...but now fans can actually RACE AS HIM in a NASCAR game." outAt={S03_DUR - 4} fontSize={44} />
  </>
);
