import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 139; // 11.10 -> 15.72s

export const S04_CUTS = [36, 34, 35, 34];

// "LA 2028" is said at 11.70s (f18): the title slams in there, the venue line at 24, the two stats
// at 30 / 36. Settled at 50, so out0 = 50 + 30. "could" starts at 13.40s (f69).
export const S04_SLAM_AT = 18;
const CARD_WIN: Win = [14, 20, 80, 106];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const ease = (frame: number, at: number, len = 12) =>
  interpolate(frame, [at, at + len], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** LA 2028: where and when the next Olympic swimming happens. */
const LaCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const slam = interpolate(frame, [S04_SLAM_AT, S04_SLAM_AT + 10], [1.8, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const venue = ease(frame, 24);
  const stats = [
    {value: 'Jul 22–30', label: 'Swimming', at: 30},
    {value: '40,000+', label: 'Seats', at: 36},
  ];
  return (
    <Overlay k={k} rise={0}>
      <div style={{position: 'absolute', left: 110, top: 900, width: 860, ...cardStyle({radius: 26, pad: 30}), borderLeft: `6px solid ${C.amber}`}}>
        <div style={{...numStyle(120, C.text), transform: `scale(${slam})`, transformOrigin: 'left center'}}>
          LA <span style={{color: C.amber}}>2028</span>
        </div>
        <div style={{...labelStyle(22), color: C.muted, marginTop: 12, opacity: venue, letterSpacing: 4}}>Olympic swimming · SoFi Stadium</div>
        <div style={{display: 'flex', gap: 18, marginTop: 20}}>
          {stats.map((s) => {
            const sk = ease(frame, s.at, 10);
            return (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.07)',
                  opacity: sk,
                  transform: `translateY(${(1 - sk) * 24}px)`,
                }}
              >
                <div style={numStyle(54, C.amber)}>{s.value}</div>
                <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.muted, marginTop: 6, textTransform: 'uppercase', letterSpacing: 2}}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <LaCard />
    <Sequence from={0} durationInFrames={68} layout="none">
      <Caption text="And with LA 2028 approaching," outAt={58} fontSize={56} />
    </Sequence>
    <Sequence from={68} durationInFrames={71} layout="none">
      <Caption text="could a NEW GENERATION take CONTROL of swimming?" outAt={58} fontSize={52} />
    </Sequence>
  </>
);
