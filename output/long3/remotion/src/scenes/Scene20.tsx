import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {VenueStamp} from '../components/Stamp';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Hit} from '../components/Hit';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

// "33 points" f83-f105, "sixth" f238, "52 points" f311-f337, Larson f486, "one point back" f595.
const W0: Win = [76, 90, 152, 172];
const CARD: Win = [226, 240, 368, 394];
const LARSON: Win = [490, 504, 574, 590];
const HAMLIN: Win = [592, 606, 694, 712];
const ROWS_AT = [238, 311];

const ROWS = [
  {pos: '4th', name: 'Before Bristol', tag: '-33', color: C.muted},
  {pos: '6th', name: 'After Bristol', tag: '-52', color: C.red},
];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 130, top: 610, width: 780, ...cardStyle({radius: 26, pad: 26})}}>
        <div style={{...labelStyle(18), color: C.amber, letterSpacing: 5}}>Ryan Blaney - Chase Points Gap</div>
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
                  {r.pos} - {r.name}
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

export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} wins={[W0, CARD]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="-33" label="Points Back - 4th" at={86} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={86} volume={0.28} />
    <GapCard />
    <Hit file="Popups.mp3" at={ROWS_AT[0]} />
    <Hit file="Popups.mp3" at={ROWS_AT[1]} />
    <VenueStamp title="Kyle Larson" sub="New points leader" win={LARSON} />
    <VenueStamp title="Denny Hamlin" sub="One point back" win={HAMLIN} />
  </BedChain>
);
