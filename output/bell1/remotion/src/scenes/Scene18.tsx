import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 — "Bell's win made 2026 the first season since 2019 that all four Joe Gibbs Racing
 * drivers have won a race in the same year."
 *
 * Four names in one row, filling in together rather than one at a time — the point is the complete
 * set, not the sequence, which is what separates this from scene 8's four-contender list.
 */
const W: Win = [40, 66, 220, 250];

const JGR = ['Christopher Bell', 'Ty Gibbs', 'Denny Hamlin', 'Chase Briscoe'];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const head = ease(frame, 48, 78);

  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.46}>
      <Overlay k={k} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 320,
            width: 1920,
            textAlign: 'center',
            opacity: head,
            transform: `translateY(${(1 - head) * 20}px)`,
          }}
        >
          <div style={{...labelStyle(20), color: C.amber}}>All four Joe Gibbs Racing drivers won in 2026</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 500,
              color: C.muted,
              marginTop: 12,
            }}
          >
            The first time since 2019
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 480,
            width: 1920,
            display: 'flex',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          {JGR.map((name, i) => {
            const e = ease(frame, 92 + i * 10, 92 + i * 10 + 28);
            const isBell = i === 0;
            return (
              <div
                key={name}
                style={{
                  ...cardStyle({radius: 14, pad: 26}),
                  width: 340,
                  textAlign: 'center',
                  opacity: e,
                  transform: `translateY(${(1 - e) * 24}px)`,
                  borderTop: `3px solid ${isBell ? C.amber : C.steel}`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 27,
                    fontWeight: isBell ? 800 : 600,
                    color: isBell ? C.text : C.muted,
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
