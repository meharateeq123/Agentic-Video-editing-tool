import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {CompareBars, p} from '../components/DataViz';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10
 * This is not a hopeless long shot either. Smith already has a personal best of 30.09 seconds in the
 * 50 meter breaststroke, set back in 2024. The current world record, held by Lithuania's Ruta
 * Meilutyte, sits at 29.16 seconds. A gap of under a second separates Smith's existing best from the
 * fastest woman ever to swim the event. ...
 *
 * Two graphics: the ID card lands as her name is said (11.3s = frame 339); the comparison lands on
 * "A gap of under a second" (14.2s = frame 426). 30.09 - 29.16 = 0.93s.
 */
const ID_W: Win = [325, 357, 411, 437];
const BARS_W: Win = [426, 456, 560, 586];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, BARS_W);
  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[ID_W, BARS_W]} amp={0.04} maxBlur={7} dim={0.22}>
      <IdCard
        photo="id/meilutyte.jpg"
        name="Rūta Meilutytė"
        affiliation="Lithuania · 50m breaststroke world record"
        focus={[50, 26]}
        zoom={1.5}
        win={ID_W}
      />
      <Overlay k={k} rise={22}>
        <CompareBars
          title="Women's 50m Breaststroke - best times"
          rows={[
            {name: 'MEILUTYTE (WR)', frac: 29.16 / 30.09, value: '29.16', color: C.steel},
            {name: 'SMITH (PB, 2024)', frac: 1, value: '30.09', color: C.amber},
          ]}
          k={k}
          grow={[p(frame, 460, 490), p(frame, 476, 506)]}
          x={130}
          y={330}
          width={900}
          footnote="Gap: 0.93 seconds"
          nameW={230}
        />
      </Overlay>
    </BedChain>
  );
};
