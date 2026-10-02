import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {PhotoCard} from '../components/PhotoCard';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - the close. "The rest of the championship field just got a clear look at how dangerous
 * his car can be, whether the results show it every week or not."
 *
 * The card the film has been building toward: his face beside the moment itself - the #5 leading,
 * Gibbs' onboard chasing him down. Box card, big image, per the standing style.
 */
const W: Win = [80, 110, 380, 420];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ease(frame, W[0], W[0] + 26);

  return (
    <BedChain segs={chain(19)} dur={S19_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.52}>
      <Overlay k={winK(frame, W)} rise={22}>
        <PhotoCard
          photo="id/larson-lead.jpg"
          inset={{src: 'id/larson.png', objectPosition: '50% 30%'}}
          eyebrow="Cook Out Southern 500 - Darlington"
          title="Started 25th. Led 99 laps."
          sub="Finished 5th, still winless in 51 - but the rest of the Chase field just saw exactly what his car can do."
          width={900}
          photoHeight={520}
          objectPosition="50% 45%"
          style={{
            position: 'absolute',
            left: 510,
            top: 150,
            opacity: g,
            transform: `translateY(${(1 - g) * 26}px)`,
          }}
        />
      </Overlay>
    </BedChain>
  );
};
