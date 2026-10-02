import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, capStyle, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 115; // 10.32 -> 14.17s

const CUT_FRAMES = [58, 57];

// Frames are scene-relative: the plate rides the first cut, the threats card the second.
const PLATE_WIN: [number, number, number, number] = [5, 17, 34, 50];
const CARD_WIN: Win = [10, 23, 38, 54];

/** Sits high, clear of the caption line. */
const NextUpPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...PLATE_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 470,
        width: 820,
        opacity: k,
        transform: `translateY(${(1 - k) * 20}px)`,
        ...cardStyle({radius: 18, pad: 30}),
        borderLeft: `5px solid ${C.emerald}`,
      }}
    >
      <div style={{...labelStyle(18), color: C.emerald}}>Next up</div>
      <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 10}}>
        Gateway
      </div>
      <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 10, lineHeight: 1.3}}>
        World Wide Technology Raceway
      </div>
    </div>
  );
};

/** The count only — the VO does not name the three, so neither does the card. */
const ThreatsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 620,
          width: 820,
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderLeft: `5px solid ${C.red}`,
          borderRadius: 18,
          padding: 34,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{...labelStyle(19), color: C.red}}>Toyota in the Chase</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 12}}>
          <div style={numStyle(148, C.text)}>3</div>
          <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 800, color: C.muted, letterSpacing: -1}}>
            serious threats
          </div>
        </div>
        <div style={{...capStyle(24), marginTop: 12}}>for the championship</div>
      </div>
    </Overlay>
  );
};

export const Scene05: React.FC = () => {
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
                {...SCENE5_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.06}
                maxBlur={12}
                dim={0.3}
              >
                {isLast ? <ThreatsCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <NextUpPlate />
      <Caption
        text="With Gateway next, Toyota has THREE serious championship threats."
        outAt={S05_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
