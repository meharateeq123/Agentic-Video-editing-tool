import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15
 * There is also a psychological dimension to this test that has nothing to do with lap times. In
 * the months following her breakout in Singapore, observers both inside and outside China raised
 * concerns about the pressure building around her. Reports at the time noted the risk of what some
 * described as a toxic level of sports fandom directed at someone so young, with commentators
 * cautioning against overhyping a 12-year-old before she had even entered her teenage years. Her
 * own words suggest she is aware of that spotlight. She has said that talent determines where
 * someone starts, but that going further depends on daily perseverance rather than natural ability
 * alone.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
