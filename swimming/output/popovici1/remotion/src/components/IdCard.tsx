import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {winK, type Win} from './Bed';

/**
 * Named-person ID card: photo left, name/role right, sitting over the real footage (flick-shorts-visual-style-upgrade).
 * Pinned near the top so it never collides with the centred stamps or the bottom captions.
 */
export const IdCard: React.FC<{photo: string; name: string; sub: string; label: string; win: Win}> = ({photo, name, sub, label, win}) => {
  const frame = useCurrentFrame();
  const k = winK(frame, win);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 190,
        width: 820,
        display: 'flex',
        alignItems: 'stretch',
        opacity: k,
        transform: `translateY(${(1 - k) * -26}px)`,
        ...cardStyle({radius: 20, pad: 0}),
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile(photo)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.muted}}>{label}</div>
        <div style={{fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>{name}</div>
        <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>{sub}</div>
      </div>
    </div>
  );
};
