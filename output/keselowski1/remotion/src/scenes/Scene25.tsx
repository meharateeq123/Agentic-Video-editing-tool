import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S25_DUR = mountedFrames(25);

/**
 * Scene 25 - "Earlier this season, NASCAR did step in directly to defuse tension between Austin
 * Hill and Shane van Gisbergen, meeting with both of them. That hasn't happened yet for Hocevar and
 * Keselowski."
 */
const W: Win = [40, 72, 250, 284];

export const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const body = ease(frame, 46, 78);
  const foot = ease(frame, 150, 178);

  return (
    <BedChain segs={chain(25)} dur={S25_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 380, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 50,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1,
              lineHeight: 1.25,
              opacity: body,
            }}
          >
            Austin Hill and Shane van Gisbergen got a meeting this season.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 27,
              fontWeight: 500,
              color: C.muted,
              marginTop: 16,
              opacity: foot,
            }}
          >
            That hasn't happened yet for Hocevar and Keselowski.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
