import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 70; // 16.43 -> 18.76s
export const S04_CUTS = [70];

/** Real celebration footage, sparklers and all — the closing question over her own moment. */
export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Caption text="So who can stop Melissa now?" outAt={S04_DUR - 5} fontSize={48} />
  </>
);
