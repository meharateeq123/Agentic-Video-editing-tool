import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 141; // 3.56 -> 8.28s
export const S02_CUTS = [65, 76];

/**
 * No stat card here - the real broadcast results board ("5 Walsh, G NYAC 29.24 54.33 1") is
 * the on-screen proof for "54.33 seconds", so the cut holds on it instead of a synthetic overlay.
 */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Caption
      text="In May, she broke her own world record again with a stunning 54.33 seconds."
      outAt={S02_DUR - 8}
      fontSize={36}
    />
  </>
);
