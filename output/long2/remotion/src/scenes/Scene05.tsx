import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {ease} from '../components/base';
import {USMap, Pin, Route, PinLabel} from '../components/Maps';
import {US_OPTS, TRACKS, flat} from '../geo';
import {Hit} from '../components/Hit';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * ~5s establishing beat (map-animation-screen-time): Gateway -> Bristol, the "next week" of the
 * line, over the real Bristol footage, which is clear again for the last second.
 * "That next week is Bristol" lands f7-f38.
 */
const MapBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = ease(frame, 0, 34);
  const out = 1 - ease(frame, 122, 152);
  const g = flat(TRACKS.gateway.ll, US_OPTS);
  const b = flat(TRACKS.bristol.ll, US_OPTS);
  const gk = Math.min(1, Math.max(0, (frame - 8) / 14));
  const rk = ease(frame, 22, 66);
  const bk = Math.min(1, Math.max(0, (frame - 60) / 14));
  const titleK = ease(frame, 6, 26);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={draw}>
        <Route pts={[g, b]} k={rk} color={C.amber} march={frame * 1.4} />
        <Pin x={g.x} y={g.y} k={gk} color={C.amber} scale={0.95} />
        <Pin x={b.x} y={b.y} k={bk} color={C.red} scale={1.3} />
      </USMap>
      <PinLabel x={g.x} y={g.y} k={gk} text="Gateway" sub="last week" align="left" color={C.muted} />
      <PinLabel x={b.x} y={b.y} k={bk} text="Bristol" sub="this Saturday night" align="right" color="#fff" />
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
          NEXT: BRISTOL
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene05: React.FC = () => (
  <BedChain segs={chain(5)} dur={S05_DUR} amp={0.05}>
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={0} volume={0.3} />
    <Hit file="Pop.mp3" at={60} volume={0.28} />
  </BedChain>
);
