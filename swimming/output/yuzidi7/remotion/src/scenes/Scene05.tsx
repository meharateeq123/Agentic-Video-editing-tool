import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {Ordinal} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * Yu's 200 IM (2:06.10) makes her the second-fastest woman ever - 0.40s behind McIntosh's 2:05.70.
 */
const RANK_W: Win = [60, 92, 430, 456];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, RANK_W);
  const o = Math.min(1, k * 1.3);
  return (
    <BedChain segs={chain(5)} dur={S05_DUR} wins={[RANK_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 300,
            width: 620,
            opacity: o,
            background: C.card,
            border: `1px solid ${C.hairline}`,
            borderRadius: 18,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 26px 78px rgba(0,0,0,0.62)',
            padding: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
          }}
        >
          <Ordinal n={2} size={120} color={C.amber} />
          <div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: 3.1,
                textTransform: 'uppercase',
                color: C.muted,
              }}
            >
              Fastest 200m IM ever swum
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 600,
                color: C.text,
                marginTop: 10,
                lineHeight: 1.35,
              }}
            >
              2:06.10 - just 0.40s behind McIntosh's 2:05.70
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
