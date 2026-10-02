import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "The contact broke Hamlin's right-front toe link and damaged the right-rear control
 * arm."
 *
 * Two parts, two states. A damage readout rather than a stat card: each part gets a status word in
 * its own colour, because "broken" and "damaged" are not the same thing and the line distinguishes
 * them.
 */
const W: Win = [40, 72, 190, 230];

const PARTS = [
  {at: 78, part: 'Right-front toe link', state: 'BROKEN', color: C.red},
  {at: 134, part: 'Right-rear control arm', state: 'DAMAGED', color: C.amber},
];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 480, top: 350, width: 960}}>
          <div style={{...labelStyle(18), color: C.muted, marginBottom: 22}}>
            Damage report - No. 11
          </div>

          {PARTS.map((p) => {
            const k = ease(frame, p.at, p.at + 26);
            return (
              <div
                key={p.part}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 30,
                  padding: '22px 26px',
                  marginBottom: 16,
                  borderRadius: 12,
                  background: 'rgba(10,10,13,0.86)',
                  border: `1px solid ${C.hairline}`,
                  borderLeft: `4px solid ${p.color}`,
                  opacity: k,
                  transform: `translateX(${(1 - k) * -24}px)`,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.text}}>
                  {p.part}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 24,
                    fontWeight: 800,
                    color: p.color,
                    letterSpacing: 3,
                  }}
                >
                  {p.state}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
