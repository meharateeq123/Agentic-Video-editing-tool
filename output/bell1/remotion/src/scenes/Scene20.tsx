import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import type {Win} from '../components/Bed';
import {USMap, Route, Pin, PinLabel, type FlatOpts} from '../components/Maps';
import {TRACKS, flat} from '../geo';
import {ease, band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20 — "The Chase moves to Round 2 this weekend at World Wide Technology Raceway at Gateway,
 * with Hamlin as the defending winner there."
 *
 * The film's second map moment, and deliberately not the globe: scene 3 already flew down to
 * Darlington from orbit, and repeating that move would make the two read as the same beat. This one
 * is the flat route map — where the story has been, and where it goes next — which is the shape of
 * the line anyway.
 */
const W: Win = [30, 66, 460, 500];

const OPTS: FlatOpts = {lon0: -96, lat0: 37, scale: 32, cx: 900, cy: 540};

const D = flat(TRACKS.darlington.ll, OPTS);
const G = flat(TRACKS.gateway.ll, OPTS);

export const Scene20: React.FC = () => {
  const frame = useCurrentFrame();

  const present = band(frame, W[0], W[1], W[2], W[3]);
  const draw = ease(frame, 40, 180);
  const kD = ease(frame, 170, 216);
  const route = ease(frame, 232, 320);
  const kG = ease(frame, 300, 348);

  return (
    <BedChain segs={chain(20)} dur={S20_DUR} wins={[W]} amp={0.07} maxBlur={17} dim={0.56}>
      <AbsoluteFill style={{opacity: present}}>
        <USMap opts={OPTS} draw={draw}>
          <Route pts={[D, G]} k={route} color={C.amber} march={frame * 0.7} />
          <Pin x={D.x} y={D.y} k={kD} color={C.emerald} scale={1.5} />
          <Pin x={G.x} y={G.y} k={kG} color={C.amber} scale={1.5} />
        </USMap>
        <PinLabel x={D.x} y={D.y} k={kD} text="Darlington" sub="Round 1 — Bell wins" align="right" />
        <PinLabel x={G.x} y={G.y} k={kG} text="Gateway" sub="Round 2 — Hamlin defending" align="left" dy={-46} />
      </AbsoluteFill>
    </BedChain>
  );
};
