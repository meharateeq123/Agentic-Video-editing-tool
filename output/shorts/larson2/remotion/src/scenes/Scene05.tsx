import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {SceneBed, Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE5_CUTS} from '../footage';

export const S05_DUR = 83; // 12.31 -> 15.08s

// P2 lands at 18, the arrow at 26, "WIN?" at 34 — complete at 34, so out0 = 34 + 30.
const CARD_WIN: Win = [6, 18, 64, 80];

const pop = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** The question in the VO, as a figure: P2 -> WIN? */
const P2ToWinCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const a = pop(frame, 6);
  const b = pop(frame, 14);
  const c = pop(frame, 22);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 130, top: 1040, width: 820, ...cardStyle({radius: 20, pad: 34}), borderLeft: `5px solid ${C.emerald}`}}>
        <div style={{...labelStyle(19), color: C.emerald}}>Today at Gateway</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 14}}>
          <div style={{...numStyle(140, C.steel), opacity: a, transform: `scale(${0.9 + 0.1 * a})`}}>P2</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 90,
              fontWeight: 800,
              color: C.muted,
              opacity: b,
              transform: `translateX(${(1 - b) * -30}px)`,
            }}
          >
            →
          </div>
          <div style={{...numStyle(140, C.emerald), opacity: c, transform: `scale(${0.9 + 0.1 * c})`}}>WIN?</div>
        </div>
      </div>
    </Overlay>
  );
};

export const Scene05: React.FC = () => (
  <>
    <SceneBed {...SCENE5_CUTS[0]} dur={S05_DUR} wins={[CARD_WIN]} amp={0.06} maxBlur={10} dim={0.25} accent={C.emerald} />
    <P2ToWinCard />
    <Caption text="Could he turn P2 into a HUGE victory?" outAt={S05_DUR - 4} fontSize={50} />
  </>
);
