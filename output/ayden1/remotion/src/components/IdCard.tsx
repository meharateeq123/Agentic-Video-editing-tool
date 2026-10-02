import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {ease} from './base';
import type {Win} from './Bed';

/** Composition size (Root.tsx) — used only to find screen centre for the entrance. */
const VIDEO_W = 1920;
const VIDEO_H = 1080;

/** How long the card holds, fully visible at its big centre size, before it travels down. */
const HOLD_FRAMES = 30; // 1.0s @ 30fps
const FADE_FRAMES = 8;
const TRAVEL_FRAMES = 18;

/**
 * Person ID card — broadcast-graphic style: a red accent bar, a square
 * portrait, the name in bold white, the affiliation underneath in muted
 * grey. At rest it's a compact bar in the bottom-left corner and never
 * covers the subject.
 *
 * On entrance it appears centre-frame at a larger size, holds there fully
 * visible for a beat so it reads clearly, then glides down to its
 * bottom-left resting spot as it settles to full size. `win` is the same
 * [riseStart, riseEnd, fallStart, fallEnd] window `Bed` blurs the
 * background on, so the card lands exactly on the blur and leaves exactly
 * as the blur lifts.
 */
export const IdCard: React.FC<{
  /** path under public/, e.g. "id/dalejr.png" */
  photo: string;
  name: string;
  /** team, series or programme — the line under the name */
  affiliation?: string;
  /** where the face sits in the source frame, as [x%, y%] */
  focus?: [number, number];
  /** how far to push into the source frame so the head fills the portrait */
  zoom?: number;
  /** presence window, in frames: rises [0,1], holds, falls [2,3] */
  win: Win;
  /** bottom-left origin; defaults sit on the 6% safe margin */
  x?: number;
  /** distance from the bottom of the frame to the bottom of the card */
  bottom?: number;
}> = ({photo, name, affiliation, focus = [50, 38], zoom = 1.6, win, x = 72, bottom = 74}) => {
  const frame = useCurrentFrame();
  const [w0, w1, w2, w3] = win;
  const D = 92; // portrait side
  // Rough card footprint — only needs to be close enough to read as "centre", since the card is
  // also scaled up while it travels, which is what actually sells the motion.
  const CARD_W = 480;
  const CARD_H = 116;

  // Three beats: fade in fast, hold fully visible at the big centred size for a full second so
  // it can actually be read, then travel down to the resting spot and shrink to normal size.
  const fadeIn = ease(frame, w0, w0 + FADE_FRAMES);
  const travelStart = w0 + FADE_FRAMES + HOLD_FRAMES;
  const travel = ease(frame, travelStart, travelStart + TRAVEL_FRAMES);
  const fallOut = ease(frame, w2, w3);

  const restCenterX = x + CARD_W / 2;
  const restCenterY = VIDEO_H - bottom - CARD_H / 2;
  const centerDX = VIDEO_W / 2 - restCenterX;
  const centerDY = VIDEO_H / 2 - restCenterY;

  const tx = centerDX * (1 - travel) + fallOut * -54;
  const ty = centerDY * (1 - travel);
  const scale = 1 + 0.22 * (1 - travel);

  const o = fadeIn * (1 - fallOut);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        bottom,
        display: 'flex',
        alignItems: 'stretch',
        gap: 14,
        opacity: o,
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          width: 5,
          borderRadius: 3,
          background: C.red,
          flex: '0 0 auto',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '12px 30px 12px 12px',
          background: 'rgba(10,10,13,0.88)',
          border: `1px solid ${C.hairlineStrong}`,
          borderRadius: 14,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 22px 64px rgba(0,0,0,0.66)',
        }}
      >
        <div
          style={{
            width: D,
            height: D,
            borderRadius: 14,
            overflow: 'hidden',
            flex: '0 0 auto',
            border: `2px solid ${C.hairlineStrong}`,
            background: '#15151a',
          }}
        >
          <Img
            src={staticFile(photo)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `${focus[0]}% ${focus[1]}%`,
              transform: `scale(${zoom})`,
              transformOrigin: `${focus[0]}% ${focus[1]}%`,
            }}
          />
        </div>

        <div style={{minWidth: 0}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -0.2,
              color: '#ffffff',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </div>
          {affiliation ? (
            <div
              style={{
                fontFamily: FONT,
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: 0.6,
                color: C.muted,
                marginTop: 5,
                whiteSpace: 'nowrap',
              }}
            >
              {affiliation}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
