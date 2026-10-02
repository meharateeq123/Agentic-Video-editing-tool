import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - the title. Short (3.1s) - the hook already did the dramatic work, this is just the
 * film's name card before the VO picks up the story.
 */
const W: Win = [4, 26, 70, 94];

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 22);

  return (
    <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 430, width: 1920, textAlign: 'center', opacity: g}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 78,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Brad Keselowski sent Carson Hocevar a warning.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
