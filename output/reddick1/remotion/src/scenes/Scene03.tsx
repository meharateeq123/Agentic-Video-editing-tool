import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {bed} from '../footage';

export const S03_DUR = 130; // 19.50 -> 23.82s

/**
 * Scene 3 — "He's already done it in 2026." One fact, one card: the win already happened, so
 * the rest of the film can build on it instead of arguing for it. His own photo — cropped from
 * the Daytona win footage — sits beside the text.
 */
// Capped at 2s total: reveal (20f), a brief readable pause (15f), then leaves the moment it's
// done — no lingering hold once the animation has finished making its point.
const W: Win = [8, 28, 43, 68];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const k = Math.max(0, Math.min(1, ease(g, 0, 20) * 1.3));

  return (
    <SceneBed {...bed(3)} dur={S03_DUR} wins={[W]} amp={0.08} maxBlur={14} dim={0.34}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 400,
            width: 840,
            display: 'flex',
            alignItems: 'stretch',
            opacity: k,
            transform: `translateY(${(1 - k) * 24}px)`,
            ...cardStyle({radius: 18, pad: 0}),
            overflow: 'hidden',
          }}
        >
          <Img
            src={staticFile('id/reddick.png')}
            style={{width: 220, height: 220, objectFit: 'cover', alignSelf: 'center', margin: 20, borderRadius: 14}}
          />
          <div style={{padding: '34px 34px 34px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div style={{...labelStyle(19), color: C.muted}}>2026 Goodyear 400</div>
            <div style={{fontFamily: FONT, fontSize: 74, fontWeight: 800, color: C.text, letterSpacing: -3, lineHeight: 1, marginTop: 12}}>
              Reddick wins
            </div>
            <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 12, lineHeight: 1.35}}>
              Darlington Raceway — March 2026.
            </div>
          </div>
        </div>
      </Overlay>
    </SceneBed>
  );
};
