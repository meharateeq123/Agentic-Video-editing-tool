import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease, hexA} from '../components/base';
import {Pin, PinLabel, Route, USMap} from '../components/Maps';
import {TRACKS, US_OPTS, flat} from '../geo';
import {bed} from '../footage';

export const S25_DUR = 189; // 324.92 -> 335.64s (film ends)

const BERLIN = flat(TRACKS.berlin.ll, US_OPTS);
const DAYTONA = flat(TRACKS.daytona.ll, US_OPTS);

/**
 * Scene 25 — the close. The clip runs to the last frame of the film. The
 * road to Daytona draws over it, then recedes; the blur lifts, the frame
 * settles into a held wide shot on the last line, and the picture fades.
 */
const W: Win = [34, 59, 132, 154];

export const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const draw = ease(g, 2, 54);
  const dayK = ease(g, 12, 52);
  const dayL = ease(g, 24, 66);
  const berK = ease(g, 52, 96);
  const berL = ease(g, 64, 110);
  const route = ease(g, 96, 168);
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.09);

  // the ending: a slow, unbroken settle out to a wide frame, then the fade
  const fade = interpolate(frame, [268, 318], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.7, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBed {...bed(25)} dur={S25_DUR} wins={[W]} accent={C.amber} amp={0.13} maxBlur={16} dim={0.34}>
      <Overlay k={winK(frame, W)} rise={12}>
        <USMap opts={US_OPTS} draw={draw}>
          <Route
            pts={[BERLIN, DAYTONA]}
            k={route}
            color={C.amber}
            width={4}
            bow={0.46}
            march={frame * 1.1}
          />
          {dayK > 0 ? <Pin x={DAYTONA.x} y={DAYTONA.y} k={dayK} color={C.amber} /> : null}
          {berK > 0 ? (
            <>
              <circle
                cx={BERLIN.x}
                cy={BERLIN.y}
                r={16 + pulse * 30}
                fill="none"
                stroke={hexA(C.amber, 0.4 * (1 - pulse) * berK)}
                strokeWidth={2}
              />
              <Pin x={BERLIN.x} y={BERLIN.y} k={berK} color={C.amber} />
            </>
          ) : null}
        </USMap>
        <PinLabel x={DAYTONA.x} y={DAYTONA.y} k={dayL} text="Daytona" sub="The goal" align="right" />
        <PinLabel
          x={BERLIN.x}
          y={BERLIN.y}
          k={berL}
          text="Berlin Raceway"
          sub="Short tracks in Michigan"
          align="left"
        />
      </Overlay>

      <AbsoluteFill style={{backgroundColor: '#000', opacity: fade, pointerEvents: 'none'}} />
    </SceneBed>
  );
};

