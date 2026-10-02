import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "The turning point wasn't a crash. It was a pit stop... a slow stop that dropped him
 * from third place all the way back to roughly 20th."
 *
 * The whole scene is one number falling. It counts 3 to 20 rather than cutting between two values,
 * because the drop is the story - and the bed under it is four pit-lane shots, so the picture and
 * the number are saying the same thing.
 */
const W: Win = [66, 96, 346, 386];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [130, 260], [0, 1], {
    easing: Easing.bezier(0.5, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pos = Math.round(interpolate(t, [0, 1], [3, 20]));
  const head = ease(frame, 92, 124);
  const tail = ease(frame, 280, 316);

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.06} maxBlur={17} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 268, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>
            One slow stop on pit road
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontSize: 250,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -12,
              lineHeight: 1,
              marginTop: 18,
              fontVariantNumeric: 'tabular-nums',
              opacity: head,
              transform: `scale(${1 + (1 - head) * 0.06})`,
            }}
          >
            {`P${pos}`}
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 500,
              color: C.muted,
              marginTop: 6,
              opacity: tail,
            }}
          >
            Third to twentieth, without a scratch on the car
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
