import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {ease} from './base';

/**
 * Suspense-montage cold open, trimmed to a fixed 5s per the user's call ("boss jo hmari hook hai
 * bs 5 seconds ki krdo") - three quick real-audio flashes, no lingering captions. Same three real
 * sources as the 13s version, just shorter: GI's pit-road scramble, FOX's "boil over" call, and the
 * Happy Hour set. See footage.ts header for why these exact ranges are fresh of both this film's own
 * scenes and everything long3 used.
 */
const BOX_W = 1180;
const BOX_H = 664;
const BOX_X = (1920 - BOX_W) / 2;
const BOX_Y = 150;

type Clip = {src: string; startFrom: number};

const boxedFlash = (clip: Clip, from: number, dur: number, boxK: number, label: string) => (
  <Sequence key={`${clip.src}-${from}`} from={from} durationInFrames={dur} layout="none">
    <AbsoluteFill style={{transform: 'scale(1.35)', filter: 'blur(38px) brightness(0.4)'}}>
      <OffthreadVideo src={staticFile(clip.src)} muted startFrom={Math.round(clip.startFrom * 30)} />
    </AbsoluteFill>
    <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.35)'}} />
    <div
      style={{
        position: 'absolute',
        left: BOX_X,
        top: BOX_Y,
        width: BOX_W,
        height: BOX_H,
        borderRadius: 26,
        overflow: 'hidden',
        border: '5px solid rgba(255,255,255,0.92)',
        boxShadow: '0 40px 110px rgba(0,0,0,0.75)',
        opacity: boxK,
      }}
    >
      <OffthreadVideo
        src={staticFile(clip.src)}
        startFrom={Math.round(clip.startFrom * 30)}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </div>
    <div style={{position: 'absolute', left: BOX_X, top: BOX_Y - 46, padding: '9px 18px', borderRadius: 8, background: 'rgba(10,10,10,0.86)', opacity: boxK}}>
      <span style={{fontFamily: FONT, fontSize: 20, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>{label}</span>
    </div>
  </Sequence>
);

const RUN: {clip: Clip; from: number; dur: number; label: string}[] = [
  {clip: {src: 'bed-pool/ng.mp4', startFrom: 1358}, from: 0, dur: 50, label: 'Gateway - Larson ends the drought'},
  {clip: {src: 'bed-pool/k24.mp4', startFrom: 181.5}, from: 50, dur: 50, label: 'Kansas 2024 - 0.001 seconds'},
  {clip: {src: 'bed-pool/br.mp4', startFrom: 112.6}, from: 100, dur: 50, label: 'Bristol - Larson vs Hamlin'},
];

const Caption: React.FC<{from: number; to: number; text: string}> = ({from, to, text}) => {
  const frame = useCurrentFrame();
  const k = ease(frame, from, from + 6) * (1 - ease(frame, to - 6, to));
  if (k <= 0.001) return null;
  return (
    <div style={{position: 'absolute', left: BOX_X, top: BOX_Y + BOX_H + 26, width: BOX_W, textAlign: 'center', opacity: k}}>
      <div style={{display: 'inline-block', padding: '14px 26px', borderRadius: 12, background: 'rgba(8,8,10,0.86)', fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.text, maxWidth: BOX_W - 60}}>
        {text}
      </div>
    </div>
  );
};

export const HookOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const boxK = ease(frame, 2, 10);
  const black = ease(frame, 142, 150);

  return (
    <AbsoluteFill style={{backgroundColor: C.ground, overflow: 'hidden'}}>
      {RUN.map((r) => boxedFlash(r.clip, r.from, r.dur, boxK, r.label))}

      <Sequence from={0} durationInFrames={50} layout="none">
        <Audio src={staticFile('bed-pool/ng.mp4')} volume={1} startFrom={Math.round(1358 * 30)} />
      </Sequence>
      <Sequence from={50} durationInFrames={50} layout="none">
        <Audio src={staticFile('bed-pool/k24.mp4')} volume={1} startFrom={Math.round(181.5 * 30)} />
      </Sequence>
      <Sequence from={100} durationInFrames={50} layout="none">
        <Audio src={staticFile('bed-pool/br.mp4')} volume={0.9} startFrom={Math.round(112.6 * 30)} />
      </Sequence>

      <Caption from={10} to={48} text="Kyle Larson leads Denny Hamlin by ONE point." />

      <AbsoluteFill style={{backgroundColor: '#000', opacity: black}} />
    </AbsoluteFill>
  );
};
