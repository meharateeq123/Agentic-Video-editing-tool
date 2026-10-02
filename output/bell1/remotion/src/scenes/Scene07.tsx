import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {countTo} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 — "With 12 laps remaining, he made the winning move, getting under Larson for the lead...
 * Larson, who led a race-high 99 laps, ended up fifth. He's now gone 51 races without a win."
 *
 * A countdown card: the laps remaining is the thing the whole beat hangs on, so it counts *down*
 * to 12 while the two Larson figures sit beneath it as the cost of that pass.
 */
const W: Win = [50, 72, 118, 144];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const c = ease(frame, W[0] + 6, W[1] + 30);

  return (
    <BedChain segs={chain(7)} dur={S07_DUR} wins={[W]} amp={0.09} maxBlur={13} dim={0.38}>
      <Overlay k={k} rise={18}>
        <div style={{position: 'absolute', left: 1080, top: 250, width: 700, ...cardStyle({radius: 18, pad: 38})}}>
          <div style={{...labelStyle(18), color: C.amber}}>The pass for the lead</div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 132,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -5,
              lineHeight: 1,
              marginTop: 10,
            }}
          >
            {countTo(c, 12, 40)}
            <span style={{fontSize: 46, fontWeight: 700, color: C.muted, letterSpacing: 0}}> laps to go</span>
          </div>
          <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 14}}>
            Bell restarted fifth on new tyres. Larson stayed out on old ones.
          </div>
        </div>
        {[
          {at: 96, label: 'Laps Larson led', value: '99', note: 'Race high', accent: C.steel},
          {at: 128, label: 'Larson’s own winless run', value: '51', note: 'races', accent: C.red},
        ].map((r) => {
          const e = ease(frame, r.at, r.at + 26);
          return (
            <div
              key={r.label}
              style={{
                position: 'absolute',
                left: 1080,
                top: r.at === 96 ? 620 : 790,
                width: 700,
                opacity: e,
                transform: `translateX(${(1 - e) * 26}px)`,
                ...cardStyle({radius: 14, pad: 24}),
                borderLeft: `3px solid ${r.accent}`,
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 18,
              }}
            >
              <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.muted}}>{r.label}</div>
              <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.text, whiteSpace: 'nowrap'}}>
                {r.value}
                <span style={{fontSize: 20, fontWeight: 600, color: C.muted, marginLeft: 8}}>{r.note}</span>
              </div>
            </div>
          );
        })}
      </Overlay>
    </BedChain>
  );
};
