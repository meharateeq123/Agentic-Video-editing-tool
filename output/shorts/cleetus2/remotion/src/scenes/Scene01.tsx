import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {bed} from '../footage';

export const S01_DUR = 130; // 0.00 -> 4.34s

/**
 * Scene 1 — the hook. iRacing's own Dev Diary footage: this is literally the developer video
 * the line is talking about, not a stand-in.
 */
export const Scene01: React.FC = () => (
  <SceneBed {...bed(1)} dur={S01_DUR} wins={[]} amp={0.06}>
    <Caption
      text="iRacing Studios finally showed his No. 30 ARCA car in the latest developer video"
      outAt={S01_DUR - 4}
      fontSize={44}
    />
  </SceneBed>
);
