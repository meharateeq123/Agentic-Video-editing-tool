import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8); // 1001f, 6 links

/**
 * Scene 8 -- "Real name Garrett Mitchell... 4.7 million subscribers... signing on for a part-time ARCA Menards Series schedule with Rette Jones Racing."
 *
 * The longest scene in the film. The subscriber and view figures used to sit here as two stat cards; the user cut them, since the narration already says both numbers and putting them on screen turned a scene about a driver into a channel-stats slide. Six links carry it instead.
 */
export const Scene08: React.FC = () => <BedChain segs={chain(8)} dur={S08_DUR} />;
