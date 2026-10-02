import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13
 * That kind of brand extension is common among retired Olympic champions, but few have sustained
 * it as long as Phelps has. His name recognition has stayed strong for nearly a decade after his
 * final race, partly because he has continued showing up as a commentator and analyst during
 * Olympic broadcasts, offering technical breakdowns of races most viewers would otherwise not
 * understand. That role keeps him connected to the sport without the pressure of competition, and
 * it keeps his name in front of a new generation of swimming fans who never saw him race in
 * person.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene13: React.FC = () => <BedChain segs={chain(13)} dur={S13_DUR} />;
