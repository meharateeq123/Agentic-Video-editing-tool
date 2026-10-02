import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "Here's the number that matters most. Hamlin entered Darlington with a 25-point lead.
 * He left with just a 12-point lead."
 *
 * The headline number of the whole film, so it gets the whole frame: 25 counts down to 12 while the
 * old figure sits struck through beside it. Scene 5 also counted, but upward and on a position -
 * this is the points cushion, and it is the only place in the film where two numbers are compared
 * side by side.
 */
const W: Win = [34, 66, 280, 320];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [104, 196], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.15, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const now = Math.round(interpolate(t, [0, 1], [25, 12]));
  const head = ease(frame, 66, 98);
  const was = ease(frame, 82, 116);
  const foot = ease(frame, 210, 250);

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.06} maxBlur={17} dim={0.58}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 250, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>
            Championship lead after one race
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: 44,
              marginTop: 24,
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 108,
                fontWeight: 700,
                color: C.dim,
                textDecoration: 'line-through',
                textDecorationThickness: 6,
                letterSpacing: -4,
                opacity: was * 0.9,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              25
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 250,
                fontWeight: 800,
                color: C.text,
                letterSpacing: -12,
                lineHeight: 1,
                opacity: head,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {now}
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 44,
                fontWeight: 600,
                color: C.muted,
                opacity: head,
              }}
            >
              points
            </div>
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 500,
              color: C.muted,
              marginTop: 14,
              opacity: foot,
            }}
          >
            And the man in second is now his own teammate, Christopher Bell
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
