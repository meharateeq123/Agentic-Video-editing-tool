import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * Which record from 2026 do you think will stand the longest? Do you think Kate Douglass attempts
 * all three of her world-record events at the same meet? Drop your predictions in the comments
 * below. I read every single one.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
