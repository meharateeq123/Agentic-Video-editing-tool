import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {ease} from '../components/base';
import {USMap, Pin, Route, PinLabel} from '../components/Maps';
import {US_OPTS, TRACKS, flat} from '../geo';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

const W0: Win = [40, 52, 130, 150];
const MAP: Win = [220, 236, 400, 420];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - 220;
  const out = 1 - ease(frame, 150, 170);
  const b = flat(TRACKS.bristol.ll, US_OPTS);
  const k = flat(TRACKS.kansas?.ll ?? TRACKS.bristol.ll, US_OPTS);
  const bk = Math.min(1, Math.max(0, (frame - 6) / 14));
  const rk = ease(frame, 20, 60);
  const kk = Math.min(1, Math.max(0, (frame - 58) / 14));
  const titleK = ease(frame, 4, 22);
  if (frame < 0) return null;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={ease(frame, 0, 26)}>
        <Route pts={[b, k]} k={rk} color={C.amber} march={frame * 1.4} />
        <Pin x={b.x} y={b.y} k={bk} color={C.muted} scale={0.9} />
        <Pin x={k.x} y={k.y} k={kk} color={C.red} scale={1.3} />
      </USMap>
      <PinLabel x={b.x} y={b.y} k={bk} text="Bristol" sub="last week" align="left" color={C.muted} />
      <PinLabel x={k.x} y={k.y} k={kk} text="Kansas" sub="this weekend" align="right" color="#fff" />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK}}>
        <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          NEXT: KANSAS SPEEDWAY
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="-52" label="Points Back - 6th" at={52} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={52} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={220} volume={0.3} />
  </BedChain>
);
