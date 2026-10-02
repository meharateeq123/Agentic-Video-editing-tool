import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - "For Hamlin, that's cold comfort. He's still the championship leader. But the driver
 * now sitting nine points behind him just went from a name buried in the middle of the standings
 * to the single biggest threat in the field..." Footage-only.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;
