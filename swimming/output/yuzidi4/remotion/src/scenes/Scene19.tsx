import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

// Scene 19 - "The backstroke leg remains the clearest place to look for where that gap could
// close... the four tenths separating her from McIntosh's record could come from that single fifty
// meters alone." Footage only - the number was already shown in scene 6.
export const Scene19: React.FC = () => (
  <BedChain segs={chain(19)} dur={S19_DUR} amp={0.05} maxBlur={0} dim={0} />
);
