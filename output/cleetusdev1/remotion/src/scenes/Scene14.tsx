import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14); // 726f, 4 links

/**
 * Scene 14 — "Given that Cleetus raced in three different NASCAR touring series in 2026, not just
 * ARCA, there's a real possibility his in-game footprint grows to match."
 *
 * Three series, so three plates, arriving one at a time in the order the season ran. The third
 * carries the open question the narration is actually making — the game has only confirmed the
 * first one.
 */
const W: Win = [60, 90, 470, 520];

const ROWS = [
  {at: 96, label: 'ARCA Menards Series', note: 'In NASCAR 26 — confirmed', accent: C.emerald},
  {at: 176, label: 'Craftsman Truck Series', note: 'Not announced', accent: C.muted},
  {at: 256, label: "O'Reilly Auto Parts Series", note: 'Not announced', accent: C.muted},
];

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.08} maxBlur={14} dim={0.42}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 150, top: 300, width: 900}}>
          <div style={{...labelStyle(20), color: C.amber, marginBottom: 22}}>
            Where he raced in 2026
          </div>
          {ROWS.map((r) => {
            const k = ease(frame, r.at, r.at + 26);
            return (
              <div
                key={r.label}
                style={{
                  ...cardStyle({radius: 14, pad: 24}),
                  marginBottom: 16,
                  opacity: k,
                  transform: `translateX(${(1 - k) * -28}px)`,
                  borderLeft: `3px solid ${r.accent}`,
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 20,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text}}>
                  {r.label}
                </div>
                <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 600, color: r.accent, whiteSpace: 'nowrap'}}>
                  {r.note}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
