import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {RingStat} from '../components/DataViz';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8
 * Yu Yiting out-qualified Yu Zidi by over half a second in the 200 IM heats; by the final, Zidi
 * had turned that into a 1.89s win.
 */
const ID_W: Win = [10, 42, 260, 286];
const RING_W: Win = [400, 432, 700, 726];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, RING_W);
  const arc = Math.min(1, k * 1.15);
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[ID_W, RING_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/yiting.jpg"
        name="Yu Yiting"
        affiliation="China · Yu Zidi's teammate"
        focus={[50, 35]}
        zoom={1.2}
        win={ID_W}
      />
      <Overlay k={k} rise={22}>
        <RingStat
          label="Final margin over Yiting"
          value={
            <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.text, letterSpacing: -1}}>
              1.89s
            </span>
          }
          caption="Reversed a 0.53s heats deficit"
          arc={arc}
          k={k}
          accent={C.amber}
          x={130}
          y={300}
          size={420}
        />
      </Overlay>
    </BedChain>
  );
};
