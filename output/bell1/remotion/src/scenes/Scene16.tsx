import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16 — "Ryan Blaney sits third, 16 points back. Tyler Reddick... fourth, 24 points behind.
 * Chase Briscoe rounds out the top five, 37 points off the pace."
 *
 * A standings list, arriving a row at a time in the order the narration reads them. Bell's row is
 * picked out because the point of the scene is how close he now is, not the table itself.
 */
const W: Win = [36, 60, 330, 360];

const ROWS = [
  {at: 60, pos: '1', name: 'Denny Hamlin', gap: 'Leader', lead: false},
  {at: 100, pos: '2', name: 'Christopher Bell', gap: '−12', lead: true},
  {at: 140, pos: '3', name: 'Ryan Blaney', gap: '−16', lead: false},
  {at: 180, pos: '4', name: 'Tyler Reddick', gap: '−24', lead: false},
  {at: 220, pos: '5', name: 'Chase Briscoe', gap: '−37', lead: false},
];

export const Scene16: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(16)} dur={S16_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 460, top: 220, width: 1000}}>
          <div style={{...labelStyle(20), color: C.amber, marginBottom: 20}}>
            Chase standings after Darlington
          </div>
          {ROWS.map((r) => {
            const k = ease(frame, r.at, r.at + 24);
            return (
              <div
                key={r.name}
                style={{
                  ...cardStyle({radius: 12, pad: 20}),
                  marginBottom: 12,
                  opacity: k,
                  transform: `translateX(${(1 - k) * -26}px)`,
                  borderLeft: `3px solid ${r.lead ? C.amber : C.hairlineStrong}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 34,
                    fontWeight: 800,
                    color: r.lead ? C.amber : C.dim,
                    width: 44,
                  }}
                >
                  {r.pos}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 32,
                    fontWeight: r.lead ? 800 : 600,
                    color: r.lead ? C.text : C.muted,
                    flex: 1,
                  }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 28,
                    fontWeight: 700,
                    color: r.lead ? C.amber : C.dim,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.gap}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
