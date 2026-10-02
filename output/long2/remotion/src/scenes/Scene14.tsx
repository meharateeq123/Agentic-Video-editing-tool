import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * The script attributes a specific quote to crew chief Jonathan Hassler here that could not be
 * verified in the downloaded press-conference source (PECbi9PoOjw) - it isn't in that transcript.
 * Plays as plain real footage of Hassler himself (the actual press conference) under the
 * narration, with no quote graphic making an unverified claim.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} amp={0.05} />;
