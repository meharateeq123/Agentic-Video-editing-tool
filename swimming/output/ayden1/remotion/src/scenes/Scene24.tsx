import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S24_DUR = mountedFrames(24);

/**
 * Scene 24
 * Tan has stayed with the same program through his transition from the 11-12 bracket into 13-14,
 * giving his coaches continuity in how they manage his training load, technique work, and race
 * schedule. That kind of stability is often cited by coaches as one of the quieter factors behind
 * a swimmer's ability to keep improving year after year, rather than plateauing after an explosive
 * start.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene24: React.FC = () => <BedChain segs={chain(24)} dur={S24_DUR} />;
