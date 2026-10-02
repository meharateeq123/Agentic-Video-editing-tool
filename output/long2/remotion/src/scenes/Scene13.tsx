import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Hit} from '../components/Hit';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

// Rows pop top-to-bottom in the order the script actually says the numbers: "51" at local f222
// (top-seven line), then "33" at local f295 (Blaney's own line). Row order matches that, so the
// row popping in is always the one on top - not a lower row landing before the one above it.
const ROWS_AT = [124, 250, 322];
const CARD_WIN: Win = [112, 124, 366, 392];

const ROWS = [
  {pos: '1', name: 'Denny Hamlin', tag: 'LEADS', color: C.emerald},
  {pos: '7', name: 'Seventh place', tag: '-51', color: C.amber},
  {pos: '4', name: 'Ryan Blaney', tag: '-33', color: C.red},
];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 130, top: 610, width: 780, ...cardStyle({radius: 26, pad: 26})}}>
        <div style={{...labelStyle(18), color: C.amber, letterSpacing: 5}}>Chase Standings - After Gateway</div>
        <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, ROWS_AT[i]);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 6px',
                  borderBottom: i < ROWS.length - 1 ? `1px solid ${C.hairline}` : 'none',
                  opacity: p.k,
                  transform: `scale(${p.s})`,
                  transformOrigin: 'left center',
                }}
              >
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.text}}>
                  {r.pos}. {r.name}
                </span>
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 900, color: r.color, letterSpacing: -0.5}}>{r.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene13: React.FC = () => (
  <BedChain segs={chain(13)} dur={S13_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={8} dim={0.3}>
    <StandingsCard />
    <Hit file="Popups.mp3" at={ROWS_AT[0]} />
    <Hit file="Popups.mp3" at={ROWS_AT[1]} />
    <Hit file="Popups.mp3" at={ROWS_AT[2]} />
  </BedChain>
);
