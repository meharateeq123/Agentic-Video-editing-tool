import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10
 * In 2018, Phelps partnered with Talkspace, an online therapy company, joining its advisory board
 * and becoming one of the most recognizable faces in the push to normalize mental health
 * treatment. This was not a random celebrity endorsement. Phelps has spoken publicly and
 * repeatedly about his own struggles with depression, including a period after the 2012 Olympics
 * when he has said he considered ending his life. In interviews, he has described mental health
 * advocacy as work that means more to him than his medal count.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
