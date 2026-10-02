import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {HOOK_CUTS, HOOK_FRAMES, HOOK_SUSPENSE_LINE, type HookCut} from '../hook';

/**
 * The cold open: a bordered box on a blurred backdrop, fixed on screen, while the clip inside it
 * cuts hard between real moments - Rio, Talkspace, Beijing, NBC. The Source tag names each cut's
 * real channel handle. Under the box: an "IN THIS VIDEO" label for the whole hook, and when Phelps
 * is speaking, his own words revealed one at a time as he says them. The last cut carries one
 * suspense line bottom-centre, then the film hard-cuts to black and starts from the beginning.
 *
 * Video here is muted: the render is muted and render-1080.ps1 lays the same ranges' real audio.
 */
const enter = (frame: number, at: number, len = 14) =>
  interpolate(frame, [at, at + len], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const BOX_W = 1180;
const BOX_H = 664;
const BOX_X = (1920 - BOX_W) / 2;
const BOX_Y = 110;
const LABEL_Y = BOX_Y + BOX_H + 22;
const CAPTION_Y = LABEL_Y + 64;

const starts: number[] = [];
{
  let f = 0;
  for (const c of HOOK_CUTS) {
    starts.push(f);
    f += c.frames;
  }
}

const Cut: React.FC<{cut: HookCut}> = ({cut}) => {
  const frame = useCurrentFrame();
  const words = cut.words ?? [];
  const lineK = words.length ? enter(frame, words[0].at, 6) * (1 - enter(frame, cut.frames - 6, 6)) : 0;
  return (
    <AbsoluteFill>
      {/* backdrop: same clip, blurred and darkened */}
      <AbsoluteFill style={{transform: 'scale(1.35)', filter: 'blur(38px) brightness(0.4)'}}>
        <OffthreadVideo src={staticFile(`bed-pool/${cut.file}`)} startFrom={Math.round(cut.from * 30)} muted />
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.35)'}} />

      {/* the box */}
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
        }}
      >
        <OffthreadVideo
          src={staticFile(`bed-pool/${cut.file}`)}
          startFrom={Math.round(cut.from * 30)}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>

      {/* source tag - the clip's real channel handle */}
      <div style={{position: 'absolute', left: 40, top: 40, padding: '12px 22px', borderRadius: 10, background: 'rgba(10,10,10,0.86)'}}>
        <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, fontStyle: 'italic', color: C.text}}>Source: </span>
        <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>{cut.source}</span>
      </div>

      {/* his own words, word by word as he says them */}
      {lineK > 0.001 ? (
        <div style={{position: 'absolute', left: BOX_X, top: CAPTION_Y, width: BOX_W, textAlign: 'center', opacity: lineK}}>
          <div
            style={{
              display: 'inline-block',
              padding: '14px 30px',
              borderRadius: 14,
              background: 'rgba(8,8,10,0.86)',
              boxShadow: '0 14px 34px rgba(0,0,0,0.5)',
            }}
          >
            {words.map((w, j) => {
              const wk = enter(frame, w.at, 5);
              if (wk <= 0.001) return null;
              return (
                <span
                  key={j}
                  style={{
                    display: 'inline-block',
                    fontFamily: FONT,
                    fontSize: 38,
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
      ) : null}
    </AbsoluteFill>
  );
};

export const HookMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const lastStart = starts[starts.length - 1];
  const lineK = enter(frame, lastStart + 4, 12);
  // "IN THIS VIDEO" sits under the box for the whole montage, clearing a beat before the hard cut.
  const labelK = enter(frame, 6, 14) * (1 - enter(frame, HOOK_FRAMES - 10, 8));
  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      {HOOK_CUTS.map((cut, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={cut.frames} layout="none">
          <Cut cut={cut} />
        </Sequence>
      ))}

      {labelK > 0.001 ? (
        <div style={{position: 'absolute', left: 0, top: LABEL_Y, width: 1920, textAlign: 'center', opacity: labelK}}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 22px',
              borderRadius: 8,
              background: C.amber,
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 4,
              color: '#0b0b0d',
            }}
          >
            IN THIS VIDEO
          </div>
        </div>
      ) : null}

      {frame >= lastStart && frame < HOOK_FRAMES ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 60}}>
          <div
            style={{
              opacity: lineK,
              transform: `translateY(${(1 - lineK) * 12}px)`,
              fontFamily: FONT,
              fontSize: 52,
              fontWeight: 800,
              color: C.text,
              textShadow: '0 4px 24px rgba(0,0,0,0.85)',
            }}
          >
            {HOOK_SUSPENSE_LINE}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
