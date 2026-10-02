import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "Not next season. Not eventually. Hard, and soon. NASCAR heard it too, and they're
 * watching. The question... what happens when these two cars line up again at Gateway."
 */
const W: Win = [40, 72, 380, 420];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = ease(frame, 46, 78);
  const line2 = ease(frame, 260, 292);

  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 330, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 58,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.4,
              lineHeight: 1.15,
              opacity: line1,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            NASCAR heard it too. And they're watching.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 500,
              color: C.muted,
              marginTop: 22,
              opacity: line2,
            }}
          >
            What happens when these two cars line up again - this weekend, at Gateway?
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
