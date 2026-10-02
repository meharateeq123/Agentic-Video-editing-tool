import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "This result ended a three-race stretch at Darlington without a top-five finish for
 * Larson... a track where his recent history had been genuinely rough, suddenly turning into one of
 * his strongest performances of the year."
 *
 * A before-and-after panel, the same device hamlin1 used for its points-lead comparison, applied to
 * a different shape of change - not one number falling, but a streak ending. Left panel stays grey
 * and unresolved; right panel is where the colour lands.
 */
const W: Win = [70, 104, 236, 276];

const BEFORE = ['No top-5 at Darlington', 'Three straight visits', 'Genuinely rough track for him'];
const AFTER = ['Led 99 laps', 'Finished 5th', 'One of his best nights of the year'];

const Panel: React.FC<{k: number; title: string; rows: string[]; accent: string; x: number}> = ({
  k,
  title,
  rows,
  accent,
  x,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: 300,
      width: 620,
      borderRadius: 16,
      background: 'rgba(10,10,13,0.88)',
      border: `1px solid ${C.hairline}`,
      borderTop: `3px solid ${accent}`,
      padding: '28px 32px 32px',
      opacity: k,
      transform: `translateY(${(1 - k) * 26}px)`,
    }}
  >
    <div style={{...labelStyle(17), color: accent}}>{title}</div>
    {rows.map((r) => (
      <div key={r} style={{fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.text, marginTop: 20}}>
        {r}
      </div>
    ))}
  </div>
);

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const a = ease(frame, 100, 132);
  const b = ease(frame, 172, 206);

  return (
    <BedChain segs={chain(14)} dur={S14_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={18}>
        <Panel k={a} title="The last three visits" rows={BEFORE} accent={C.dim} x={280} />
        <Panel k={b} title="This one" rows={AFTER} accent={C.amber} x={1020} />
      </Overlay>
    </BedChain>
  );
};
