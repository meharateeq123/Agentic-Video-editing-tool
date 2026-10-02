import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3
 * Yu Zidi's swimming journey started almost by accident. At age six, during a family trip to a
 * water park, she met a coach who noticed her natural feel for the water. From that chance
 * encounter, her rise through Chinese swimming has been guided by Olympic medalist Li Bingjie, a
 * mentor Yu calls her older sister.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene03: React.FC = () => <BedChain segs={chain(3)} dur={S03_DUR} />;
