import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 (1096f, the film's longest) - "For most of the summer, Larson's finishing results didn't
 * match the speed his team clearly had. Darlington was the first time this season those two things
 * lined up... showing the rest of the Chase field exactly what his car is capable of."
 *
 * The reflective turn before the close. No graphic - this is the scene where the film steps back
 * and makes its actual argument in plain narration, and every number it needed (99, 5th, P7, -49,
 * 51) has already landed on screen earlier. Repeating any of them here would be reruns, not a point.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
