import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {countTo} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 — "Bell finished second seven times in 2026, a record-tying mark... Darlington was the
 * night that frustration finally turned into a trophy."
 *
 * The whole scene turns on one number, so the graphic is that number: a seven that counts itself
 * up, with the winless run underneath it as the supporting figure. The count rides its own one-way
 * ramp rather than the window, so it never runs backwards as the card leaves.
 */
const W: Win = [40, 60, 105, 130];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const c = ease(frame, W[0] + 6, W[1] + 34);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.09} maxBlur={14} dim={0.4}>
      <Overlay k={k} rise={20}>
        <div style={{position: 'absolute', left: 140, top: 620, width: 660, ...cardStyle({radius: 18, pad: 36})}}>
          <div style={{...labelStyle(18), color: C.amber}}>Runner-up finishes in 2026</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 148,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -6,
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {countTo(c, 7)}
          </div>
          <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 12}}>
            A record-tying mark — and not one win among them
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 840,
            top: 700,
            width: 420,
            ...cardStyle({radius: 16, pad: 30}),
            borderLeft: `3px solid ${C.red}`,
          }}
        >
          <div style={{...labelStyle(16), color: C.muted}}>Winless run</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 72,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -3,
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {countTo(c, 33)} races
          </div>
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 10}}>
            Back to Bristol, September 2025
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
