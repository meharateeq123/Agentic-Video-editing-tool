import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop} from './pop';

export const S03_DUR = 108; // 9.10 -> 12.70s
export const S03_CUTS = [27, 27, 27, 27];

// "Ryan Blaney" 9.26s (f5), "Chris Buescher" 10.06s (f29), Elliott's own row after "also" (f40).
// Settled at 54, so out0 = 54 + 30.
export const S03_POPS = [5, 29, 40];
const CARD_WIN: Win = [3, 9, 84, 108];

const ROWS = [
  {num: '12', name: 'Ryan Blaney', lap: 'Lap 155'},
  {num: '17', name: 'Chris Buescher', lap: 'Lap 238'},
  {num: '9', name: 'Chase Elliott', lap: 'Lap 214'},
];

/** The three Chase drivers whose brakes failed. */
const FailuresCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 880, width: 860, ...cardStyle({radius: 24, pad: 26}), borderLeft: `6px solid ${C.red}`}}>
        <div style={{...labelStyle(20), color: C.red, letterSpacing: 4}}>Brake failures at Gateway</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, S03_POPS[i]);
            return (
              <div
                key={r.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: p.k,
                  transform: `scale(${p.s})`,
                  transformOrigin: 'left center',
                }}
              >
                <div style={{...numStyle(42, C.text), width: 84, textAlign: 'center', padding: '8px 0', borderRadius: 12, background: C.redDim}}>{r.num}</div>
                <div style={{flex: 1, fontFamily: FONT, fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: -1.2}}>{r.name}</div>
                <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.red}}>{r.lap}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <FailuresCard />
    <Caption text="RYAN BLANEY and CHRIS BUESCHER also suffered BRAKE FAILURES at Gateway." outAt={98} fontSize={48} />
  </>
);
