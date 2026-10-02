import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Breaking it made her the first swimmer to hold four individual long course world records
 * at the same time since Sarah Sjostrom ..."
 *
 * The four records themselves, on "four" (174.60s = +153f). Rows land at 165/172/179/186 over 12f,
 * so the last is complete at 198 and out0 = 228 - gone before "Sjostrom" (178.34s = +266f).
 */
const W: Win = [150, 180, 228, 254];
const ROWS: {event: string; note: string}[] = [
  {event: '400m freestyle', note: '2025'},
  {event: '200m individual medley', note: '2025'},
  {event: '400m individual medley', note: '2025'},
  {event: '200m butterfly', note: 'July 2026'},
];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 250,
            width: 780,
            background: C.card,
            border: `1px solid ${C.hairline}`,
            borderRadius: 18,
            boxShadow: '0 26px 78px rgba(0,0,0,0.62)',
            padding: 34,
          }}
        >
          <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 600, letterSpacing: 3.1, textTransform: 'uppercase', color: C.muted}}>
            Summer McIntosh - world records held
          </div>
          {ROWS.map((r, i) => {
            const e = ease(frame, 165 + i * 7, 177 + i * 7);
            const last = i === ROWS.length - 1;
            return (
              <div
                key={r.event}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginTop: i === 0 ? 22 : 12,
                  paddingTop: i === 0 ? 0 : 12,
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: e,
                  transform: `translateX(${(1 - e) * -20}px)`,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: last ? C.amber : C.text, letterSpacing: -1}}>
                  {r.event}
                </div>
                <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: last ? C.amber : C.muted}}>{r.note}</div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
