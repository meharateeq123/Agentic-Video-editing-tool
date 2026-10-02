import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16 - "For Logano, the pole is the first step in a weekend he's already said matters more
 * than most. He circled this race. He needs the points. And for one lap on Saturday, he was faster
 * than anyone else in the field by a margin nobody else came close to matching. Now the only
 * question left is whether that speed shows up again on Sunday, when it actually counts." Closing
 * line - footage-only, no CTA card (matches every prior film's last-scene treatment).
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
