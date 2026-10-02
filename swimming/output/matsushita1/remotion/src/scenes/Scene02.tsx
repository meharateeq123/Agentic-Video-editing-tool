import React from 'react';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 220; // 4.03 -> 11.38s
export const S02_CUTS = [46, 46, 36, 51, 41];

/** The real finish graphic ("5 Nihon-shin 4:05.83") lands on the "4:05.83" line - no stat card. */
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Caption
      text="At Japan's 2026 Inter-College Championships, he clocked an incredible 4:05.83, setting an Asian record."
      outAt={S02_DUR - 8}
      fontSize={38}
    />
  </>
);
