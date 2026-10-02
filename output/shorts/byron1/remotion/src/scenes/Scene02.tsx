import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 104; // 3.94 -> 7.39s

const CUT_FRAMES = [52, 52];

// Rides the first cut only, so the second cut — the smoke at its thickest — plays unobstructed.
const PLATE_WIN: [number, number, number, number] = [8, 20, 36, 48];

/** Sits high: the bed is the spin itself, and the smoke fills the middle of the frame. */
const EventPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...PLATE_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 430,
        width: 820,
        opacity: k,
        transform: `translateY(${(1 - k) * 20}px)`,
        ...cardStyle({radius: 18, pad: 30}),
        borderLeft: `5px solid ${C.red}`,
      }}
    >
      <div style={{...labelStyle(18), color: C.red}}>Cook Out Southern 500</div>
      <div style={{fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 10}}>
        Darlington Raceway
      </div>
      <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 500, color: C.muted, marginTop: 10, lineHeight: 1.3}}>
        Spun late, then an engine failure
      </div>
    </div>
  );
};

/** Scene 2 — the incident, straight from Byron's own in-car camera. */
export const Scene02: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE2_CUTS[i]} dur={dur} wins={[]} amp={0.07} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <EventPlate />
      <Caption
        text="At Darlington, Byron spun late, then suffered an engine failure,"
        outAt={S02_DUR - 4}
        fontSize={40}
      />
    </>
  );
};
