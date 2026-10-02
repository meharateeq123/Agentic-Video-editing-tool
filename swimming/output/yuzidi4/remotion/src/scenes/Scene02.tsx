import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "By the time the race ends... 2 minutes 6.10 seconds. An Asian record. A world junior
 * record. The second-fastest 200 IM ever swum... a margin of just four tenths of a second."
 * The reveal: the big number lands on "6.10" (2.83s = frame 85), the three record tags stack after.
 */
const W: Win = [78, 90, 540, 558];
const TAGS = ['ASIAN RECORD', 'WORLD JUNIOR RECORD', '2ND-FASTEST 200 IM EVER'];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[W]} amp={0.06} maxBlur={13} dim={0.32}>
      <Overlay k={winK(frame, W)} rise={22}>
        <StatCard
          label="Women's 200m Individual Medley - Final"
          value="2:06.10"
          k={winK(frame, W)}
          accent={C.amber}
          x={130}
          y={230}
          width={620}
          valueSize={140}
        />
        <div style={{position: 'absolute', left: 130, top: 470}}>
          {TAGS.map((t, i) => {
            const e = ease(frame, 95 + i * 14, 107 + i * 14);
            return (
              <div
                key={t}
                style={{
                  opacity: e,
                  transform: `translateX(${(1 - e) * -20}px)`,
                  fontFamily: FONT,
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: C.text,
                  marginTop: i === 0 ? 0 : 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{width: 8, height: 8, borderRadius: 4, background: C.amber}} />
                {t}
              </div>
            );
          })}
        </div>
      </Overlay>
    </BedChain>
  );
};
