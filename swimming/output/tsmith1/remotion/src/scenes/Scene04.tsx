import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4
 * Her career before that retirement was already one of the most decorated in South African
 * sporting history. She won her first African titles as a teenager, sweeping the 50, 100, and 200
 * meter breaststroke at the 2013 African Junior Championships. By 2015, she had repeated that
 * sweep at the senior African Games. She added Commonwealth Games medals in 2022, gold in the 200
 * and silver in the 100. Every step of that career pointed toward the same two events, 100 and 200
 * meter breaststroke, the distances where she built her entire international reputation.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} amp={0.04} maxBlur={0} dim={0} />
);
