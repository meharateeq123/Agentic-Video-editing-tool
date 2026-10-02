import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

/**
 * Scene 22
 * He is not the only fast swimmer in his own house. His older sister, Mikayla Tan, also swims
 * competitively for the same club, winning events like the 200 breaststroke at recent sectional
 * meets. Swimming families are common at the elite level, and having a sibling already navigating
 * high-level competition can be a real advantage for a younger athlete learning to handle pressure
 * and travel schedules.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene22: React.FC = () => <BedChain segs={chain(22)} dur={S22_DUR} />;
