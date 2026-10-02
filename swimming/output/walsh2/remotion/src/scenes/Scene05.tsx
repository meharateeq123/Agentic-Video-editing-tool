import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 73; // 14.22 -> 16.68s
export const S05_CUTS = [73];

/** Closing question over the real crowd - no riser this time, the user asked for it off. */
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Caption text="How much faster can Gretchen Walsh go?" outAt={S05_DUR - 5} fontSize={46} />
  </>
);
