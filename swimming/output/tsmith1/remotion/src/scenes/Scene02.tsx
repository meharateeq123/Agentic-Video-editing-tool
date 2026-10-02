import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2
 * Tatjana Smith retired the moment her final race at the 2024 Paris Olympics ended. She had just won
 * gold in the 100 meter breaststroke ... Four Olympic medals total. ... retiring at the very top.
 *
 * Two graphics, both real: the ID card lands on her name (0.2s), and the medal count lands on "Four
 * Olympic medals total" (19.1s = frame 573). Gold: Tokyo 200 br + Paris 100 br. Silver: Tokyo 100 br +
 * Paris 200 br. Each leaves ~1s after its content has finished animating in.
 */
const ID_W: Win = [8, 40, 94, 120];
const MEDALS_W: Win = [576, 606, 636, 662];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[ID_W, MEDALS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/tatjana.png"
        name="Tatjana Smith"
        affiliation="South Africa · Olympic champion"
        focus={[50, 42]}
        zoom={1.0}
        win={ID_W}
      />
      <Overlay k={winK(frame, MEDALS_W)} rise={22}>
        <StatCard
          label="Olympic medals"
          value="4"
          caption="2 gold · 2 silver, across Tokyo 2020 and Paris 2024"
          k={winK(frame, MEDALS_W)}
          accent={C.amber}
          x={130}
          y={280}
          width={620}
          valueSize={150}
        />
      </Overlay>
    </BedChain>
  );
};
