import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19
 * That distinction matters more than it might sound. Age group swimming is full of athletes who
 * look unbeatable against their own bracket, only to find the gap close fast once they move up.
 * Some of that is simple physics: a growth spurt for a competitor can erase a full second of
 * advantage in a single season.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;
