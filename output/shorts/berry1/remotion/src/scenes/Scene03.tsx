import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 92; // 8.82 -> 11.9s

const CUT_FRAMES = [46, 46];

// Full-width bold name plate — not a small corner card — timed to "John Hunter Nemechek."
// No verified real photo of Nemechek was available to confirm at this offset, so this stays a
// typographic beat over the real (verified) broadcast footage rather than risk showing the
// wrong driver's face.
const CARD_WIN: Win = [6, 18, 32, 46];

const NemechekPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={16}>
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 720,
          padding: '30px 34px',
          background: C.card,
          border: `1px solid ${C.hairlineStrong}`,
          borderLeft: `5px solid ${C.red}`,
          borderRadius: 14,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 20, color: C.red, letterSpacing: 1.3, textTransform: 'uppercase'}}>
          Exiting the No. 42
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 52,
            letterSpacing: -1.5,
            color: '#ffffff',
            marginTop: 6,
            textTransform: 'uppercase',
          }}
        >
          John Hunter Nemechek
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const isLast = i === CUT_FRAMES.length - 1;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed
                {...SCENE3_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.07}
                maxBlur={10}
                dim={0.28}
              >
                {isLast ? <NemechekPlate /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="Replacing John Hunter Nemechek — and the timing is wild." outAt={S03_DUR - 4} fontSize={42} />
    </>
  );
};
