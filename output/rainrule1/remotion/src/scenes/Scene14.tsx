import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {ease} from '../components/base';
import {USMap, Pin} from '../components/Maps';
import {US_OPTS, TRACKS, flat} from '../geo';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

// ~6s establishing beat (map-animation-screen-time): the 7 approved ovals pop in, then the map
// clears so the real 2023 North Wilkesboro wet-tire footage carries "since the 2023 All-Star
// Race" on its own. "seven oval tracks" lands at f40-68.
const MAP_FRAMES = 180;

const OVALS: {key: keyof typeof TRACKS; at: number}[] = [
  {key: 'bristol', at: 50},
  {key: 'iowa', at: 62},
  {key: 'newHampshire', at: 74},
  {key: 'phoenix', at: 86},
  {key: 'martinsville', at: 98},
  {key: 'northWilkesboro', at: 110},
  {key: 'richmond', at: 122},
];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = ease(frame, 0, 40);
  const out = 1 - ease(frame, 148, 178);
  const titleK = ease(frame, 10, 30);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={draw}>
        {OVALS.map(({key, at}) => {
          const t = TRACKS[key];
          const p = flat(t.ll, US_OPTS);
          const k = Math.min(1, Math.max(0, (frame - at) / 14));
          return <Pin key={key} x={p.x} y={p.y} k={k} color={key === 'bristol' ? C.red : C.amber} scale={key === 'bristol' ? 1.25 : 0.9} />;
        })}
      </USMap>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 118,
          width: 1920,
          textAlign: 'center',
          opacity: titleK,
          transform: `translateY(${(1 - titleK) * 12}px)`,
        }}
      >
        <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          7 OVALS APPROVED FOR WET-WEATHER TIRES
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} amp={0.05}>
    <MapBeat />
  </BedChain>
);
