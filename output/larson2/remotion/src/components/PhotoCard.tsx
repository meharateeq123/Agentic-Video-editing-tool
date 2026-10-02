import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT, labelStyle} from '../theme';

/**
 * The film's photo card.
 *
 * bell1 laid its photos across a wide, shallow banner and the user's note on it was direct: don't
 * make it a strip ("aik patti"), make it a box, and let the image be big. So the proportions here
 * are deliberately upright - the picture gets ~three quarters of the card's height and the caption
 * sits under it as a base, rather than a thin photo bar with text taking most of the room.
 *
 * `photo` is the main image. `inset` is optional: a second, smaller image tucked into the bottom
 * corner of the main one, for pairing a face with the moment it belongs to.
 */
export const PhotoCard: React.FC<{
  photo: string;
  eyebrow: string;
  title: string;
  sub?: string;
  /** card width; height follows from the image box plus the caption */
  width?: number;
  /** height of the image box - keep it well above half the card so the picture leads */
  photoHeight?: number;
  objectPosition?: string;
  inset?: {src: string; objectPosition?: string};
  accent?: string;
  style?: React.CSSProperties;
}> = ({
  photo,
  eyebrow,
  title,
  sub,
  width = 860,
  photoHeight = 560,
  objectPosition = '50% 40%',
  inset,
  accent = C.amber,
  style,
}) => (
  <div
    style={{
      width,
      background: C.cardSolid,
      border: `1px solid ${C.hairlineStrong}`,
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 40px 110px rgba(0,0,0,0.72)',
      ...style,
    }}
  >
    <div style={{position: 'relative', height: photoHeight}}>
      <Img
        src={staticFile(photo)}
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block'}}
      />
      {/* keeps the caption edge readable against a bright photo */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 140,
          background: `linear-gradient(to bottom, rgba(0,0,0,0), ${C.cardSolid})`,
        }}
      />
      {inset ? (
        <div
          style={{
            position: 'absolute',
            right: 22,
            bottom: 22,
            width: 190,
            height: 190,
            borderRadius: 14,
            overflow: 'hidden',
            border: `2px solid ${C.hairlineStrong}`,
            boxShadow: '0 18px 44px rgba(0,0,0,0.7)',
          }}
        >
          <Img
            src={staticFile(inset.src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: inset.objectPosition ?? '50% 40%',
              display: 'block',
            }}
          />
        </div>
      ) : null}
    </div>

    <div style={{padding: '22px 34px 32px', borderTop: `3px solid ${accent}`}}>
      <div style={{...labelStyle(17), color: accent}}>{eyebrow}</div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 800,
          color: C.text,
          letterSpacing: -1.4,
          lineHeight: 1.1,
          marginTop: 10,
        }}
      >
        {title}
      </div>
      {sub ? (
        <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 10}}>
          {sub}
        </div>
      ) : null}
    </div>
  </div>
);
