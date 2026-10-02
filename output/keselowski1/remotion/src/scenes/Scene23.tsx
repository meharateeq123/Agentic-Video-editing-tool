import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S23_DUR = mountedFrames(23);

/**
 * Scene 23 - quote: "There's a chance that Brad Moran may speak with Brad Keselowski just to follow
 * up on his comments and check in. But no formal meeting in the hauler or anything like that.
 * Hopefully those two will work it out, and we'll move on." Same graphic-quote treatment as scene 21
 * - no source clip of the podcast episode itself.
 */
const W: Win = [40, 70, 230, 262];

export const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const k1 = ease(frame, 46, 74);
  const k2 = ease(frame, 100, 128);
  const attr = ease(frame, 148, 172);

  return (
    <BedChain segs={chain(23)} dur={S23_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 340, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 42,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.35,
              opacity: k1,
              maxWidth: 1500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            &ldquo;Brad Moran may speak with Brad Keselowski, just to check in.&rdquo;
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 700,
              color: C.amber,
              marginTop: 14,
              opacity: k2,
            }}
          >
            &ldquo;No formal meeting in the hauler, though.&rdquo;
          </div>
          <div style={{...labelStyle(17), color: C.muted, marginTop: 18, opacity: attr}}>
            Amanda Ellis - NASCAR Hauler Talk podcast
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
