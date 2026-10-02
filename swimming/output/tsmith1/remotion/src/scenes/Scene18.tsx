import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * What makes this story different from a typical athlete comeback is the target itself. Most
 * comebacks chase old records or attempt to reclaim a title that was lost. Smith is doing neither.
 * She retired as a champion in her original events and has no plans to return to them. Instead,
 * she picked the one event in the entire sport with no past champions, no existing Olympic record,
 * and no expectations built from history, and decided that was the exact challenge worth coming
 * back for.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} amp={0.04} maxBlur={0} dim={0} />
);
