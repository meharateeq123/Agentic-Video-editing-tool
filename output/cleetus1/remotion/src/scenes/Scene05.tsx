import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {Ordinal, StatCard} from '../components/DataViz';
import {Chip, Cross, TrendArrow} from '../components/Elements';
import {bed} from '../footage';

export const S05_DUR = 233; // 50.12 -> 59.90s

/**
 * Scene 5 — the spin. Everything sits in one left-hand column so the right of
 * the frame stays on the footage: the lap context, a short red decline, the
 * finishing position as the one focal number, then the two drivers whose
 * nights it ended.
 */
const W: Win = [24, 51, 204, 229];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const lead = ease(g, 2, 26);
  const arrow = ease(g, 18, 92);
  const card = ease(g, 54, 96);
  const chip1 = ease(g, 130, 158);
  const chip2 = ease(g, 152, 180);

  return (
    <SceneBed {...bed(5)} dur={S05_DUR} wins={[W]} accent={C.red} amp={0.11} maxBlur={14} dim={0.34}>
      <Overlay k={winK(frame, W)}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 196,
            opacity: lead,
            transform: `translateY(${(1 - lead) * -14}px)`,
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4.4,
            textTransform: 'uppercase',
            color: C.muted,
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          Fewer than 20 laps to go
        </div>

        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <TrendArrow x1={196} y1={296} x2={596} y2={452} k={arrow} color={C.red} bow={52} />
        </svg>

        <StatCard
          label="Final finish"
          value={<Ordinal n={19} size={150} color={C.red} />}
          caption="Both nights ended early."
          k={card}
          accent={C.red}
          x={150}
          y={506}
          width={540}
        />

        <Chip
          text="Cleetus McFarland"
          k={chip1}
          accent={C.red}
          x={150}
          y={806}
          width={470}
          icon={<Cross k={ease(g, 142, 170)} size={26} />}
        />
        <Chip
          text="Keith Herp"
          k={chip2}
          accent={C.red}
          x={150}
          y={886}
          width={470}
          icon={<Cross k={ease(g, 164, 192)} size={26} />}
        />
      </Overlay>
    </SceneBed>
  );
};
