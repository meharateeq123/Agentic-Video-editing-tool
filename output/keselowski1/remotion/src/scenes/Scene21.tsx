import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - quote: "It was discussed just a little," Ellis said. "It was something that everyone
 * was kind of briefed on." No source clip of the Hauler Talk episode itself was found, so - unlike
 * the on-camera driver quotes - this is presented as a graphic attributed quote (blurred/dimmed
 * neutral b-roll, a podcast-style attribution) rather than the sharp-footage treatment reserved for
 * moments actually shown on camera.
 */
const W: Win = [30, 58, 120, 150];

export const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const k = ease(frame, 34, 60);
  const attr = ease(frame, 74, 96);

  return (
    <BedChain segs={chain(21)} dur={S21_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.56}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 400, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -0.8,
              lineHeight: 1.3,
              opacity: k,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            &ldquo;It was discussed just a little - something everyone was briefed on.&rdquo;
          </div>
          <div style={{...labelStyle(17), color: C.amber, marginTop: 18, opacity: attr}}>
            Amanda Ellis - NASCAR Hauler Talk podcast
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
