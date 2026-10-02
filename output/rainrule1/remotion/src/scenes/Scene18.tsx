import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

// "currently leads" f22-44; "nine points back" f187-217; "trails by 18" f295-315; "at 33" f376-394.
export const S18_ROWS_AT = [44, 217, 315, 394];
const CARD_WIN: Win = [34, 44, 438, 464];

const ROWS = [
  {name: 'Denny Hamlin', tag: 'LEADS', color: C.emerald},
  {name: 'Kyle Larson', tag: '-9', color: C.amber},
  {name: 'Christopher Bell', tag: '-18', color: C.amber},
  {name: 'Ryan Blaney', tag: '-33', color: C.red},
];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);

const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

/** Chase standings, one row at a time, each landing exactly on the driver's own name. */
const StandingsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 130, top: 640, width: 760, ...cardStyle({radius: 26, pad: 26})}}>
        <div style={{...labelStyle(18), color: C.amber, letterSpacing: 5}}>Chase Standings</div>
        <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, S18_ROWS_AT[i]);
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
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.text}}>{i + 1}. {r.name}</span>
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 900, color: r.color, letterSpacing: -0.5}}>{r.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={8} dim={0.3}>
    <StandingsCard />
  </BedChain>
);
