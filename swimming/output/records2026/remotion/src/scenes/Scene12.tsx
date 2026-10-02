import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12
 * That tension, between chasing world records and surviving a brutal championship schedule, is
 * shaping up to define the rest of the season. Douglass has not yet decided whether she will
 * attempt three world-record events back to back to back at a single meet, a physical demand that
 * even Michael Phelps avoided during his career by making strategic scratches rather than risking
 * all three.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
