import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {FadeIn} from '../components/base';
import {C, cardStyle, labelStyle, numStyle, capStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';

export const S04_DUR = 883; // 23.82 -> 53.27s

// Six short cuts (not one held clip) covering the scene + its transition bleed (899 frames).
const CUT_FRAMES = [150, 150, 150, 150, 150, 149];

// Local to the last cut only (~5s): fades in once the narration lands on the finishing margin,
// holds through the read, leaves before the scene cuts away.
const CARD_WIN: Win = [15, 35, 120, 140];

const MarginCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div
        style={{
          position: 'absolute',
          left: 1180,
          top: 650,
          width: 610,
          ...cardStyle({radius: 18, pad: 32}),
        }}
      >
        <div style={labelStyle(19)}>Margin of victory</div>
        <div style={{...numStyle(118, C.emerald as string), marginTop: 10}}>
          5.89<span style={{fontSize: 40}}>s</span>
        </div>
        <div style={{...capStyle(21), marginTop: 8}}>clear of Brad Keselowski</div>
      </div>
    </Overlay>
  );
};

/**
 * Scene 4 — "Back in March, Reddick won the Goodyear 400 at Darlington, and it wasn't a clean,
 * easy win…" Cut across six short real moments (~5-6.5s each): Reddick's #45 leading the final
 * laps (two disjoint moments), one brief Michael Jordan reaction cut, Reddick's victory-lap
 * close-up, and the celebration donuts (two disjoint moments). The last cut carries one data
 * card — the actual finishing gap — timed to the line's own closing beat ("beat Brad Keselowski
 * by nearly six seconds"). Each cut after the first fades in over a few frames so the hard cuts
 * don't read as a single flashed frame.
 */
export const Scene04: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isLast = i === CUT_FRAMES.length - 1;
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed
                {...SCENE4_CUTS[i]}
                dur={dur}
                wins={isLast ? [CARD_WIN] : []}
                amp={0.09}
                maxBlur={13}
                dim={0.32}
              >
                {isLast ? <MarginCard /> : null}
              </SceneBed>
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </>
  );
};
