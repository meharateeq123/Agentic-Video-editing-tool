import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - "Bristol is a completely different animal than Gateway, a short, high-banked track
 * where track position and car control matter more than outright speed..." Real Bristol drone
 * footage, second angle.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
