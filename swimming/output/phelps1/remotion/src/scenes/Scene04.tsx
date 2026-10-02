import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {winK, type Win} from '../components/Bed';
import {StatCard} from '../components/DataViz';
import {RealisticGlobe} from '../components/RealisticGlobe';
import {band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "Start with where he lives. Phelps and his family are based in Paradise Valley, Arizona
 * ... buying a 6,010 square foot home for 2.5 million dollars ..."
 *
 * The film's one globe beat: onto Paradise Valley as the narrator names it (+91f), 6s over the
 * drone footage, never the whole scene. Passed as a place with no `country` so the globe never
 * waits on a highlight texture. Later, the purchase lands on "$2.5 million" (+441f).
 */
const GLOBE_FROM = 80;
const GLOBE_DUR = 180;
const ARRIVE = 0.72;
const W: Win = [436, 466, 496, 522];

const GlobeBeat: React.FC = () => {
  const f = useCurrentFrame();
  const arrive = Math.round(GLOBE_DUR * ARRIVE);
  const o = band(f, 0, 14, arrive + 30, GLOBE_DUR);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <RealisticGlobe
        target={{name: 'Paradise Valley', lat: 33.531, lon: -111.943, sub: 'Arizona - near Scottsdale'}}
        dur={GLOBE_DUR}
        arriveAt={ARRIVE}
      />
    </AbsoluteFill>
  );
};

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.52}>
      <Sequence from={GLOBE_FROM} durationInFrames={GLOBE_DUR} layout="none">
        <GlobeBeat />
      </Sequence>
      <StatCard
        label="Paradise Valley home - December 2015"
        value="$2.5M"
        caption="6,010 sq ft, five bedrooms, six and a half baths."
        k={winK(frame, W)}
        accent={C.emerald}
        x={120}
        y={300}
        width={820}
        valueSize={140}
      />
    </BedChain>
  );
};
