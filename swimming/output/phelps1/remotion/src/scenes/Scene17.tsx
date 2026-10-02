import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * His vehicles reflect the same theme as his home: comfortable rather than flashy. Reports
 * describe a Cadillac Escalade and a BMW 7 Series among his cars, high-end but far from the exotic
 * supercar collections some retired athletes accumulate. Phelps has also invested in his own
 * physical recovery, reportedly building a home wellness setup that includes cold plunge and
 * infrared sauna equipment, tools that reflect an athlete's mindset toward long-term health even
 * after competition ends.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene17: React.FC = () => <BedChain segs={chain(17)} dur={S17_DUR} />;
