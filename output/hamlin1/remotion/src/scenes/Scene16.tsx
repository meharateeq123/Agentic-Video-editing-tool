import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16 - "This wasn't an isolated frustration for Hamlin involving Spire Motorsports. Spire
 * driver Carson Hocevar made contact with Brad Keselowski, spinning him into the wall."
 *
 * Two incidents from the same night, same team, shown as a pair of collision lines - driver into
 * driver, with what it cost underneath. It reads as a pattern, which is the whole point of the
 * line, and it is the only graphic in the film built as an A-into-B relationship.
 */
const W: Win = [50, 84, 268, 312];

const HITS = [
  {at: 96, a: 'Carson Hocevar', b: 'Brad Keselowski', cost: 'Spun into the wall - Stage 1 caution'},
  {at: 192, a: 'Michael McDowell', b: 'Denny Hamlin', cost: 'Right-front into the wall - finished 18th'},
];

export const Scene16: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <BedChain segs={chain(16)} dur={S16_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 300, top: 300, width: 1320}}>
          <div style={{...labelStyle(19), color: C.red, marginBottom: 26}}>
            Both Spire cars, same night
          </div>

          {HITS.map((h) => {
            const k = ease(frame, h.at, h.at + 28);
            const arrow = ease(frame, h.at + 16, h.at + 46);
            return (
              <div
                key={h.b}
                style={{
                  marginBottom: 40,
                  opacity: k,
                  transform: `translateY(${(1 - k) * 22}px)`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                  <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 700, color: C.text}}>
                    {h.a}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: `linear-gradient(to right, ${C.red} ${arrow * 100}%, ${C.hairline} ${arrow * 100}%)`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: 42,
                      fontWeight: 800,
                      color: arrow > 0.6 ? C.amber : C.muted,
                    }}
                  >
                    {h.b}
                  </div>
                </div>
                <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 12}}>
                  {h.cost}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
