import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {USMap, Route, Pin, PinLabel, type FlatOpts} from '../components/Maps';
import {PhotoCard} from '../components/PhotoCard';
import {TRACKS, flat} from '../geo';
import {ease, band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20 - the close. "That next test comes at World Wide Technology Raceway at Gateway, where
 * Hamlin is the defending race winner."
 *
 * The map is a **six-second beat**, not the scene. On the last film the globe held all eighteen
 * seconds of its scene with no footage under it and the user's note was blunt - too much time on
 * the map animation, don't do it again. So here the route draws over the Gateway footage, clears by
 * frame 210, and the rest of the scene belongs to the picture and the end card.
 */
const MAP: Win = [20, 44, 168, 204];
const CARD: Win = [280, 316, 338, 379];

const OPTS: FlatOpts = {lon0: -96, lat0: 37, scale: 30, cx: 960, cy: 520};

const D = flat(TRACKS.darlington.ll, OPTS);
const G = flat(TRACKS.gateway.ll, OPTS);

export const Scene20: React.FC = () => {
  const frame = useCurrentFrame();

  const mapK = band(frame, MAP[0], MAP[1], MAP[2], MAP[3]);
  const draw = ease(frame, 26, 96);
  const kD = ease(frame, 44, 78);
  const route = ease(frame, 74, 140);
  const kG = ease(frame, 118, 152);

  const cardK = winK(frame, CARD);
  const g = ease(frame, CARD[0], CARD[0] + 28);

  return (
    <BedChain segs={chain(20)} dur={S20_DUR} wins={[MAP, CARD]} amp={0.07} maxBlur={16} dim={0.5}>
      <AbsoluteFill style={{opacity: mapK}}>
        <USMap opts={OPTS} draw={draw}>
          <Route pts={[D, G]} k={route} color={C.amber} march={frame * 0.7} />
          <Pin x={D.x} y={D.y} k={kD} color={C.steel} scale={1.4} />
          <Pin x={G.x} y={G.y} k={kG} color={C.amber} scale={1.4} />
        </USMap>
        <PinLabel x={D.x} y={D.y} k={kD} text="Darlington" sub="Round 1 - finished 18th" align="right" />
        <PinLabel
          x={G.x}
          y={G.y}
          k={kG}
          text="Gateway"
          sub="Round 2 - Hamlin defending"
          align="left"
          dy={-46}
        />
      </AbsoluteFill>

      <Overlay k={cardK} rise={24}>
        <PhotoCard
          photo="id/hamlin-contact.jpg"
          inset={{src: 'id/hamlin.png', objectPosition: '50% 30%'}}
          eyebrow="Nine races left to decide it"
          title="Still leading. Barely."
          sub="A 25-point cushion became 12 in a single night - and second place is his own teammate."
          width={900}
          photoHeight={520}
          objectPosition="50% 55%"
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
