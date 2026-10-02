import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12
 * His business interests outside advocacy have stayed close to the sport that made him famous.
 * Phelps has a long-running partnership with Aqua Sphere on a line called MP by Michael Phelps,
 * designing swimwear, goggles, and training gear for competitive and recreational swimmers. It is
 * a brand built on decades of firsthand knowledge of what a serious swimmer actually needs in the
 * water, rather than a name simply licensed for a paycheck.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
