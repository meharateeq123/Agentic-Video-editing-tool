import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "Ryan Blaney sits third, 16 points back. Tyler Reddick... fourth, 24 points behind.
 * Chase Briscoe is fifth, 37 points off the lead."
 *
 * The standings, a row at a time in the order they are read. Hamlin's row is picked out because the
 * point of the scene is how little separates him from the four behind him.
 */
const W: Win = [40, 74, 400, 440];

const ROWS = [
  {at: 84, pos: '1', name: 'Denny Hamlin', gap: 'Leader', lead: true},
  {at: 132, pos: '2', name: 'Christopher Bell', gap: '-12', lead: false},
  {at: 180, pos: '3', name: 'Ryan Blaney', gap: '-16', lead: false},
  {at: 228, pos: '4', name: 'Tyler Reddick', gap: '-24', lead: false},
  {at: 276, pos: '5', name: 'Chase Briscoe', gap: '-37', lead: false},
];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(15)} dur={S15_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 470, top: 210, width: 980}}>
          <div style={{...labelStyle(19), color: C.amber, marginBottom: 20}}>
            Chase standings after Darlington
          </div>
          {ROWS.map((r) => {
            const k = ease(frame, r.at, r.at + 24);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  padding: '18px 24px',
                  marginBottom: 12,
                  borderRadius: 12,
                  background: 'rgba(10,10,13,0.86)',
                  border: `1px solid ${C.hairline}`,
                  borderLeft: `3px solid ${r.lead ? C.amber : C.hairlineStrong}`,
                  opacity: k,
                  transform: `translateX(${(1 - k) * -26}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 34,
                    fontWeight: 800,
                    color: r.lead ? C.amber : C.dim,
                    width: 42,
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
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {r.gap}
                </div>
              </div>
            );
          })}
          <div
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 500,
              color: C.muted,
              marginTop: 18,
              opacity: ease(frame, 330, 370),
            }}
          >
            Five drivers within reach of the lead, after one race of ten.
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
