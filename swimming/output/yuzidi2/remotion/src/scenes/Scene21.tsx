import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21
 * If you want to be here when Yu Zidi takes on her toughest field yet, subscribe now. The youngest
 * medalist in World Championship history is about to find out what comes next.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
