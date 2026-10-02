import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 129; // 8.92 -> 13.24s

const CUT_FRAMES = [60, 69];

// "afford" is said at 11.70s = scene frame 83. Rows land at 80 and 88 - complete at 100, so
// out0 = 100 + 30.
const ROW_AT = [80, 88];
const CARD_WIN: Win = [68, 80, 130, 139];

const RESULTS = [
  {track: 'Darlington', pos: 'P18'},
  {track: 'Gateway', pos: 'P9'},
];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Hamlin's two Chase races so far. */
const FinishCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 1000, width: 860, ...cardStyle({radius: 20, pad: 28}), borderLeft: `5px solid ${C.red}`}}>
        <div style={{...labelStyle(18), color: C.muted}}>Denny Hamlin — Chase finishes so far</div>
        <div style={{marginTop: 8}}>
          {RESULTS.map((r, i) => {
            const rk = rowIn(frame, ROW_AT[i]);
            return (
              <div
                key={r.track}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                  opacity: rk,
                  transform: `translateX(${(1 - rk) * -26}px)`,
                }}
              >
                <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 800, color: C.text, letterSpacing: -1.5}}>{r.track}</div>
                <div style={numStyle(60, C.red)}>{r.pos}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={8} dim={0.25} />
    <FinishCard />
    <Sequence from={0} durationInFrames={60} layout="none">
      <Caption text="Larson is suddenly RIGHT BEHIND HIM," outAt={54} fontSize={50} />
    </Sequence>
    <Sequence from={62} durationInFrames={67} layout="none">
      <Caption text="...and Hamlin can't afford another BAD FINISH." outAt={60} fontSize={46} />
    </Sequence>
  </>
);
