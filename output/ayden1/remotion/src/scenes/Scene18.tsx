import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {BEDS} from '../footage';

export const S18_DUR = 473; // 346.12 -> 361.88s

/** Scene 18 — range as the trait that carries swimmers to the next level. Pure footage. */
export const Scene18: React.FC = () => <SceneShell beds={BEDS[18]} dur={S18_DUR} />;
