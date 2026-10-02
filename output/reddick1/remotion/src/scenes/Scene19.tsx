import React from 'react';
import {SceneBed} from '../components/Bed';
import {SideIntro} from '../components/SideIntro';
import {bed} from '../footage';

export const S19_DUR = 681; // 267.25 -> 289.95s

/**
 * Scene 19 — "But here's what separates Reddick from the pack. Hamlin has the points lead, but Reddick…"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push. A small side card confirms Hamlin — the broadcast's own on-screen graphic already names
 * him in this footage — without blurring or dimming the shot.
 */
export const Scene19: React.FC = () => (
  <SceneBed {...bed(19)} dur={S19_DUR} wins={[]} amp={0.1}>
    <SideIntro name="Denny Hamlin" role="No. 11 Toyota — No. 1 seed" side="left" outAt={130} />
  </SceneBed>
);
