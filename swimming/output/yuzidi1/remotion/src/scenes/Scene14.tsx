import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * Now, Singapore. The 2025 World Aquatics Championships. This is the meet the whole video has been
 * building toward, because this is where the world finally saw her live.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
