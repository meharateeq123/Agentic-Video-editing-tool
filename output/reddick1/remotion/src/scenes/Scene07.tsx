import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease, hexA} from '../components/base';
import {RingStat, StatCard} from '../components/DataViz';
import {polyLen} from '../geo';
import {bed} from '../footage';

export const S07_DUR = 593; // 82.39 -> 102.18s

/**
 * Scene 7 — the hot-start numbers, one beat per stat, spaced across the paragraph so each lands
 * near where the line actually says it: five wins in the first nine races, seventeen races
 * leading the points, a 129-point cushion at its peak. Each card is capped at 2s total on
 * screen — reveal, a brief readable pause, then a smooth exit the moment it's done, never a
 * long lingering hold.
 */
const W1: Win = [20, 40, 55, 80];
const W2: Win = [230, 250, 265, 290];
const W3: Win = [460, 480, 495, 520];

/** Illustrative build of the points lead across the first 17 races — the shape of the climb,
 * not official week-by-week data (only the start, the 129 peak, and the race count are real). */
const LEAD_DATA: [number, number][] = [
  [0, 0],
  [1, 3],
  [3, 12],
  [5, 26],
  [7, 44],
  [9, 64],
  [12, 92],
  [15, 114],
  [17, 129],
];

const LeadGraph: React.FC<{k: number; x: number; y: number; width: number; height: number}> = ({
  k,
  x,
  y,
  width,
  height,
}) => {
  const padL = 20;
  const padR = 70;
  const padT = 74;
  const padB = 42;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const px = (race: number) => padL + (race / 17) * iw;
  const py = (lead: number) => padT + (1 - lead / 129) * ih;
  const pts = LEAD_DATA.map(([r, l]) => ({x: px(r), y: py(l)}));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const L = polyLen(pts);
  const draw = Math.max(0, Math.min(1, k * 1.15));
  const idx = Math.min(pts.length - 1, Math.floor(draw * (pts.length - 1)));
  const head = pts[idx];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        opacity: Math.min(1, k * 1.4),
        transform: `translateY(${(1 - Math.min(1, k * 1.4)) * 22}px)`,
        ...cardStyle({radius: 18, pad: 0}),
      }}
    >
      <div style={{position: 'absolute', left: 30, top: 26, ...labelStyle(19), color: C.muted}}>
        Points lead — first 17 races
      </div>
      <svg width={width} height={height} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={padL} x2={padL + iw} y1={py(0)} y2={py(0)} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <path
          d={d}
          fill="none"
          stroke={C.emerald}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={L}
          strokeDashoffset={L * (1 - draw)}
          style={{filter: `drop-shadow(0 0 12px ${hexA(C.emerald, 0.55)})`}}
        />
        {draw > 0.02 ? (
          <>
            <circle cx={head.x} cy={head.y} r={7} fill={C.emerald} stroke="#0b0b0d" strokeWidth={2.5} />
            <text
              x={head.x}
              y={head.y - 18}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={40}
              fontWeight={800}
              fill={C.text}
            >
              {`+${LEAD_DATA[idx][1]}`}
            </text>
          </>
        ) : null}
        <text x={padL} y={height - 14} fontFamily={FONT} fontSize={15} fontWeight={600} fill={C.dim} letterSpacing={1}>
          RACE 1
        </text>
        <text x={padL + iw} y={height - 14} textAnchor="end" fontFamily={FONT} fontSize={15} fontWeight={600} fill={C.dim} letterSpacing={1}>
          RACE 17
        </text>
      </svg>
    </div>
  );
};

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const k1 = ease(frame - W1[0], 0, 20);
  const arc1 = ease(frame - W1[0], 4, 26);
  const k2 = ease(frame - W2[0], 0, 20);
  const k3 = ease(frame - W3[0], 0, 20);

  return (
    <SceneBed {...bed(7)} dur={S07_DUR} wins={[W1, W2, W3]} amp={0.07} maxBlur={15} dim={0.36}>
      <Overlay k={winK(frame, W1)} rise={18}>
        <RingStat
          label="First nine races"
          value={
            <span style={{fontFamily: FONT, fontSize: 130, fontWeight: 800, color: C.text}}>
              5
            </span>
          }
          caption="Wins — a stretch no one else in the field matched."
          arc={arc1 * (5 / 9)}
          k={k1}
          accent={C.emerald}
          x={660}
          y={260}
          size={600}
        />
      </Overlay>
      <Overlay k={winK(frame, W2)} rise={18}>
        <StatCard
          label="Championship standings"
          value={
            <span style={{fontFamily: FONT, fontSize: 110, fontWeight: 800, color: C.text, letterSpacing: -3, lineHeight: 1}}>
              17 races
            </span>
          }
          caption="Led the points from the season's first lap through mid-spring."
          k={k2}
          accent={C.amber}
          x={660}
          y={400}
          width={600}
        />
      </Overlay>
      <Overlay k={winK(frame, W3)} rise={18}>
        <LeadGraph k={k3} x={640} y={340} width={640} height={400} />
      </Overlay>
    </SceneBed>
  );
};
