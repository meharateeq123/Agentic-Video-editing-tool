import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 95; // 8.68 -> 11.84s

const CUT_FRAMES = [48, 47];

// Typographic plate, not a photo card: the Legacy footage under it covers two team drivers and
// the man on camera is not individually identifiable, so nobody's face is labelled "Nemechek".
const CARD_WIN: Win = [6, 18, 34, 47];

const OutgoingPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={16}>
      <div
        style={{
          position: 'absolute',
          left: 90,
          right: 90,
          top: 700,
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
          Out of the No. 42
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
                amp={0.06}
                maxBlur={10}
                dim={0.28}
              >
                {isLast ? <OutgoingPlate /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="Replacing John Hunter Nemechek — and the timing is perfect." outAt={S03_DUR - 4} fontSize={42} />
    </>
  );
};
