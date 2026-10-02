import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * Here is how it actually started, in her own words. One summer the heat was brutal, so her dad
 * took her to a water park to cool off. She liked the cold water. She spent all day floating
 * between the little kids' pools. Then a coach walked over and asked her one simple question. He
 * asked if she wanted to swim faster.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene05: React.FC = () => <BedChain segs={chain(5)} dur={S05_DUR} />;
