import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15
 * History backs that expectation up. Short course seasons have historically produced their own
 * wave of record swims separate from the long course marks set earlier in the year, since the
 * extra walls reward different skills like underwater speed and turn technique. Swimmers who had a
 * big long course summer often carry that same form, sometimes even sharper form, into the short
 * course months that follow. If 2026's long course season is any indication, the short course
 * record book may not survive the year untouched either.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
