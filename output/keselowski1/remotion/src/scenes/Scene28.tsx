import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {USMap, Route, Pin, PinLabel, type FlatOpts} from '../components/Maps';
import {TRACKS, flat} from '../geo';
import {ease, band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S28_DUR = mountedFrames(28);

/**
 * Scene 28 - "The Cup Series now heads to World Wide Technology Raceway at Gateway for Round 2 of
 * the Chase, putting Hocevar and Keselowski back on the same track just days after this exchange."
 *
 * The map is a six-second beat, not the scene - it draws over the Gateway drone footage, clears
 * well before the cut, and the rest of the scene belongs to the line about Round 2.
 */
const MAP: Win = [20, 44, 160, 194];
const TEXT: Win = [230, 262, 470, 500];

const OPTS: FlatOpts = {lon0: -96, lat0: 37, scale: 30, cx: 960, cy: 520};

const D = flat(TRACKS.darlington.ll, OPTS);
const G = flat(TRACKS.gateway.ll, OPTS);

export const Scene28: React.FC = () => {
  const frame = useCurrentFrame();

  const mapK = band(frame, MAP[0], MAP[1], MAP[2], MAP[3]);
  const draw = ease(frame, 26, 92);
  const kD = ease(frame, 44, 76);
  const route = ease(frame, 72, 132);
  const kG = ease(frame, 112, 144);

  const textK = winK(frame, TEXT);
  const g = ease(frame, TEXT[0], TEXT[0] + 28);

  return (
    <BedChain segs={chain(28)} dur={S28_DUR} wins={[MAP, TEXT]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={mapK} rise={0}>
        <USMap opts={OPTS} draw={draw}>
          <Route pts={[D, G]} k={route} color={C.amber} march={frame * 0.7} />
          <Pin x={D.x} y={D.y} k={kD} color={C.steel} scale={1.4} />
          <Pin x={G.x} y={G.y} k={kG} color={C.amber} scale={1.4} />
        </USMap>
        <PinLabel x={D.x} y={D.y} k={kD} text="Darlington" sub="Round 1 - the incident" align="right" />
        <PinLabel x={G.x} y={G.y} k={kG} text="Gateway" sub="Round 2 - days later" align="left" dy={-46} />
      </Overlay>

      <Overlay k={textK} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 420, width: 1920, textAlign: 'center', opacity: g}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.2,
              lineHeight: 1.2,
            }}
          >
            Round 2 of the Chase.
          </div>
          <div style={{fontFamily: FONT, fontSize: 27, fontWeight: 500, color: C.muted, marginTop: 14}}>
            Hocevar and Keselowski, back on the same track - days after this exchange.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
