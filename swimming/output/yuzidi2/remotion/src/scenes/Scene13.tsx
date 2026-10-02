import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "The 2026 Asian Games begin in Japan's Aichi Prefecture, running from September 19
 * through October 4."
 *
 * Title lands on "2026 Asian Games" (0.4s = f12), the venue on "Aichi" (3.2s = f96), the dates on
 * "September 19th ... October 4th" (4.7s-6.3s = f141-189), where the bar between them draws. The
 * last element settles at f189, so out0 = 189 + 30.
 */
const W: Win = [8, 34, 219, 245];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const t = ease(frame, 12, 38);
  const v = ease(frame, 96, 118);
  const d1 = ease(frame, 141, 163);
  const bar = ease(frame, 150, 189);
  const d2 = ease(frame, 168, 189);
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={10} dim={0.34}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 290,
            width: 760,
            ...cardStyle({radius: 24, pad: 40}),
            borderLeft: `6px solid ${C.amber}`,
          }}
        >
          <div style={{...labelStyle(19), color: C.amber, opacity: t}}>20th Asian Games</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 84,
              fontWeight: 900,
              color: C.text,
              letterSpacing: -3,
              lineHeight: 1,
              marginTop: 16,
              opacity: t,
              transform: `translateY(${(1 - t) * 26}px)`,
            }}
          >
            Aichi–Nagoya 2026
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 600,
              color: C.muted,
              marginTop: 14,
              opacity: v,
              transform: `translateY(${(1 - v) * 18}px)`,
            }}
          >
            Aichi Prefecture, Japan
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34}}>
            <div style={{...numStyle(60, C.amber), opacity: d1, transform: `translateY(${(1 - d1) * 16}px)`}}>Sep 19</div>
            <div style={{flex: 1, height: 6, borderRadius: 3, background: C.hairline, position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${bar * 100}%`, borderRadius: 3, background: C.amber}} />
            </div>
            <div style={{...numStyle(60, C.amber), opacity: d2, transform: `translateY(${(1 - d2) * 16}px)`}}>Oct 4</div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
