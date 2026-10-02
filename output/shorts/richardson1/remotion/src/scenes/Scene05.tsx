import React from 'react';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 63; // 14.44 -> 16.52s
export const S05_CUTS = [32, 31];

// The only scene with no caption track: the type IS the line. "Athlos" is said at 15.32s = scene
// frame 26 and "London" at 16.00s = frame 47, and each word lands on its own word. The last thing
// to animate is the sub at 53, and the scene ends 10 frames later, so the dip into scene 6 takes
// the type out rather than a fade of its own.
export const S05_ATS = [26, 47];
const TYPE_WIN: Win = [20, 27, 63, 73];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.22} />
    <BigType lines={['Athlos', 'London']} ats={S05_ATS} sub="Sep 18 · StoneX Stadium" subAt={53} win={TYPE_WIN} />
  </>
);
