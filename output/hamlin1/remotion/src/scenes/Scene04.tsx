import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "He started fourth and took the lead by lap 3. He finished third in Stage 1 and fourth
 * in Stage 2, banking 15 stage points."
 *
 * A run of events in order, so this is a vertical progress rail rather than scene 3's row of
 * plates: each step lights up as its own line is read, and the connecting line draws between them.
 */
const W: Win = [60, 92, 360, 400];

const STEPS = [
  {at: 96, k: 'Started', v: 'P4'},
  {at: 148, k: 'Led by lap 3', v: 'P1'},
  {at: 200, k: 'Stage 1', v: '3rd'},
  {at: 252, k: 'Stage 2', v: '4th'},
  {at: 304, k: 'Stage points banked', v: '15'},
];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const rail = ease(frame, 96, 330);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 520, top: 200, width: 900}}>
          <div style={{...labelStyle(19), color: C.amber, marginBottom: 26}}>
            How the night started
          </div>

          {/* the rail the steps hang off */}
          <div
            style={{
              position: 'absolute',
              left: 13,
              top: 74,
              width: 2,
              height: `${rail * 470}px`,
              background: C.hairlineStrong,
            }}
          />

          {STEPS.map((s) => {
            const k = ease(frame, s.at, s.at + 24);
            const lit = frame >= s.at + 6;
            return (
              <div
                key={s.k}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  marginBottom: 30,
                  opacity: k,
                  transform: `translateX(${(1 - k) * 22}px)`,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: lit ? C.amber : C.groundSoft,
                    border: `2px solid ${lit ? C.amber : C.hairlineStrong}`,
                    boxShadow: lit ? `0 0 22px ${C.amberDim}` : 'none',
                    flexShrink: 0,
                  }}
                />
                <div style={{fontFamily: FONT, fontSize: 32, fontWeight: 500, color: C.muted, flex: 1}}>
                  {s.k}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 42,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: -1.2,
                  }}
                >
                  {s.v}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
