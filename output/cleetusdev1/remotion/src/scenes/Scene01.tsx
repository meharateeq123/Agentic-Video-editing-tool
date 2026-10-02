import React from 'react';
import {BedChain} from '../components/BedChain';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import type {Win} from '../components/Bed';

export const S01_DUR = mountedFrames(1); // 586f, 4 links

/**
 * Scene 1 — the hook. "Cleetus McFarland just showed up somewhere NOBODY expected…"
 *
 * The line only works if the viewer knows who is being talked about, so the film opens on
 * Cleetus himself — official NASCAR footage of him out of the car at Talladega, named on
 * screen by an ID card carrying his own photo. The card is the photo `IdCard`, not the
 * lighter text-only treatment: a face is what makes "this guy" land in the first seconds.
 *
 * Nineteen seconds is far too long for one shot — the first cut ran the whole hook on a single
 * interview and the user called it out — so it runs as four links of about five seconds: him on
 * camera under the card, the race itself, him again, then his post-race face.
 */
// Graphic cards in this film hold for three seconds, not two: fade in 20f, hold 45f, leave 25f.
const W: Win = [34, 54, 99, 124];

export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.1} maxBlur={0} dim={0}>
    <IdCard
      photo="id/cleetus.png"
      name="Cleetus McFarland"
      affiliation="Garrett Mitchell — No. 30, ARCA Menards Series"
      win={W}
      focus={[50, 42]}
      zoom={1.15}
    />
  </BedChain>
);
