import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, capStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';

export const S03_DUR = 83; // 5.37 -> 8.12s

const CUT_FRAMES = [42, 41];

const CARD_WIN: Win = [5, 17, 28, 39];

const PointsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 640,
          width: 820,
          background: C.card,
          border: `1px solid ${C.hairline}`,
          borderLeft: `5px solid ${C.amber}`,
          borderRadius: 18,
          padding: 34,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{...labelStyle(19), color: C.amber}}>Bell behind the Chase leader</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 12}}>
          <div style={numStyle(148, C.text)}>12</div>
          <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.muted, letterSpacing: -1}}>points</div>
        </div>
        <div style={{...capStyle(24), marginTop: 12}}>Denny Hamlin leads the standings</div>
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
                maxBlur={12}
                dim={0.32}
              >
                {isLast ? <PointsCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Caption text="Now Bell sits just 12 points behind Denny Hamlin," outAt={S03_DUR - 3} fontSize={42} />
    </>
  );
};
