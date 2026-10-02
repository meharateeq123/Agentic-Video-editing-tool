import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "Keselowski went on to finish 23rd, well off the pace he'd been running before the
 * contact. Speaking to Above the Yellow Line Media as he left the track, he didn't hold back."
 */
const W: Win = [40, 72, 190, 220];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 46, 78);
  const num = ease(frame, 78, 122);
  const foot = ease(frame, 130, 160);

  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 300, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>Keselowski's finish</div>
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
            P23
          </div>
          <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.muted, marginTop: 10, opacity: foot}}>
            Well off the pace he'd been running before the contact.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
