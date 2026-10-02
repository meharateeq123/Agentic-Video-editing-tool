import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {RingStat} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * Recap headline: a 13-year-old finished within 0.40 seconds of the fastest 200 IM in history.
 */
const RING_W: Win = [500, 532, 730, 756];

export const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, RING_W);
  const arc = Math.min(1, k * 1.05);
  return (
    <BedChain segs={chain(18)} dur={S18_DUR} wins={[RING_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <RingStat
          label="Seconds from the fastest 200 IM ever"
          value={
            <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 76, color: C.amber, letterSpacing: -1}}>
              0.40
            </span>
          }
          caption="At 13 years old, three years before her prime"
          arc={arc}
          k={k}
          accent={C.amber}
          x={130}
          y={280}
          size={420}
        />
      </Overlay>
    </BedChain>
  );
};
