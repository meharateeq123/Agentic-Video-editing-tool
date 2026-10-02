import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * In July 2025, at the World Aquatics Championships in Singapore, Yu made her international debut
 * in the 200 meter individual medley. She was 12 years old, one of the youngest swimmers ever to
 * compete at that level. She qualified for the semifinals, then advanced into the final in seventh
 * place. In an event that was not even considered her strongest, she was already racing among the
 * best swimmers alive.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene05: React.FC = () => <BedChain segs={chain(5)} dur={S05_DUR} />;
