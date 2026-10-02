import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

/**
 * Scene 22 - "The question now isn't whether Blaney can still win the championship... The real
 * question is whether his team can find and fix whatever went wrong with those brakes... and
 * whether Blaney can put together the kind of bounce-back performance at Bristol that turns this
 * setback into a footnote instead of the moment his title hopes quietly slipped away." Closing
 * scene, footage-only - the open question is left to land on its own, no graphic.
 */
export const Scene22: React.FC = () => <BedChain segs={chain(22)} dur={S22_DUR} />;
