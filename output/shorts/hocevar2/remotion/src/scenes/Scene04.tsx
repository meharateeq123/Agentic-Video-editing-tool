import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';
import {pop, slam} from './pop';

export const S04_DUR = 114; // 12.10 -> 15.90s
export const S04_CUTS = [57, 57];

// Rows pop at 10 / 16 ("Hocevar is now ninth", 12.44s); "88" is said at 14.26s (f65) and the -88
// chip slams in there, settling at 75, so out0 = 75 + 30.
export const S04_POPS = [10, 16];
export const S04_SLAM_AT = 65;
const CARD_WIN: Win = [8, 14, 105, 114];

const ROWS = [
  {pos: '1', name: 'Denny Hamlin', pts: '2,168', hot: false},
  {pos: '9', name: 'Carson Hocevar', pts: '2,080', hot: true},
];

/** Hocevar against the points leader after Gateway. */
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
                <div style={{...numStyle(50, r.hot ? C.amber : C.muted), width: 44}}>{r.pos}</div>
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
                    −88
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
    <Caption text="Hocevar is now NINTH, but he's still 88 POINTS behind HAMLIN." outAt={100} fontSize={50} />
  </>
);
