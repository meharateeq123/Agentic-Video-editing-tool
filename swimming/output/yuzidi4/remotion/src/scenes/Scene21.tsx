import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - "Does Yu Zidi close that four-tenths gap before Los Angeles? Does she face Summer
 * McIntosh directly at next year's World Championships in Budapest? Drop your prediction in the
 * comments below. I read every single one."
 * A pure question beat - no overlay, footage and VO alone.
 */
export const Scene21: React.FC = () => (
  <BedChain segs={chain(21)} dur={S21_DUR} amp={0.05} maxBlur={0} dim={0} />
);
