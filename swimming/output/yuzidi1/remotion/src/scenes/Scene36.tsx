import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S36_DUR = mountedFrames(36);

/**
 * Scene 36
 * So let me leave you with this. When Yu Zidi first walked onto the world stage, she lost three
 * medals by less than a second combined. A lot of people wrote that off as a young kid who came up
 * just short. Three months later she broke a record older than she is and moved into the top ten
 * of all time.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene36: React.FC = () => <BedChain segs={chain(36)} dur={S36_DUR} />;
