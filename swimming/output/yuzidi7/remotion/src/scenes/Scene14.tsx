import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {Globe, Pin, PinLabel, Route} from '../components/Maps';
import {ortho} from '../geo';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * McIntosh trains under Bob Bowman, Michael Phelps's longtime coach, since moving to Texas in 2025.
 * A brief (~6s) globe beat over the footage shows the Toronto -> Austin move - the film's one map
 * beat (swimming/CLAUDE.md rule 4: a map is a beat, never a whole scene).
 */
const ID_W: Win = [10, 42, 760, 786];
const GLOBE_W: Win = [210, 240, 390, 416];

const TORONTO: [number, number] = [-79.4, 43.7];
const AUSTIN: [number, number] = [-97.7, 30.3];
const CENTER: [number, number] = [-88, 38];
const R = 190;
const CX = 1350;
const CY = 430;

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const gk = winK(frame, GLOBE_W);
  const [g0] = GLOBE_W;
  const t = Math.max(0, frame - g0);
  const pinA = Math.min(1, t / 20);
  const routeK = Math.max(0, Math.min(1, (t - 16) / 30));
  const pinB = Math.max(0, Math.min(1, (t - 40) / 20));

  const a = ortho(TORONTO, CENTER, R, CX, CY);
  const b = ortho(AUSTIN, CENTER, R, CX, CY);

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[ID_W, GLOBE_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/bowman.jpg"
        name="Bob Bowman"
        affiliation="Coach · guided Michael Phelps's entire career"
        focus={[50, 35]}
        zoom={1.2}
        win={ID_W}
      />
      <Overlay k={gk} rise={16}>
        <Globe center={CENTER} radius={R} cx={CX} cy={CY} frame={frame} />
        {a ? <Pin x={a.x} y={a.y} k={pinA} color={C.steel} /> : null}
        {a ? <PinLabel x={a.x} y={a.y} k={pinA} text="Toronto" align="left" color={C.steel} /> : null}
        {a && b ? <Route pts={[a, b]} k={routeK} color={C.amber} /> : null}
        {b ? <Pin x={b.x} y={b.y} k={pinB} color={C.amber} /> : null}
        {b ? <PinLabel x={b.x} y={b.y} k={pinB} text="Austin, Texas" sub="Bob Bowman's group" align="right" color={C.amber} /> : null}
      </Overlay>
    </BedChain>
  );
};
