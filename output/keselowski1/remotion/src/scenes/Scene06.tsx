import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 - "This wasn't a battle for the win. It was two cars racing for 17th place, early in a
 * 367-lap crown jewel event."
 */
const W: Win = [40, 72, 190, 220];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 46, 78);
  const num = ease(frame, 78, 122);
  const foot = ease(frame, 130, 160);

  return (
    <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 300, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>Not a battle for the win</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 220,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -10,
              lineHeight: 1,
              marginTop: 12,
              opacity: num,
            }}
          >
            P17
          </div>
          <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.muted, marginTop: 10, opacity: foot}}>
            Two cars racing for 17th - early in a 367-lap crown jewel event.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
