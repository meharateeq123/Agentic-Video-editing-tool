import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "Phelps married Nicole Johnson, a former Miss California USA ... four sons: Boomer ...
 * Beckett ... Maverick ... Nico ..."
 *
 * Two photo cards, both real frames:
 *   - Nicole, from the couple's own wedding film (Brides), on "Nicole" (+102f).
 *   - the family - Nicole, Michael and their four boys - on "Boomer" (+395f).
 * PhotoCard eases in over 26f, so each window is [a, a+30, a+56, a+82].
 */
const W1: Win = [97, 127, 153, 179];
const W2: Win = [390, 420, 446, 472];

export const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = ease(frame, W1[0], W1[0] + 26);
  const g2 = ease(frame, W2[0], W2[0] + 26);
  return (
    <BedChain segs={chain(15)} dur={S15_DUR} wins={[W1, W2]} amp={0.06} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W1)} rise={22}>
        <PhotoCard
          photo="id/nicole-bride.jpg"
          eyebrow="Married June 2016"
          title="Nicole Johnson"
          sub="Former Miss California USA."
          width={900}
          photoHeight={520}
          objectPosition="62% 22%"
          accent={C.amber}
          style={{position: 'absolute', left: 510, top: 130, opacity: g1, transform: `translateY(${(1 - g1) * 26}px)`}}
        />
      </Overlay>
      <Overlay k={winK(frame, W2)} rise={22}>
        <PhotoCard
          photo="id/phelps-family.jpg"
          eyebrow="Four sons"
          title="Boomer, Beckett, Maverick, Nico"
          sub="Born 2016, 2018, 2019 and 2024."
          width={900}
          photoHeight={520}
          objectPosition="50% 40%"
          accent={C.steel}
          style={{position: 'absolute', left: 510, top: 130, opacity: g2, transform: `translateY(${(1 - g2) * 26}px)`}}
        />
      </Overlay>
    </BedChain>
  );
};
