import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {StatCard} from '../components/DataViz';
import {Pin, PinLabel, Route, USMap} from '../components/Maps';
import {TRACKS, flat} from '../geo';
import {bed} from '../footage';

export const S19_DUR = 512; // 226.41 -> 244.73s

// Framed so the whole country stays inside the 6% safe area while the three
// tracks still sit large enough to read.
const OPTS = {lon0: -95, lat0: 37, scale: 30, cx: 900, cy: 520};

const P = {
  rock: flat(TRACKS.rockingham.ll, OPTS),
  tally: flat(TRACKS.talladega.ll, OPTS),
  nash: flat(TRACKS.nashville.ll, OPTS),
};

/**
 * Scene 19 — the O'Reilly year as a route: a rough debut at Rockingham, a
 * denied entry at Talladega, then approval for Nashville. Drawn over the
 * clip, which comes back sharp for the "keeps getting invited back" line.
 */
const W: Win = [24, 63, 430, 467];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const draw = ease(g, 2, 62);
  const rockK = ease(g, 30, 74);
  const rockL = ease(g, 42, 86);
  const lapsK = ease(g, 104, 150);
  const lapsOut = ease(g, 176, 224);
  const r1 = ease(g, 190, 254);
  const tallyK = ease(g, 222, 266);
  const tallyL = ease(g, 240, 288);
  const r2 = ease(g, 310, 384);
  const nashK = ease(g, 350, 396);
  const nashL = ease(g, 368, 414);

  return (
    <SceneBed {...bed(19)} dur={S19_DUR} wins={[W]} accent={C.steel} amp={0.09} maxBlur={17} dim={0.36}>
      <Overlay k={winK(frame, W)} rise={12}>
        <USMap opts={OPTS} draw={draw}>
          <Route pts={[P.rock, P.tally]} k={r1} color={C.red} width={3.5} march={frame * 0.9} />
          <Route pts={[P.tally, P.nash]} k={r2} color={C.emerald} width={3.5} march={frame * 0.9} />
          {rockK > 0 ? <Pin x={P.rock.x} y={P.rock.y} k={rockK} color={C.amber} /> : null}
          {tallyK > 0 ? <Pin x={P.tally.x} y={P.tally.y} k={tallyK} color={C.red} /> : null}
          {nashK > 0 ? <Pin x={P.nash.x} y={P.nash.y} k={nashK} color={C.emerald} /> : null}
        </USMap>

        <PinLabel
          x={P.rock.x}
          y={P.rock.y}
          k={rockL}
          text="Rockingham"
          sub="O'Reilly Series debut"
          align="right"
        />
        <PinLabel
          x={P.tally.x}
          y={P.tally.y}
          k={tallyL}
          text="Talladega"
          sub="Request denied"
          align="left"
          color={C.red}
          strike
        />
        <PinLabel
          x={P.nash.x}
          y={P.nash.y}
          k={nashL}
          text="Nashville"
          sub="Approved for the race"
          align="left"
          color={C.emerald}
        />

        <div style={{opacity: 1 - lapsOut * 0.94}}>
          <StatCard
            label="Finished"
            value={
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 116,
                  fontWeight: 800,
                  color: C.red,
                  letterSpacing: -4,
                  lineHeight: 1,
                }}
              >
                −6 laps
              </span>
            }
            caption="Spun multiple times."
            k={lapsK}
            accent={C.red}
            x={168}
            y={690}
            width={520}
          />
        </div>
      </Overlay>
    </SceneBed>
  );
};

