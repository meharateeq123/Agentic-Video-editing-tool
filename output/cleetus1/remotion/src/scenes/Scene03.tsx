import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {Globe, PlacePlate} from '../components/Maps';
import {TRACKS} from '../geo';
import {bed} from '../footage';

export const S03_DUR = 477; // 23.85 -> 40.10s

/**
 * Scene 3 — where and when. The clip runs underneath from first frame to
 * last. Over it, our own code-drawn globe (Maps.tsx — real lon/lat math, not
 * a reused video) turns from the open Atlantic to Berlin Raceway's actual
 * coordinates, the United States fills gold, and a pin drops exactly on the
 * real location with the place plate along the bottom. The "bought for one
 * reason" line that follows is narration, so it plays on the footage alone.
 *
 * An earlier version of this scene played a pre-rendered globe video reused
 * from a different project — it turned out to be a Daytona zoom (its own
 * baked-in caption read "DAYTONA BEACH, USA"), had a hard jump-cut in its
 * opening second, and was cut off before its own camera move finished. The
 * pin sat at a guessed, fixed pixel position that didn't track the video's
 * actual (moving, wrong-city) camera at all. This version has none of those
 * problems: the projection is real math (`ortho` in geo.ts), so the pin is
 * always exactly correct, and the camera path is authored to finish exactly
 * as the pin and plate land.
 */
const W: Win = [147, 192, 345, 384];

const [BERLIN_LON, BERLIN_LAT] = TRACKS.berlin.ll;

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];

  // Two beats, not one continuous drift: the globe turns directly from the open Atlantic to
  // Berlin Raceway's real coordinates — no intermediate waypoint to overshoot through, so it
  // reads as one clean rotation straight to the place — and only once it has fully arrived does
  // the camera push in. Turn and push never happen at the same time.
  const turnE = Easing.bezier(0.45, 0, 0.2, 1);
  const lon = interpolate(g, [0, 110], [-46, BERLIN_LON], {
    easing: turnE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lat = interpolate(g, [0, 110], [22, BERLIN_LAT], {
    easing: turnE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const r = interpolate(g, [0, 110, 195], [350, 368, 540], {
    easing: Easing.bezier(0.35, 0, 0.15, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const highlight = ease(g, 95, 150);
  const pinK = ease(g, 140, 178);
  const plate = ease(g, 158, 194);

  return (
    <SceneBed
      {...bed(3)}
      dur={S03_DUR}
      wins={[W]}
      accent={C.steel}
      amp={0.09}
      maxBlur={20}
      dim={0.72}
    >
      <Overlay k={winK(frame, W)} rise={10}>
        <AbsoluteFill style={{backgroundColor: '#04060c'}} />
        <StarField frame={frame} />
        <Globe
          center={[lon, lat]}
          radius={r}
          cx={960}
          cy={480}
          highlight={highlight}
          frame={frame}
          pins={[{ll: TRACKS.berlin.ll, k: pinK}]}
        />
        <PlacePlate text="Berlin Raceway, Michigan" k={plate} y={906} />
      </Overlay>
    </SceneBed>
  );
};

/** The starfield the globe sits on. */
export const StarField: React.FC<{frame: number; count?: number}> = ({frame, count = 110}) => (
  <AbsoluteFill>
    {Array.from({length: count}).map((_, i) => {
      const a = Math.sin(i * 78.233) * 43758.5453;
      const b = Math.sin(i * 12.9898) * 24634.6345;
      const x = (a - Math.floor(a)) * 1920;
      const y = (b - Math.floor(b)) * 1080;
      const s = 1 + ((a * 7) % 1) * 1.5;
      const tw = 0.25 + 0.55 * Math.abs(Math.sin(frame * 0.03 + i));
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: s,
            height: s,
            borderRadius: '50%',
            background: '#cfe0ff',
            opacity: tw * 0.7,
          }}
        />
      );
    })}
  </AbsoluteFill>
);
