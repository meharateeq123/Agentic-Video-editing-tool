import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "Certainly not the finish we were hoping for... our car was actually the best right
 * before that wreck in stage three."
 *
 * The third quote in a row would be the third quote card in a row. Scenes 6 and 9 already carried
 * his words on screen; this one is left to the voiceover over his own face, so the device does not
 * wear out.
 */
export const Scene13: React.FC = () => <BedChain segs={chain(13)} dur={S13_DUR} />;
