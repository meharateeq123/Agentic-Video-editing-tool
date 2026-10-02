import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * Every one of these swims shares a common thread. None of them came from swimmers with one
 * specialty. Douglass holds records in a sprint event and an Olympic title in an endurance event.
 * Walsh dominates two different strokes at two different distances. McIntosh holds records across
 * freestyle, butterfly, and both individual medley distances. The fastest swimmers of 2026 are not
 * narrow specialists. They are attacking the record book from every direction at once.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
