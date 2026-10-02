import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17 - "Still, Hamlin was careful not to make excuses for his own team's part in it. The slow
 * pit stop that buried him in traffic was on his own crew, not on Spire Motorsports."
 *
 * This one deliberately follows the Spire graphic with nothing. The line exists to take the blame
 * back off the other team, and dropping the on-screen furniture right after a scene full of it is
 * what makes the reversal land. The bed is back on pit road, where the fault actually was.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
