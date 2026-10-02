import React from 'react';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {TimeCompare} from '../components/Stamp';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 76; // 11.90 -> 14.44s
export const S05_CUTS = [38, 38];

// "4:23.65" is said at 12.80s = scene frame 27, so the world-record row lands there and the gap
// between the two times lands after it. The scene ends 10 frames after the gap settles, so the
// whipDown into scene 6 takes the type out instead of a fade of its own.
export const S05_ROW_ATS = [2, 27];
export const S05_DELTA_AT = 45;
const TYPE_WIN: Win = [0, 6, 76, 86];

const ROWS = [
  {time: '4:28.01', label: 'Pan Pacs'},
  {time: '4:23.65', label: 'World record', hot: true},
];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[TYPE_WIN]} amp={0.06} maxBlur={6} dim={0.24} />
    <TimeCompare rows={ROWS} ats={S05_ROW_ATS} delta="+4.36s" deltaAt={S05_DELTA_AT} win={TYPE_WIN} />
    <Caption text="than her WORLD RECORD of 4:23.65." outAt={58} fontSize={52} />
  </>
);
