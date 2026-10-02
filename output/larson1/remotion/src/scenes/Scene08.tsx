import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "Larson's crew chief, Cliff Daniels, chose to keep him on the track on four-lap-old
 * tires. Larson wasn't alone in that call. Austin Cindric, Joey Logano, and Ryan Preece also stayed
 * out."
 *
 * Four names filling in together - the call and the company he had making it. Different from
 * hamlin1's JGR list (which was about a shared achievement); this one is about a shared gamble, so
 * Larson's own name leads and is picked out, the other three follow as backup.
 */
const W: Win = [40, 68, 180, 220];

const CALL = 'Stayed out on old tires';
const NAMES = ['Kyle Larson', 'Austin Cindric', 'Joey Logano', 'Ryan Preece'];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 46, 78);

  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.08} maxBlur={15} dim={0.46}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 320,
            width: 1920,
            textAlign: 'center',
            opacity: head,
          }}
        >
          <div style={{...labelStyle(20), color: C.amber}}>{CALL}</div>
          <div style={{fontFamily: FONT, fontSize: 32, fontWeight: 500, color: C.muted, marginTop: 12}}>
            Cliff Daniels' call - and he had company
          </div>
        </div>

        <div style={{position: 'absolute', left: 0, top: 480, width: 1920, display: 'flex', justifyContent: 'center', gap: 22}}>
          {NAMES.map((name, i) => {
            const e = ease(frame, 92 + i * 10, 92 + i * 10 + 28);
            const isLarson = i === 0;
            return (
              <div
                key={name}
                style={{
                  width: 340,
                  textAlign: 'center',
                  padding: 26,
                  borderRadius: 14,
                  background: 'rgba(10,10,13,0.86)',
                  border: `1px solid ${C.hairline}`,
                  borderTop: `3px solid ${isLarson ? C.amber : C.steel}`,
                  opacity: e,
                  transform: `translateY(${(1 - e) * 24}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 27,
                    fontWeight: isLarson ? 800 : 600,
                    color: isLarson ? C.text : C.muted,
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
