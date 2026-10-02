import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S26_DUR = mountedFrames(26);

/**
 * Scene 26 - the longest scene: Keselowski's own complication as a co-owner. "As a co-owner of RFK
 * Racing, his situation isn't just about his own driving. Back in May, his own driver, Ryan Preece,
 * nearly lost his playoff spot after retaliating against Ty Gibbs at Texas... NASCAR has made it
 * clear this season that instigating contact tends to draw far less scrutiny than answering it."
 * Three beats given real room to land, each fading before the next rather than stacking.
 */
const W1: Win = [40, 68, 190, 218];
const W2: Win = [230, 258, 430, 458];
const W3: Win = [470, 498, 800, 828];

export const Scene26: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = ease(frame, W1[0], W1[0] + 28);
  const g2 = ease(frame, W2[0], W2[0] + 28);
  const g3a = ease(frame, W3[0], W3[0] + 28);
  const g3b = ease(frame, W3[0] + 60, W3[0] + 88);

  return (
    <BedChain segs={chain(26)} dur={S26_DUR} wins={[W1, W2, W3]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W1)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 420, width: 1920, textAlign: 'center', opacity: g1}}>
          <div style={{...labelStyle(19), color: C.amber}}>Keselowski's own complication</div>
          <div style={{fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.text, marginTop: 14}}>
            He's also a co-owner of RFK Racing.
          </div>
        </div>
      </Overlay>

      <Overlay k={winK(frame, W2)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 380, width: 1920, textAlign: 'center', opacity: g2}}>
          <div style={{...labelStyle(19), color: C.amber}}>May 2026 - Texas Motor Speedway</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 44,
              fontWeight: 700,
              color: C.text,
              lineHeight: 1.3,
              marginTop: 14,
              maxWidth: 1400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            His own driver, Ryan Preece, nearly lost his playoff spot retaliating against Ty Gibbs.
          </div>
        </div>
      </Overlay>

      <Overlay k={winK(frame, W3)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 400, width: 1920, textAlign: 'center'}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 40,
              fontWeight: 600,
              color: C.muted,
              opacity: g3a,
            }}
          >
            NASCAR has made it clear this season:
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 60,
              fontWeight: 800,
              color: C.amber,
              letterSpacing: -1.2,
              marginTop: 14,
              opacity: g3b,
            }}
          >
            instigating draws far less scrutiny than answering it.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
