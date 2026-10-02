import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "He led a race-high 99 laps, more than any other driver at Darlington that night,
 * including Stage 1 winner Tyler Reddick and eventual race winner Christopher Bell."
 *
 * A horizontal bar comparison - three bars, Larson's the longest by a wide margin, growing in the
 * order the sentence names them. Neither bell1 nor hamlin1 used a bar chart, so this is the film's
 * only one.
 */
const W: Win = [50, 82, 260, 300];

const BARS = [
  {at: 90, name: 'Kyle Larson', laps: 99, color: C.amber, max: 99},
  {at: 150, name: 'Tyler Reddick', laps: 41, color: C.steel, max: 99},
  {at: 200, name: 'Christopher Bell', laps: 34, color: C.dim, max: 99},
];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 460, top: 260, width: 1000}}>
          <div style={{...labelStyle(19), color: C.amber, marginBottom: 30}}>
            Laps led - Darlington, final stage
          </div>
          {BARS.map((b) => {
            const k = ease(frame, b.at, b.at + 30);
            const w = k * (b.laps / b.max) * 640;
            return (
              <div key={b.name} style={{marginBottom: 30, opacity: ease(frame, b.at, b.at + 14)}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                  <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.text}}>{b.name}</div>
                  <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, color: b.color}}>{b.laps}</div>
                </div>
                <div style={{width: 640, height: 20, borderRadius: 10, background: C.groundSoft}}>
                  <div
                    style={{
                      width: `${w}px`,
                      height: '100%',
                      borderRadius: 10,
                      background: b.color,
                      boxShadow: b.color === C.amber ? `0 0 18px ${C.amberDim}` : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
