import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - the recovery: forty laps nursing the car, a second and a half off the pace, a lap
 * down, repaired under caution, 18th at the flag.
 *
 * A horizontal run of beats, left to right, ending on the finishing position. Scene 4's rail was
 * vertical and counted up to a good place; this one runs the other way and ends somewhere he did
 * not want to be, which is why the last chip is the only one that carries colour.
 */
const W: Win = [56, 90, 332, 376];

const BEATS = [
  {at: 96, big: '~40', small: 'Laps run damaged'},
  {at: 156, big: '+1.5s', small: 'Off the pace'},
  {at: 216, big: '-1', small: 'Lap down'},
  {at: 276, big: 'P18', small: 'Where it finished', hot: true},
];

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const line = ease(frame, 96, 300);

  return (
    <BedChain segs={chain(12)} dur={S12_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 330,
            width: 1920,
            textAlign: 'center',
            ...labelStyle(19),
            color: C.muted,
            opacity: ease(frame, 74, 106),
          }}
        >
          Waiting for a caution that would let the crew work
        </div>

        {/* the through-line the beats sit on */}
        <div
          style={{
            position: 'absolute',
            left: 250,
            top: 500,
            width: `${line * 1420}px`,
            height: 2,
            background: C.hairlineStrong,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 400,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            gap: 78,
          }}
        >
          {BEATS.map((b) => {
            const k = ease(frame, b.at, b.at + 26);
            return (
              <div
                key={b.big}
                style={{
                  width: 280,
                  textAlign: 'center',
                  opacity: k,
                  transform: `translateY(${(1 - k) * 22}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 74,
                    fontWeight: 800,
                    color: b.hot ? C.amber : C.text,
                    letterSpacing: -3,
                    lineHeight: 1,
                  }}
                >
                  {b.big}
                </div>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    margin: '26px auto 0',
                    background: b.hot ? C.amber : C.dim,
                    boxShadow: b.hot ? `0 0 20px ${C.amberDim}` : 'none',
                  }}
                />
                <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 22}}>
                  {b.small}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
