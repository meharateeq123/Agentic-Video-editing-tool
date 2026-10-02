import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {StatCard} from '../components/DataViz';
import {Pin, PinLabel, USMap} from '../components/Maps';
import {TRACKS, US_OPTS, flat} from '../geo';
import {bed} from '../footage';

export const S11_DUR = 607; // 120.06 -> 140.31s

/**
 * Scene 11 — the 2026 season, where the line actually names two places: a fourth at Pocono in
 * June, a tenth at Watkins Glen in May. A map with those two real, coordinate-placed pins reads
 * this line the way it's written, rather than a chart of years the line doesn't mention here.
 * The standings card still lands on "27th... missed the playoff field", which this scene's own
 * sentence states.
 */
const W: Win = [26, 60, 530, 578];

const POCONO = flat(TRACKS.pocono.ll, US_OPTS);
const GLEN = flat(TRACKS.watkinsGlen.ll, US_OPTS);

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const draw = ease(g, 6, 58);
  const pocK = ease(g, 70, 110);
  const pocL = ease(g, 84, 128);
  const glenK = ease(g, 140, 180);
  const glenL = ease(g, 154, 198);
  const stand = ease(g, 236, 286);

  return (
    <SceneBed {...bed(11)} dur={S11_DUR} wins={[W]} accent={C.red} amp={0.12} maxBlur={17} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 168,
            width: 1920,
            textAlign: 'center',
            opacity: draw,
            ...labelStyle(24),
          }}
        >
          United States
        </div>
        <USMap opts={US_OPTS} draw={draw}>
          {pocK > 0 ? <Pin x={POCONO.x} y={POCONO.y} k={pocK} color={C.emerald} /> : null}
          {glenK > 0 ? <Pin x={GLEN.x} y={GLEN.y} k={glenK} color={C.emerald} /> : null}
        </USMap>
        {/* The two tracks sit ~100mi apart in real life, close enough on this map that their
            labels would collide if both defaulted to "above the pin" — Pocono's is pushed down
            and left, Watkins Glen's stays above and moves further right, so they read as two
            distinct callouts instead of one merged block. */}
        <PinLabel
          x={POCONO.x}
          y={POCONO.y}
          k={pocL}
          text="Pocono"
          sub="4th — June"
          align="left"
          color={C.emerald}
          dy={96}
        />
        <PinLabel
          x={GLEN.x}
          y={GLEN.y}
          k={glenL}
          text="Watkins Glen"
          sub="10th — May"
          align="right"
          color={C.emerald}
          dy={-24}
        />

        <StatCard
          label="2026 standings"
          value={
            <span
              style={{
                fontFamily: FONT,
                fontSize: 108,
                fontWeight: 800,
                color: C.red,
                letterSpacing: -4,
                lineHeight: 1,
              }}
            >
              27th
            </span>
          }
          caption="Missed the 16-driver playoff field."
          k={stand}
          accent={C.red}
          x={1246}
          y={800}
          width={506}
        />
      </Overlay>
    </SceneBed>
  );
};
