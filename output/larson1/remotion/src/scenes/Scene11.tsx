import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - Larson's own quote: "No, I don't... If we did, we were going to restart behind the 20
 * and the 19. I was actually surprised they pitted in front of me and didn't stay out with me."
 *
 * Same lower-third treatment as hamlin1's quote scenes - sharp footage, bottom-centre caption, no
 * blur - carried over as the standing approach for a direct quote rather than reinvented per film.
 */
const W: Win = [56, 88, 294, 334];

const LINES = [
  {at: 94, text: '"No, I don\'t. If we did, we were going to restart'},
  {at: 148, text: 'behind the 20 and the 19. I was actually surprised'},
  {at: 202, text: 'they pitted in front of me and didn\'t stay out with me."'},
];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const attr = ease(frame, 232, 264);

  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.05} maxBlur={2} dim={0.08}>
      <Overlay k={winK(frame, W)} rise={16}>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.5) 32%, rgba(6,6,8,0) 60%)',
          }}
        />
        <div style={{position: 'absolute', left: 0, bottom: 92, width: 1920, textAlign: 'center'}}>
          {LINES.map((l) => {
            const k = ease(frame, l.at, l.at + 30);
            return (
              <div
                key={l.text}
                style={{
                  fontFamily: FONT,
                  fontSize: 40,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: -0.8,
                  lineHeight: 1.28,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 14}px)`,
                  textShadow: '0 2px 18px rgba(0,0,0,0.7)',
                }}
              >
                {l.text}
              </div>
            );
          })}
          <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 22, opacity: attr}}>
            Kyle Larson, on the call to stay out
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
