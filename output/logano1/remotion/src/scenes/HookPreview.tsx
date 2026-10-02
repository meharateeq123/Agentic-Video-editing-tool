import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {ease} from '../components/base';

/**
 * Suspense-montage hook (method 2 - no user-supplied clip link for this film), rebuilt in the
 * same boxed-video treatment as the real-clip hook style ([[flick-hook-clip-boxed-style]] /
 * larson1's HookOpen.tsx): a bordered rounded box on a clean blurred/darkened copy of whichever
 * clip is currently up, source tag top-left, caption directly under the box. The difference from
 * a single-clip hook is that the box's content itself cycles rapidly through the b-roll instead
 * of holding one clip - the box/backdrop position never moves, only what plays inside it.
 *
 * Audio is the clips' own real sound (drone hum, broadcast ambience/engine), not VO - the user was
 * explicit that the hook must not carry the narrator's voice. Only the sharp box copy is unmuted;
 * the blurred backdrop copy of the same clip stays muted so the sound isn't doubled.
 *
 * These clips are NOT the muted bed-pool copies used by the main film (those were transcoded
 * without an audio track at all - confirmed via ffprobe, every bed-pool file is video-only).
 * Each one here was freshly re-downloaded from the same real source with yt-dlp's bestaudio
 * format included, trimmed to just the seconds this hook needs, and saved under
 * public/hook-audio/. One of the broadcast re-downloads (turn-a.mp4 / turn-hold.mp4) turned up
 * the same burned-in "Lap 159 of 240" leaderboard graphic seen in the first attempt at this hook -
 * fixed with an ffmpeg crop (crop=1010:590:270:130,scale=1280:720) that excludes that corner
 * before the audio+video mux, not with a CSS zoom trick at runtime. The two captions are text
 * only (no matching narration audio) - they carry the same two facts the VO would have (the
 * 0.276s gap, the closing question) visually, under the box.
 *
 * One low underscore layer: flick's bundled riser.mp3 plays under the closing beat only (the last
 * 4s, frames 330-450), quiet (0.3 volume) and fading in - the real clip audio still leads, this
 * is just tension underneath it building into the cut-to-black. The user asked for exactly this
 * after confirming the real-clip-audio rule: "kuch aur sound" as an extra layer under the real
 * audio, not instead of it, and only for method 2 (no supplied clip) - method 1's hook is just the
 * supplied clip's own real audio, no added layer.
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

const RUN: {clip: Clip; from: number; dur: number}[] = [
  {clip: {src: 'hook-audio/drone1-a.mp4', startFrom: 0}, from: 0, dur: 15},
  {clip: {src: 'hook-audio/drone2-a.mp4', startFrom: 0}, from: 15, dur: 15},
  {clip: {src: 'hook-audio/turn-a.mp4', startFrom: 0}, from: 30, dur: 15},
  {clip: {src: 'hook-audio/hamlin-a.mp4', startFrom: 0}, from: 45, dur: 15},
  {clip: {src: 'hook-audio/turn-hold.mp4', startFrom: 0}, from: 60, dur: 90},
  {clip: {src: 'hook-audio/drone1-b.mp4', startFrom: 0}, from: 150, dur: 15},
  {clip: {src: 'hook-audio/drone2-b.mp4', startFrom: 0}, from: 165, dur: 15},
  {clip: {src: 'hook-audio/pitroad-a.mp4', startFrom: 0}, from: 180, dur: 15},
  {clip: {src: 'hook-audio/drone1-c.mp4', startFrom: 0}, from: 195, dur: 15},
  {clip: {src: 'hook-audio/drone2-c.mp4', startFrom: 0}, from: 210, dur: 120},
  {clip: {src: 'hook-audio/drone1-d.mp4', startFrom: 0}, from: 330, dur: 120},
];

const TAG_OUT_AT = 430;

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
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 56,
        width: 1920,
        textAlign: 'center',
      }}
    >
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

export const HookPreview: React.FC = () => {
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
          Gateway / WWTR{' '}
        </span>
        <span style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>
          — Archive B-Roll
        </span>
      </div>

      <Caption from={65} to={150} text="That's not a narrow win. That's a gap." />
      <Caption from={345} to={450} text="But by Sunday, everything about that margin gets tested." />

      <BottomLabel />

      <Sequence from={330} durationInFrames={120} layout="none">
        <Audio
          src={staticFile('sfx/riser.mp3')}
          volume={(f) => Math.min(0.3, (f / 20) * 0.3)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
