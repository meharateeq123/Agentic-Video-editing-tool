import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4
 * Moving up a bracket resets the record book against him. A swimmer who dominates one age group
 * has to prove himself all over again against boys who are often bigger, stronger, and further
 * into puberty.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene04: React.FC = () => <BedChain segs={chain(4)} dur={S04_DUR} />;
