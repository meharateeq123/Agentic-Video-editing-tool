import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S29_DUR = mountedFrames(29);

/**
 * Scene 29 - "That creates an obvious question hanging over the entire weekend... Or does Sunday's
 * warning turn into something more deliberate? Hocevar has already shown he isn't changing his
 * approach. Keselowski has already shown he isn't planning to let this go quietly."
 */
const W1: Win = [40, 70, 104, 130];
const W2: Win = [280, 312, 500, 534];

export const Scene29: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = ease(frame, W1[0] + 6, W1[0] + 34);
  const g2a = ease(frame, W2[0], W2[0] + 28);
  const g2b = ease(frame, W2[0] + 60, W2[0] + 88);

  return (
    <BedChain segs={chain(29)} dur={S29_DUR} wins={[W1, W2]} amp={0.06} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W1)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 420, width: 1920, textAlign: 'center', opacity: g1}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 50,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1,
              lineHeight: 1.25,
              marginTop: 14,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Does the warning stay talk - or turn into something deliberate?
          </div>
        </div>
      </Overlay>

      <Overlay k={winK(frame, W2)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 420, width: 1920, textAlign: 'center'}}>
          <div style={{fontFamily: FONT, fontSize: 38, fontWeight: 600, color: C.muted, opacity: g2a}}>
            Hocevar hasn't changed his approach.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 800,
              color: C.amber,
              marginTop: 12,
              opacity: g2b,
            }}
          >
            Keselowski isn't letting this go quietly.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
