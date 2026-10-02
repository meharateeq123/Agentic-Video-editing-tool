import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * He also stayed connected to competitive swimming itself. Phelps has worked as a volunteer
 * assistant coach for the Arizona State University swim team alongside Bob Bowman, the same coach
 * who guided him through his entire competitive career. That relationship, spanning more than two
 * decades, is rare in elite sports, where athletes and coaches often part ways once competition
 * ends.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
