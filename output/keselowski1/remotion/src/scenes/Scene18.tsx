import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "Not an isolated moment for Hocevar this season. He's been at the center of on-track
 * incidents and rival complaints repeatedly in 2026 - one of the sport's most recurring storylines,
 * regardless of where he finishes."
 */
const W: Win = [50, 82, 224, 250];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const num = ease(frame, 56, 100);
  const foot = ease(frame, 160, 194);

  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 340, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 70,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1.6,
              lineHeight: 1.1,
              opacity: num,
            }}
          >
            Not an isolated moment.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 27,
              fontWeight: 500,
              color: C.muted,
              marginTop: 16,
              maxWidth: 1300,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: foot,
            }}
          >
            On-track incidents and rival complaints, repeatedly - one of the sport's most recurring
            storylines this year.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
