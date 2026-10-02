import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S30_DUR = mountedFrames(30);

/**
 * Scene 30 - the close. "NASCAR's stance right now is to hope it resolves on its own... Gateway may
 * be less about who wins the race and more about whether this rivalry finally boils over - or
 * whether Keselowski's warning was as far as it goes." The last scene, so the graphic is allowed to
 * hold to the very end rather than fading early - there's no hard cut after it to clear for.
 */
const W: Win = [40, 72, 610, 640];

export const Scene30: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = ease(frame, 46, 78);
  const line2 = ease(frame, 150, 180);

  return (
    <BedChain segs={chain(30)} dur={S30_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div style={{position: 'absolute', left: 0, top: 350, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 62,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.4,
              lineHeight: 1.2,
              maxWidth: 1500,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: line1,
            }}
          >
            Gateway may decide whether this rivalry finally boils over.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 600,
              color: C.muted,
              marginTop: 20,
              opacity: line2,
            }}
          >
            Or whether the warning was as far as it goes.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
