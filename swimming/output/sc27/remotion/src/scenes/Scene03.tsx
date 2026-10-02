import React from 'react';
import {Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 142; // 6.06 -> 10.80s

const CUT_FRAMES = [50, 45, 47];

// "World Cup" is said at 6.22s (f5): the three stops land at 6 / 12 / 18. "World Short Course
// Championships" at 8.24s (f65): the Beijing row lands there and completes at 77, so
// out0 = 77 + 30.
const CARD_WIN: Win = [2, 12, 107, 133];

const STOPS = [
  {city: 'Baku', country: 'Azerbaijan', dates: 'Oct 1–3', at: 6},
  {city: 'Tashkent', country: 'Uzbekistan', dates: 'Oct 8–10', at: 12},
  {city: 'Astana', country: 'Kazakhstan', dates: 'Oct 15–17', at: 18},
];
const WORLDS_AT = 65;

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{city: string; country: string; dates: string; k: number; hot?: boolean; first?: boolean}> = ({
  city,
  country,
  dates,
  k,
  hot,
  first,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderTop: first ? 'none' : `1px solid ${C.hairline}`,
      opacity: k,
      transform: `translateX(${(1 - k) * -26}px)`,
    }}
  >
    <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
      <div style={{fontFamily: FONT, fontSize: hot ? 46 : 40, fontWeight: 800, color: C.text, letterSpacing: -1.2}}>{city}</div>
      <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.muted}}>{country}</div>
    </div>
    <div style={{fontFamily: FONT, fontSize: hot ? 40 : 34, fontWeight: 800, color: hot ? C.amber : C.steel, fontVariantNumeric: 'tabular-nums'}}>
      {dates}
    </div>
  </div>
);

/** The road to Beijing: the three World Cup stops, then the 25m Worlds. */
const ScheduleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD_WIN);
  const w = rowIn(frame, WORLDS_AT);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 110, top: 820, width: 860, ...cardStyle({radius: 22, pad: 28}), borderLeft: `5px solid ${C.steel}`}}>
        <div style={{...labelStyle(18), color: C.steel}}>Swimming World Cup 2026 · 25m</div>
        <div style={{marginTop: 6}}>
          {STOPS.map((s, i) => (
            <Row key={s.city} {...s} k={rowIn(frame, s.at)} first={i === 0} />
          ))}
        </div>
        <div style={{marginTop: 18, paddingTop: 16, borderTop: `2px solid ${C.hairlineStrong}`, opacity: w}}>
          <div style={{...labelStyle(18), color: C.amber}}>World Championships (25m) 2026</div>
          <Row city="Beijing" country="China" dates="Dec 1–6" k={w} hot first />
        </div>
      </div>
    </Overlay>
  );
};

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={CUT_FRAMES} wins={[CARD_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <ScheduleCard />
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="The WORLD CUP begins in OCTOBER" outAt={48} fontSize={54} />
    </Sequence>
    <Sequence from={58} durationInFrames={84} layout="none">
      <Caption text="before the WORLD SHORT COURSE CHAMPIONSHIPS arrive in BEIJING." outAt={72} fontSize={48} />
    </Sequence>
  </>
);
