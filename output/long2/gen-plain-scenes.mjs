// Writes the plain scenes: pure BedChain, no overlay at all (flick-info-without-cards default:
// most lines get real footage and nothing else). Special scenes (6,8,9,13,14,18,21) are hand-written.
import {writeFileSync} from 'node:fs';
const PLAIN = [1, 2, 9, 10, 12, 15, 16, 17, 18, 19];
for (const n of PLAIN) {
  const nn = String(n).padStart(2, '0');
  const src = `import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S${nn}_DUR = mountedFrames(${n});

export const Scene${nn}: React.FC = () => (
  <BedChain segs={chain(${n})} dur={S${nn}_DUR} amp={0.05} />
);
`;
  writeFileSync(`remotion/src/scenes/Scene${nn}.tsx`, src);
}
console.log(`wrote ${PLAIN.length} plain scenes`);


