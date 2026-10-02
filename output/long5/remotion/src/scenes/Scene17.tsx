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

export const S17_DUR = mountedFrames(17);

const W0: Win = [70, 78, 96, 108];
const MAP0 = 110;
const MAP: Win = [MAP0, MAP0 + 14, MAP0 + 150, MAP0 + 170];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - MAP0;
  if (frame < 0) return null;
  const out = 1 - ease(frame, 150, 170);
  const k = flat(TRACKS.kansas.ll, US_OPTS);
  const v = flat(TRACKS.vegas.ll, US_OPTS);
  const c = flat(TRACKS.charlotte.ll, US_OPTS);
  const kk = Math.min(1, Math.max(0, (frame - 6) / 14));
  const r1 = ease(frame, 30, 66);
  const vk = Math.min(1, Math.max(0, (frame - 64) / 14));
  const r2 = ease(frame, 86, 124);
  const ck = Math.min(1, Math.max(0, (frame - 116) / 14));
  const titleK = ease(frame, 4, 22);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={ease(frame, 0, 26)}>
        <Route pts={[k, v]} k={r1} color={C.amber} march={frame * 1.4} />
        <Route pts={[v, c]} k={r2} color={C.amber} march={frame * 1.4} />
        <Pin x={k.x} y={k.y} k={kk} color={C.red} scale={1.3} />
        <Pin x={v.x} y={v.y} k={vk} color={C.muted} scale={1.0} />
        <Pin x={c.x} y={c.y} k={ck} color={C.muted} scale={1.0} />
      </USMap>
      <PinLabel x={k.x} y={k.y} k={kk} text="Kansas" sub="this weekend" align="right" color="#fff" />
      <PinLabel x={v.x} y={v.y} k={vk} text="Las Vegas" sub="next" align="left" color={C.muted} />
      <PinLabel x={c.x} y={c.y} k={ck} text="Charlotte" sub="then" align="right" color={C.muted} />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK}}>
        <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          THREE STRAIGHT 1.5-MILE TRACKS
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene17: React.FC = () => (
  <BedChain segs={chain(17)} dur={S17_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="1.5 MI" label="Three In A Row" at={76} win={W0} />
    <Hit file="Pop.mp3" at={76} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={MAP0} volume={0.3} />
  </BedChain>
);
