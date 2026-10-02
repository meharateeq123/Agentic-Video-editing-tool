import React from 'react';
import {BedChain} from '../components/BedChain';
import {IdCard} from '../components/IdCard';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 — the hook. "Christopher Bell just ended a season-long streak of heartbreak in the
 * biggest possible way."
 *
 * The line names a driver and assumes you know him, so the film opens on his face with an ID card
 * naming him outright. Both of the last two films shipped or nearly shipped without their opening
 * and closing cards, so this one and scene 21 exist first and everything else is built around them.
 */
// Graphic cards in this film hold for three seconds: fade in 20f, hold 45f, leave 25f.
const W: Win = [34, 54, 99, 124];

export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} wins={[W]} amp={0.1} maxBlur={0} dim={0}>
    <IdCard
      photo="id/bell.png"
      name="Christopher Bell"
      affiliation="No. 20 — Joe Gibbs Racing, NASCAR Cup Series"
      win={W}
      focus={[50, 40]}
      zoom={1.15}
    />
  </BedChain>
);
