import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "While Keselowski was issuing warnings, Hocevar's response was almost the opposite in
 * tone. Asked what happened in the incident, Hocevar kept it simple."
 */
const W: Win = [30, 58, 94, 120];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 36, 64);

  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 440, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.6,
              lineHeight: 1.25,
              marginTop: 14,
              opacity: body,
            }}
          >
            Almost the opposite in tone.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
