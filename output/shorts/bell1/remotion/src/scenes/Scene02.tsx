import React from 'react';
import {SceneBed} from '../components/Bed';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';

export const S02_DUR = 85; // 5.20 -> 8.04s

/** Scene 2 — held under the 3s cap already; one clip, a tight bottom-groove battle. */
export const Scene02: React.FC = () => (
  <SceneBed {...SCENE2_CUTS[0]} dur={S02_DUR} wins={[]} amp={0.07}>
    <Caption
      text="He held off the field when the pressure was at its highest"
      outAt={S02_DUR - 4}
      fontSize={54}
    />
  </SceneBed>
);
