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

export const S18_DUR = mountedFrames(18);

// "10 races" is spoken at f357; "Homestead" lands at f561, so the map draws f486-f560 and the
// pin drops right on the word.
const W0: Win = [350, 362, 432, 452];
const MAP: Win = [484, 500, 650, 672];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - 484;
  const draw = ease(frame, 0, 30);
  const out = 1 - ease(frame, 168, 188);
  const b = flat(TRACKS.bristol.ll, US_OPTS);
  const h = flat(TRACKS.homestead.ll, US_OPTS);
  const bk = Math.min(1, Math.max(0, (frame - 8) / 14));
  const rk = ease(frame, 28, 72);
  const hk = Math.min(1, Math.max(0, (frame - 70) / 14));
  const titleK = ease(frame, 6, 26);
  if (frame < 0) return null;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={draw}>
        <Route pts={[b, h]} k={rk} color={C.amber} march={frame * 1.4} />
        <Pin x={b.x} y={b.y} k={bk} color={C.amber} scale={0.95} />
        <Pin x={h.x} y={h.y} k={hk} color={C.red} scale={1.3} />
      </USMap>
      <PinLabel x={b.x} y={b.y} k={bk} text="Bristol" sub="this race" align="left" color={C.muted} />
      <PinLabel x={h.x} y={h.y} k={hk} text="Homestead-Miami" sub="the new finale" align="left" color="#fff" />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK, transform: `translateY(${(1 - titleK) * 12}px)`}}>
        <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          THE 2026 CHASE FINALE
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="10" label="Race Chase - No Eliminations" at={357} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={357} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={484} volume={0.3} />
    <Hit file="Pop.mp3" at={554} volume={0.28} />
  </BedChain>
);
