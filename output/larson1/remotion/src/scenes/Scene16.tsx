import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16 - "Nine races remain in the 10-race Chase. Forty-nine points is not a small number to
 * make up... but it's also not an insurmountable one." Scene 15 already put P7 and -49 on screen;
 * this scene is the narration reasoning about that number rather than a new figure, so it runs on
 * footage alone.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
