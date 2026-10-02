import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {USMap, Route, Pin, PinLabel, type FlatOpts} from '../components/Maps';
import {TRACKS, flat} from '../geo';
import {ease, band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11); // 1004f, 6 links

/**
 * Scene 11 — "He continued running ARCA… delivered that near-miss runner-up finish at Talladega,
 * and expanded into NASCAR's higher touring divisions… his Craftsman Truck Series debut at
 * Daytona, and… select O'Reilly Auto Parts Series races, debuting at Rockingham."
 *
 * Three named tracks in one paragraph, so this is the film's route map: the country draws in,
 * then each stop lands as it is spoken and a line connects it to the last. Deliberately the flat
 * map rather than the globe used in scene 10 — the point here is the spread of a season, not a
 * place on a planet.
 *
 * The map comes back three times rather than sitting there for the whole scene. It used to hold
 * for thirty seconds straight, which meant thirty seconds of blurred, dimmed footage behind a
 * mostly-still graphic — the user called it dead. Now it appears for about four seconds per
 * track, drops that track's pin, and leaves, so the footage underneath comes back sharp in
 * between and the last twelve seconds play with no overlay at all.
 */
const WT: Win = [130, 160, 250, 285]; // Talladega, as it is named
const WD: Win = [300, 330, 420, 455]; // Daytona
const WR: Win = [475, 505, 600, 635]; // Rockingham

const OPTS: FlatOpts = {lon0: -96, lat0: 37, scale: 32, cx: 900, cy: 540};

const T = flat(TRACKS.talladega.ll, OPTS);
const D = flat(TRACKS.daytona.ll, OPTS);
const R = flat(TRACKS.rockingham.ll, OPTS);

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  // Present whenever any of the three visits is on screen; the pins accumulate across them, so
  // the third visit shows the whole season's route rather than a lone pin.
  const present = Math.max(
    band(frame, WT[0], WT[1], WT[2], WT[3]),
    band(frame, WD[0], WD[1], WD[2], WD[3]),
    band(frame, WR[0], WR[1], WR[2], WR[3]),
  );
  const draw = ease(frame, 135, 230);

  const kT = ease(frame, 155, 195);
  const kD = ease(frame, 325, 365);
  const kR = ease(frame, 500, 540);

  const routeTD = ease(frame, 335, 410);
  const routeDR = ease(frame, 510, 590);

  return (
    <BedChain
      segs={chain(11)}
      dur={S11_DUR}
      wins={[WT, WD, WR]}
      amp={0.07}
      maxBlur={17}
      dim={0.56}
    >
      <AbsoluteFill style={{opacity: present}}>
        <USMap opts={OPTS} draw={draw}>
          <Route pts={[T, D]} k={routeTD} color={C.amber} march={frame * 0.7} />
          <Route pts={[D, R]} k={routeDR} color={C.steel} march={frame * 0.7} />
          <Pin x={T.x} y={T.y} k={kT} color={C.amber} scale={1.5} />
          <Pin x={D.x} y={D.y} k={kD} color={C.red} scale={1.5} />
          <Pin x={R.x} y={R.y} k={kR} color={C.steel} scale={1.5} />
        </USMap>
        <PinLabel x={T.x} y={T.y} k={kT} text="Talladega" sub="ARCA — 2nd" align="left" />
        <PinLabel x={D.x} y={D.y} k={kD} text="Daytona" sub="Truck Series debut" align="right" />
        <PinLabel x={R.x} y={R.y} k={kR} text="Rockingham" sub="O'Reilly Series debut" align="right" dy={-46} />
      </AbsoluteFill>
    </BedChain>
  );
};
