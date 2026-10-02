import React from 'react';
import {SceneBed} from '../components/Bed';
import {SideIntro} from '../components/SideIntro';
import {bed} from '../footage';

export const S01_DUR = 432; // 0.00 -> 14.41s

/**
 * Scene 1 — "The NASCAR Chase just began, and one driver already has a track record that should worry…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push. A small side card confirms who's on screen — Reddick himself, in his own Daytona 500
 * win footage — without blurring or dimming the shot.
 */
export const Scene01: React.FC = () => (
  <SceneBed {...bed(1)} dur={S01_DUR} wins={[]} amp={0.1}>
    <SideIntro name="Tyler Reddick" role="No. 45 Toyota — 23XI Racing" side="right" outAt={130} />
  </SceneBed>
);
