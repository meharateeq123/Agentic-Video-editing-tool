import React from 'react';
import {C} from '../theme';
import {SceneBed, type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {bed} from '../footage';

export const S01_DUR = 433; // 0.00 -> 16.59s

/**
 * Scene 1 — the hook. The Berlin spin runs underneath from the first frame to
 * the last, and nothing replaces it. Two person ID cards come and go in the
 * bottom-left corner, each exactly on its own name: Cleetus as the opening
 * line names him, then Dale Earnhardt Jr. as the turn lands. No graphic, no
 * headline — the voiceover carries the rest.
 */
const W_CLEETUS: Win = [14, 38, 80, 104];
const W_DALE: Win = [148, 172, 228, 254];
const WINS: Win[] = [W_CLEETUS, W_DALE];

export const Scene01: React.FC = () => {
  return (
    <SceneBed
      {...bed(1)}
      dur={S01_DUR}
      wins={WINS}
      accent={C.amber}
      amp={0.11}
      maxBlur={5}
      dim={0.12}
    >
      <IdCard
        photo="id/cleetus.png"
        name="Cleetus McFarland"
        affiliation="Garrett Mitchell — Super Late Model"
        focus={[52, 36]}
        zoom={1.45}
        win={W_CLEETUS}
      />
      <IdCard
        photo="id/dalejr.png"
        name="Dale Earnhardt Jr."
        affiliation="The Dale Jr. Download"
        focus={[50, 30]}
        zoom={1.75}
        win={W_DALE}
      />
    </SceneBed>
  );
};
