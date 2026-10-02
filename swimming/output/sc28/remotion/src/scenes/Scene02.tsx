import React from 'react';
import {Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {ID, SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 139; // 5.00 -> 9.62s

export const S02_CUTS = [33, 61, 45];

// Each row pops on its name: "Gretchen" 5.20s (f6), "Léon" 6.08s (f33), "Tomoyuki" 8.14s (f94).
// The last row settles at 108, so out0 = 108 + 30.
export const S02_ROWS_AT = [6, 33, 94];
const CARD_WIN: Win = [2, 12, 138, 149];

const ROWS = [
  {photo: ID.walsh, name: 'Gretchen Walsh', tag: 'USA', color: C.steel},
  {photo: ID.marchand, name: 'Léon Marchand', tag: 'FRANCE', color: C.amber},
  {photo: ID.matsushita, name: 'Tomoyuki Matsushita', tag: 'JAPAN', color: C.red},
];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

/** The new generation, one name at a time, each with a photo from the footage it is named in. */
const NewGenCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 90, top: 960, width: 900, ...cardStyle({radius: 26, pad: 24})}}>
        <div style={{...labelStyle(20), color: C.amber, letterSpacing: 5}}>The new generation</div>
        <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, S02_ROWS_AT[i]);
            const active = frame >= S02_ROWS_AT[i] && (i === ROWS.length - 1 || frame < S02_ROWS_AT[i + 1]);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: 10,
                  borderRadius: 18,
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  opacity: p.k,
                  transform: `scale(${p.s})`,
                  transformOrigin: 'left center',
                }}
              >
                <Img
                  src={staticFile(r.photo)}
                  style={{width: 104, height: 104, objectFit: 'cover', borderRadius: 52, border: `4px solid ${r.color}`}}
                />
                <div style={{flex: 1, fontFamily: FONT, fontSize: 44, fontWeight: 900, color: C.text, letterSpacing: -1.2, lineHeight: 1.05}}>
                  {r.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: '#0b0b0d',
                    background: r.color,
                    padding: '8px 14px',
                    borderRadius: 10,
                  }}
                >
                  {r.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={5} dim={0.18} />
    <NewGenCard />
    <Sequence from={0} durationInFrames={90} layout="none">
      <Caption text="From GRETCHEN WALSH to LÉON MARCHAND and rising stars like" outAt={84} fontSize={48} />
    </Sequence>
    <Sequence from={90} durationInFrames={49} layout="none">
      <Caption text="TOMOYUKI MATSUSHITA," outAt={40} fontSize={62} />
    </Sequence>
  </>
);
