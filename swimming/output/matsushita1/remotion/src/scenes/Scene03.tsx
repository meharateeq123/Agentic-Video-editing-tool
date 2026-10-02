import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 113; // 11.38 -> 15.13s
export const S03_CUTS = [56, 57];

/** His 200m split against the Japan / meet-record pace, then the race itself. */
export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Caption
      text="That performance also put him among the fastest swimmers ever in the event,"
      outAt={S03_DUR - 6}
      fontSize={42}
    />
  </>
);
