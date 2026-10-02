import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * There is also a bigger prize sitting at the end of this comeback, beyond the medal itself. If Smith
 * reaches the podium in Los Angeles, in any color, she becomes the first athlete in South African history,
 * across every Olympic sport, to reach five individual Olympic medals. ...
 *
 * One graphic, on "reach five individual Olympic medals" (12.1s = frame 363).
 */
const W: Win = [352, 382, 430, 456];

export const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, W);
  return (
    <BedChain segs={chain(17)} dur={S17_DUR} wins={[W]} amp={0.04} maxBlur={7} dim={0.22}>
      <Overlay k={k} rise={22}>
        <StatCard
          label="First South African ever to reach"
          value="5"
          caption="individual Olympic medals"
          k={k}
          accent={C.amber}
          x={130}
          y={300}
          width={640}
          valueSize={160}
        />
      </Overlay>
    </BedChain>
  );
};
