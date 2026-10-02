import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12
 * Why walk away from swimming entirely, only to come back for a race she has never fully
 * specialized in? Smith has been candid about the burnout that led to her original retirement.
 * Years of intense competition wore her down, and by the time Paris ended, she needed real
 * distance from the sport to feel like herself again. What brought her back was not a return of
 * that old motivation. It was something entirely new. When she heard the 50 meter breaststroke
 * would debut at the Olympics for the first time, she described it as a chance to become a
 * different version of herself in the water, not simply return to the one she had already been.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene12: React.FC = () => (
  <BedChain segs={chain(12)} dur={S12_DUR} amp={0.04} maxBlur={0} dim={0} />
);
