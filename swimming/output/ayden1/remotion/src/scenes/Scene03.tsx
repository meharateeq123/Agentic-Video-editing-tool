import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3 - "Tan aged out of the 11-12 group in September 2025, closing that chapter with twelve
 * total National Age Group Records across two brackets, from his five records in the 10 and Under
 * category to seven more in his final 11-12 summer."
 *
 * "twelve" lands at 27.60s (+141f), "five" at 31.52s (+259f), "seven" at 33.80s (+327f).
 * The breakdown finishes at 339, so out0 = 339 + 30.
 */
const W: Win = [129, 141, 369, 395];
const ROW_AT = [259, 327];

const rowIn = (frame: number, at: number) =>
  interpolate(frame, [at, at + 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Row: React.FC<{bracket: string; count: string; k: number; first?: boolean}> = ({
  bracket,
  count,
  k,
  first,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderTop: first ? 'none' : `1px solid ${C.hairline}`,
      opacity: k,
      transform: `translateX(${(1 - k) * -22}px)`,
    }}
  >
    <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.muted}}>{bracket}</div>
    <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -1}}>{count}</div>
  </div>
);

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  return (
    <BedChain segs={chain(3)} dur={S03_DUR} wins={[W]} amp={0.06} maxBlur={14} dim={0.45}>
      <StatCard
        label="National Age Group Records"
        value="12"
        k={k}
        accent={C.amber}
        x={140}
        y={300}
        width={680}
        valueSize={150}
      />
      <Overlay k={k} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 640,
            width: 680,
            background: C.card,
            border: `1px solid ${C.hairline}`,
            borderRadius: 18,
            padding: '10px 30px 18px',
          }}
        >
          <Row first bracket="10 & Under" count="5" k={rowIn(frame, ROW_AT[0])} />
          <Row bracket="11-12" count="7" k={rowIn(frame, ROW_AT[1])} />
        </div>
      </Overlay>
    </BedChain>
  );
};
