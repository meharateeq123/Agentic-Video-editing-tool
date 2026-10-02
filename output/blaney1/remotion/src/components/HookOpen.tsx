import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

/**
 * The cold-open frame: hook.mp4 boxed and bordered, centred on a blurred/darkened copy of the same
 * footage rather than played edge to edge - the "@NASCAR" source tag top-left (the clip's real
 * channel handle), a rounded bordered video box, and one caption bar directly under the box. The
 * caption lives inside that boxed unit only; the blurred backdrop stays completely clean.
 *
 * The captions are the broadcast's own live call, pulled from this exact clip's audio (word-level
 * timestamps via Whisper on the trimmed hook.mp4 itself, not the full replay) - not an invented
 * caption. "77" and "Brad" are picked out in amber as they're said.
 */
const enter = (frame: number, at: number, len = 20) =>
  interpolate(frame, [at, at + len], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

type Word = {t: string; at: number; hot?: boolean};
type Line = {end: number; words: Word[]};

// `at` is the exact frame each word appears, taken from Whisper's word timestamps on hook.mp4's own
// audio. Words reveal one at a time as they're actually said, not the whole line at once.
const LINES: Line[] = [
  {
    end: 45,
    words: [
      {t: "Here's", at: 5},
      {t: 'what', at: 21},
      {t: 'happened.', at: 26},
    ],
  },
  {
    end: 155,
    words: [
      {t: 'Rolls', at: 107},
      {t: 'to', at: 114},
      {t: 'the', at: 118},
      {t: 'top', at: 121},
      {t: 'of', at: 128},
      {t: 'three', at: 133},
      {t: 'and', at: 137},
      {t: 'four.', at: 143},
    ],
  },
  {
    end: 205,
    words: [
      {t: '77', at: 157, hot: true},
      {t: 'underneath', at: 168},
      {t: 'him.', at: 184},
    ],
  },
  {
    end: 375,
    words: [
      {t: 'Oh,', at: 295},
      {t: 'yeah', at: 325},
      {t: 'the', at: 335},
      {t: 'contact', at: 343},
      {t: 'from', at: 352},
      {t: 'the', at: 357},
      {t: '77...', at: 366, hot: true},
    ],
  },
  {
    end: 490,
    words: [
      {t: 'The', at: 380},
      {t: '77', at: 392, hot: true},
      {t: 'into', at: 401},
      {t: 'the', at: 409},
      {t: 'six.', at: 417, hot: true},
      {t: 'Round', at: 452},
      {t: 'the', at: 458},
      {t: 'Brad', at: 463, hot: true},
      {t: 'goes.', at: 477},
    ],
  },
];

export const HookOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const box = enter(frame, 4, 18);
  const tag = enter(frame, 0, 16);
  const captionIn = enter(frame, 18, 18);
  // The tag and caption clear out a beat before the clip ends, so the handoff into scene 1's card
  // is a clean cut rather than the chrome still being visible on the last frame.
  const chromeOut = 1 - enter(frame, 475, 18);
  const tag2 = tag * chromeOut;
  const caption = captionIn * chromeOut;

  const BOX_W = 1180;
  const BOX_H = 664;
  const BOX_X = (1920 - BOX_W) / 2;
  const BOX_Y = 150;

  return (
    <AbsoluteFill style={{backgroundColor: C.ground, overflow: 'hidden'}}>
      {/* Clean blurred backdrop - a scaled, blurred, darkened copy of the same clip. Muted: only
          the boxed copy below carries sound, so it isn't doubled. */}
      <AbsoluteFill style={{transform: 'scale(1.35)', filter: 'blur(38px) brightness(0.4)'}}>
        <OffthreadVideo src={staticFile('hook.mp4')} muted />
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.35)'}} />

      {/* Source tag, top-left */}
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 40,
          padding: '12px 22px',
          borderRadius: 10,
          background: 'rgba(10,10,10,0.86)',
          opacity: tag2,
          transform: `translateY(${(1 - tag) * -10}px)`,
        }}
      >
        <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, fontStyle: 'italic', color: C.text}}>
          Source:{' '}
        </span>
        <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>
          @NASCAR
        </span>
      </div>

      {/* The boxed video */}
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
          opacity: box,
          transform: `scale(${interpolate(box, [0, 1], [0.96, 1])})`,
        }}
      >
        <OffthreadVideo src={staticFile('hook.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {/* Caption, directly under the box - part of the same boxed unit, not floating on the
          backdrop. Rolls through the actual commentary line by line, crossfading as each line's
          own window ends and the next begins. */}
      <div
        style={{
          position: 'absolute',
          left: BOX_X,
          top: BOX_Y + BOX_H + 26,
          width: BOX_W,
          height: 90,
          textAlign: 'center',
        }}
      >
        {LINES.map((line, i) => {
          const start = line.words[0].at;
          const lineK = enter(frame, start, 6) * (1 - enter(frame, line.end - 8, 8));
          const k = lineK * caption;
          if (k <= 0.001) return null;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
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
                }}
              >
                {line.words.map((w, j) => {
                  const wk = enter(frame, w.at, 5);
                  if (wk <= 0.001) return null;
                  return (
                    <span
                      key={j}
                      style={{
                        display: 'inline-block',
                        fontFamily: FONT,
                        fontSize: 36,
                        fontWeight: 800,
                        color: w.hot ? C.amber : C.text,
                        opacity: wk,
                        transform: `scale(${interpolate(wk, [0, 1], [0.7, 1])})`,
                        marginRight: 10,
                      }}
                    >
                      {w.t}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
