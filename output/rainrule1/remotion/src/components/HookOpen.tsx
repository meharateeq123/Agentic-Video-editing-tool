import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {ease} from './base';

/**
 * Suspense-montage cold open (flick-suspense-hook-format): boxed treatment, box/backdrop position
 * fixed, only what plays inside cycles. Audio is the clips' own real sound (broadcast call, real
 * team radio) - never VO. Real footage throughout: New Hampshire Motor Speedway, 2026-08-23.
 */

const BOX_W = 1180;
const BOX_H = 664;
const BOX_X = (1920 - BOX_W) / 2;
const BOX_Y = 150;

type Clip = {src: string; startFrom: number};

const boxedFlash = (clip: Clip, from: number, dur: number, boxK: number) => (
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
        transform: `scale(${0.96 + 0.04 * boxK})`,
      }}
    >
      <OffthreadVideo
        src={staticFile(clip.src)}
        startFrom={Math.round(clip.startFrom * 30)}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </div>
  </Sequence>
);

const H = 'hook-audio/nhms-official.mp4';
const R = 'hook-audio/nhms-radio.mp4';

const RUN: {clip: Clip; from: number; dur: number}[] = [
  {clip: {src: H, startFrom: 300}, from: 0, dur: 15}, // SVG blitzing the field on wets
  {clip: {src: H, startFrom: 122}, from: 15, dur: 15}, // chaos - Reddick's spin
  {clip: {src: H, startFrom: 362}, from: 30, dur: 15}, // "time to make a switch...wets"
  {clip: {src: R, startFrom: 327}, from: 45, dur: 15}, // real radio: "four tires! go go go!"
  {clip: {src: H, startFrom: 300}, from: 60, dur: 120}, // hold: SVG's lead
  {clip: {src: H, startFrom: 362}, from: 180, dur: 150}, // hold: the forced switch
  {clip: {src: H, startFrom: 9}, from: 330, dur: 15},
  {clip: {src: R, startFrom: 0}, from: 345, dur: 105}, // real pre-race radio, closing hold
];

const TAG_OUT_AT = 330;

const Caption: React.FC<{from: number; to: number; text: string}> = ({from, to, text}) => {
  const frame = useCurrentFrame();
  const k = ease(frame, from, from + 14) * (1 - ease(frame, to - 14, to));
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: BOX_X,
        top: BOX_Y + BOX_H + 26,
        width: BOX_W,
        textAlign: 'center',
        opacity: k,
        transform: `translateY(${(1 - k) * 10}px)`,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '16px 30px',
          borderRadius: 14,
          background: 'rgba(8,8,10,0.86)',
          boxShadow: '0 14px 34px rgba(0,0,0,0.5)',
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          color: C.text,
          maxWidth: BOX_W - 60,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const BOTTOM_LABEL_WORDS = ['In', 'This', 'Video'];

const BottomLabel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, bottom: 56, width: 1920, textAlign: 'center'}}>
      {BOTTOM_LABEL_WORDS.map((w, i) => {
        const wk = ease(frame, i * 8, i * 8 + 12);
        return (
          <span
            key={w}
            style={{
              display: 'inline-block',
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: C.amber,
              textShadow: '0 2px 14px rgba(0,0,0,0.7)',
              opacity: wk,
              transform: `translateY(${(1 - wk) * 14}px) scale(${0.85 + 0.15 * wk})`,
              marginRight: 14,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const HookOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const boxK = ease(frame, 4, 22);
  const tagK = ease(frame, 0, 16) * (1 - ease(frame, TAG_OUT_AT, TAG_OUT_AT + 20));

  return (
    <AbsoluteFill style={{backgroundColor: C.ground, overflow: 'hidden'}}>
      {RUN.map((r) => boxedFlash(r.clip, r.from, r.dur, boxK))}

      <div
        style={{
          position: 'absolute',
          left: BOX_X,
          top: BOX_Y - 68,
          padding: '12px 22px',
          borderRadius: 10,
          background: 'rgba(10,10,10,0.86)',
          opacity: tagK,
        }}
      >
        <span style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, fontStyle: 'italic', color: C.text}}>
          New Hampshire Motor Speedway{' '}
        </span>
        <span style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>
          - Aug 23, 2026
        </span>
      </div>

      <Caption from={75} to={165} text="He built a seven-second lead — on wet tires alone." />
      <Caption from={195} to={315} text="Then NASCAR took it all away in a single caution." />

      <BottomLabel />

      <Sequence from={345} durationInFrames={105} layout="none">
        <Audio src={staticFile('sfx/riser.mp3')} volume={(f) => Math.min(0.3, (f / 20) * 0.3)} />
      </Sequence>
    </AbsoluteFill>
  );
};
