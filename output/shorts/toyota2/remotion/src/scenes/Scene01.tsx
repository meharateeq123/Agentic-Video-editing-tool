import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, capStyle, labelStyle, numStyle} from '../theme';
import {SCENE1_CUTS} from '../footage';

export const S01_DUR = 104; // 0.00 -> 3.48s

const CUT_FRAMES = [52, 52];

const CARD_WIN: Win = [8, 21, 34, 50];

/** The sweep itself, as a figure. No driver names: the VO does not name them in this line. */
const SweepCard: React.FC = () => {
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
        <div style={{...labelStyle(19), color: C.red}}>Cook Out Southern 500</div>
        <div style={{...numStyle(132, C.text), marginTop: 12}}>1-2-3</div>
        <div style={{...capStyle(25), marginTop: 12}}>Toyota swept the podium at Darlington</div>
      </div>
    </Overlay>
  );
};

export const Scene01: React.FC = () => {
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
                {...SCENE1_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.07}
                maxBlur={12}
                dim={0.3}
              >
                {isLast ? <SweepCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption
        text="At Darlington, Toyota drivers finished FIRST, SECOND and THIRD..."
        outAt={S01_DUR - 4}
        fontSize={42}
      />
    </>
  );
};
