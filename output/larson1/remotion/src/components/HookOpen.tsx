import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

/**
 * The cold-open frame: hook.mp4 boxed and bordered, centred on a blurred/darkened copy of the same
 * footage rather than played edge to edge. Matches the reference the user sent - a "@NASCAR" source
 * tag top-left (the clip's real channel handle, confirmed via yt-dlp), a rounded bordered video box,
 * and one caption bar directly under the box. The caption lives inside that boxed unit only; the
 * blurred backdrop stays completely clean, with no text of its own.
 *
 * The captions are the broadcast's own live commentary, pulled from YouTube's auto-captions for
 * this exact clip (04:04:30-04:04:46 in the source video) and re-timed to the clip's own clock - not
 * an invented caption. Driver names are picked out in amber as they're said.
 */
const enter = (frame: number, at: number, len = 20) =>
  interpolate(frame, [at, at + len], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

type Word = {t: string; at: number; hot?: boolean};
type Line = {end: number; words: Word[]};

// `at` is the exact frame each word appears, taken directly from YouTube's own auto-caption
// timestamps for this stretch of commentary (04:04:30-04:04:46 in the source), converted to
// frames-into-the-clip (seconds * 30). Words reveal one at a time as they're actually said, not the
// whole line at once.
const LINES: Line[] = [
  {
    end: 62,
    words: [
      {t: 'ran', at: 29},
      {t: 'really', at: 36},
      {t: 'low.', at: 43},
    ],
  },
  {
    end: 94,
    words: [
      {t: 'Oh,', at: 62},
      {t: 'Larson', at: 70, hot: true},
      {t: 'low!', at: 84},
    ],
  },
  {
    end: 151,
    words: [
      {t: 'Oh', at: 94},
      {t: 'yeah,', at: 101},
      {t: 'Larson', at: 106, hot: true},
      {t: 'said', at: 118},
      {t: 'I', at: 122},
      {t: 'can', at: 127},
      {t: 'run', at: 130},
      {t: 'low,', at: 137},
      {t: 'too.', at: 144},
    ],
  },
  {
    end: 204,
    words: [
      {t: 'Oh,', at: 151},
      {t: "he's", at: 158},
      {t: 'there.', at: 166},
    ],
  },
  {
    end: 269,
    words: [
      {t: 'Christopher', at: 204, hot: true},
      {t: 'Bell', at: 221, hot: true},
      {t: 'on', at: 230},
      {t: 'the', at: 235},
      {t: 'inside...', at: 240},
    ],
  },
  {
    end: 358,
    words: [
      {t: 'Christopher', at: 269, hot: true},
      {t: 'Bell', at: 286, hot: true},
      {t: 'for', at: 293},
      {t: 'the', at: 300},
      {t: 'lead!', at: 305},
    ],
  },
  {
    end: 480,
    words: [
      {t: 'Is', at: 358},
      {t: 'this', at: 365},
      {t: 'the', at: 372},
      {t: 'moment', at: 379},
      {t: 'where', at: 386},
      {t: 'he', at: 394},
      {t: 'becomes', at: 401},
      {t: 'a', at: 420},
      {t: 'Southern', at: 430},
      {t: '500', at: 444},
      {t: 'winner?', at: 461},
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
  const chromeOut = 1 - enter(frame, 440, 20);
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
                  // Each word pops in the instant it's actually said; words already said stay put
                  // rather than re-animating, so the line reads as one continuous build.
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
