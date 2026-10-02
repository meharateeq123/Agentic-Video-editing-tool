import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11
 * Versatility like that comes with a cost, and 2026 exposed it. At the Pan Pacific Championships
 * in August, McIntosh finished ninth in the heats of the women's 400 meter freestyle, an event she
 * still holds the world record in, missing the championship final by one spot. She had ranked
 * first in the world that season by nearly four seconds. A single miscalculated heat swim was
 * enough to knock the world record holder out of the final. It was a reminder that even the
 * fastest swimmers alive can be beaten by their own schedule, not just by other competitors.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene11: React.FC = () => <BedChain segs={chain(11)} dur={S11_DUR} />;
