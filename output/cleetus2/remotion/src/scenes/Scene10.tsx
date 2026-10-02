import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {Card, ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "Read the fine print in the official rules and you find a single line that most fans
 * skip right past. The prize vehicles are for racetrack use only. They are not intended for open
 * roads, and they do not meet United States standards for street vehicles." The one line the whole
 * video is built around - the only place a written-rule quote earns a card of its own.
 */
const W: Win = [24, 54, 126, 152];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const body = ease(frame, 60, 96);

  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[W]} amp={0.06} maxBlur={17} dim={0.56}>
      <Overlay k={k} rise={20}>
        <Card
          accent={C.amber}
          reveal={k}
          style={{left: 460, top: 260, width: 1000, padding: '40px 48px 46px'}}
        >
          <div style={{...labelStyle(19), color: C.amber}}>From the official rules</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 52,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.2,
              lineHeight: 1.18,
              marginTop: 14,
            }}
          >
            "For racetrack use only."
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 500,
              color: C.muted,
              lineHeight: 1.4,
              marginTop: 20,
              opacity: body,
            }}
          >
            Not intended for open roads - and doesn't meet U.S. standards for street vehicles.
          </div>
        </Card>
      </Overlay>
    </BedChain>
  );
};
