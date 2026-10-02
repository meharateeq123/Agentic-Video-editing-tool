import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S08_DUR = 261; // 81.23 -> 91.26s

/**
 * Scene 8 — Dale Jr. steps in. He is the person on screen, so the ID-card
 * rule does not apply: no card is needed over footage of the man himself.
 */
export const Scene08: React.FC = () => <SceneBed {...bed(8)} dur={S08_DUR} amp={0.085} />;
