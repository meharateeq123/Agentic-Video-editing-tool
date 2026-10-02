import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S04_DUR = 84; // 12.70 -> 15.50s
export const S04_CUTS = [84];

// Rows pop at 2 / 8; "93" is said at 13.58s (f26) and the -93 chip slams in there, settling at 36,
// so out0 = 36 + 30.
export const S04_POPS = [2, 8];
export const S04_SLAM_AT = 26;
const CARD_WIN: Win = [0, 6, 66, 90];

const ROWS = [
  {pos: '1', name: 'Denny Hamlin', pts: '2,168', hot: false},
  {pos: '11', name: 'Chase Elliott', pts: '2,075', hot: true},
];

/** Elliott against the points leader after Gateway. */
const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const s = slam(frame, S04_SLAM_AT);
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 940, width: 860, ...cardStyle({radius: 24, pad: 26}), borderLeft: `6px solid ${C.amber}`}}>
        <div style={{...labelStyle(18), color: C.amber}}>Chase standings after Gateway</div>
        <div style={{marginTop: 8}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, S04_POPS[i]);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: p.k,
                  transform: `scale(${p.s})`,
                  transformOrigin: 'left center',
                }}
              >
                <div style={{...numStyle(50, r.hot ? C.amber : C.muted), width: 64}}>{r.pos}</div>
                <div style={{flex: 1}}>
                  <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: -1.2, lineHeight: 1.05}}>{r.name}</div>
                  <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.muted, marginTop: 4}}>{r.pts} pts</div>
                </div>
                {r.hot ? (
                  <div
                    style={{
                      ...numStyle(70, C.amber),
                      padding: '8px 18px',
                      borderRadius: 14,
                      background: C.amberDim,
                      opacity: s.k,
                      transform: `scale(${s.s})`,
                    }}
                  >
                    −93
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.2} />
    <GapCard />
    <Caption text="Elliott is now 93 POINTS behind HAMLIN." outAt={72} fontSize={56} />
  </>
);
