import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5); // 802f, 5 links

/**
 * Scene 5 -- "He left it just a few feet short of a win... losing at the line to Andy Jankowiak."
 *
 * The closing laps, cut between the roll cage and the television cameras and ending on his own face, because that is the shape of the finish being described.
 */
export const Scene05: React.FC = () => <BedChain segs={chain(5)} dur={S05_DUR} />;
