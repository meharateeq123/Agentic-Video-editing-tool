import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3); // 440f, 3 links

/**
 * Scene 3 -- "there had been little confirmation either way about whether Cleetus would return... This Dev Diary settled that question. He is in."
 *
 * His own words either side of a shot of him on camera. The question is about him, so the footage is him, not a menu screen.
 */
export const Scene03: React.FC = () => <BedChain segs={chain(3)} dur={S03_DUR} />;
