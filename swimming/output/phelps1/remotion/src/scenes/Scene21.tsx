import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21
 * If you want more stories on what happens to legendary athletes after they leave their sport,
 * subscribe now. Phelps proved greatness in the pool. His life today shows what comes after.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
