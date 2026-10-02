import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {Card, ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11 - "Behind the front row, the next two spots went to a pair of drivers who know exactly
 * what it takes to win right now. Ryan Blaney, who had actually led the way in Saturday's practice
 * session, qualified third. Christopher Bell, fresh off winning the Chase-opening Southern 500 at
 * Darlington, rounded out the second row in fourth." The one lineup card in the film - rows 1-4,
 * staggered in one at a time.
 */
const W: Win = [150, 178, 298, 324];

const ROWS: {pos: string; name: string; note: string; color: string}[] = [
  {pos: '1', name: 'Joey Logano', note: 'Pole', color: C.amber},
  {pos: '2', name: 'Kyle Larson', note: 'Outside pole', color: C.steel},
  {pos: '3', name: 'Ryan Blaney', note: 'Led practice', color: C.emerald},
  {pos: '4', name: 'Christopher Bell', note: 'Won Darlington', color: C.red},
];

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  const rowK = ROWS.map((_, i) => ease(frame, 150 + i * 30, 178 + i * 30));

  return (
    <BedChain segs={chain(11)} dur={S11_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={k} rise={20}>
        <Card
          accent={C.amber}
          reveal={k}
          style={{left: 560, top: 210, width: 800, padding: '38px 44px 30px'}}
        >
          <div style={{...labelStyle(19), color: C.amber, marginBottom: 20}}>Starting Lineup - Gateway</div>
          {ROWS.map((r, i) => (
            <div
              key={r.pos}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '14px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${C.hairline}`,
                opacity: rowK[i],
                transform: `translateY(${(1 - rowK[i]) * 16}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 34,
                  fontWeight: 800,
                  color: r.color,
                  width: 48,
                }}
              >
                {r.pos}
              </div>
              <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.text, flex: 1}}>
                {r.name}
              </div>
              <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted}}>
                {r.note}
              </div>
            </div>
          ))}
        </Card>
      </Overlay>
    </BedChain>
  );
};
