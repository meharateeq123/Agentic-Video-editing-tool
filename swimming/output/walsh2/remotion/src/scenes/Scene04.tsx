import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 108; // 10.62 -> 14.22s
export const S04_CUTS = [108];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Caption
      text="And with another short-course season coming, the big question is simple."
      outAt={S04_DUR - 6}
      fontSize={36}
    />
  </>
);
