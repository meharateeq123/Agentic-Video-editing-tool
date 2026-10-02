import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 — "he was fending off four different championship-eligible drivers at once: his teammate
 * Ty Gibbs, polesitter Tyler Reddick, Ryan Blaney, and Larson."
 *
 * The narration lists four names in order, so the graphic lists them in that order, arriving one at
 * a time as each is spoken, each with what made them a threat that night.
 */
const W: Win = [40, 66, 300, 330];

const CHASERS = [
  {at: 70, name: 'Ty Gibbs', note: 'Teammate — finished 2nd'},
  {at: 118, name: 'Tyler Reddick', note: 'Polesitter — won Stage 1'},
  {at: 166, name: 'Ryan Blaney', note: 'Championship contender'},
  {at: 214, name: 'Kyle Larson', note: 'Led a race-high 99 laps'},
];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.44}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 150, top: 250, width: 880}}>
          <div style={{...labelStyle(20), color: C.amber, marginBottom: 22}}>
            Behind Bell at the flag — all four still in the Chase
          </div>
          {CHASERS.map((r) => {
            const k = ease(frame, r.at, r.at + 26);
            return (
              <div
                key={r.name}
                style={{
                  ...cardStyle({radius: 14, pad: 22}),
                  marginBottom: 14,
                  opacity: k,
                  transform: `translateX(${(1 - k) * -30}px)`,
                  borderLeft: `3px solid ${C.steel}`,
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 20,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text}}>{r.name}</div>
                <div style={{fontFamily: FONT, fontSize: 18, fontWeight: 500, color: C.muted, whiteSpace: 'nowrap'}}>
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
