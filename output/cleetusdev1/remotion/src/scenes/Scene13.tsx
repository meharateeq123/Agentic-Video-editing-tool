import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13); // 203f, 1 link

/**
 * Scene 13 -- "The Dev Diary confirmed Cleetus is back in the ARCA lineup for NASCAR 26."
 *
 * The reveal shot itself, the second and final time it appears in the film. At 6.8 seconds it is the longest single link in the cut and still inside the seven-second limit.
 */
export const Scene13: React.FC = () => <BedChain segs={chain(13)} dur={S13_DUR} />;
