import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "Hamlin is still the points leader. That part hasn't changed. But the driver with the
 * biggest cushion in the field now has the smallest room for error."
 *
 * A before-and-after panel: what he walked in with against what he walked out with. Scene 14
 * already animated the points number, so this one does not repeat it - it sets the whole position
 * side by side, seed and gap and who is behind him, which is the part that actually changed.
 */
const W: Win = [46, 80, 220, 260];

const BEFORE = [
  ['Seed', 'No. 1'],
  ['Cushion', '25 points'],
  ['Second place', 'Another team'],
];
const AFTER = [
  ['Seed', 'No. 1'],
  ['Cushion', '12 points'],
  ['Second place', 'His own teammate'],
];

const Panel: React.FC<{
  k: number;
  title: string;
  rows: string[][];
  accent: string;
  x: number;
}> = ({k, title, rows, accent, x}) => (
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
    {rows.map(([label, value]) => (
      <div
        key={label}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 20,
          marginTop: 26,
        }}
      >
        <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 500, color: C.muted}}>{label}</div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 700,
            color: C.text,
            textAlign: 'right',
          }}
        >
          {value}
        </div>
      </div>
    ))}
  </div>
);

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const a = ease(frame, 84, 116);
  const b = ease(frame, 156, 190);

  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={18}>
        <Panel k={a} title="Walking into Darlington" rows={BEFORE} accent={C.steel} x={280} />
        <Panel k={b} title="Walking out of it" rows={AFTER} accent={C.amber} x={1020} />
      </Overlay>
    </BedChain>
  );
};
