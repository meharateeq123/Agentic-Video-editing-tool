import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {ease} from './base';

/**
 * Cold open (flick-suspense-hook-format, clip-supplied override): the user's own real clip, cut in
 * full-screen with its own broadcast + crowd sound and nothing layered on top - no riser, no
 * caption. NASCAR official, "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (MsJuBKfoTrs),
 * source 2:17-2:30 = 137-150s: the pit-road scrum right after Logano's burnout, Blaney held back
 * by officials. A source tag fades in top-left and out again; a quick fade to black closes it.
 */
const START = 137;
const HOOK_FRAMES = 390; // 13s

export const HookOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tag = ease(frame, 6, 22) * (1 - ease(frame, 96, 116));
  const black = ease(frame, HOOK_FRAMES - 8, HOOK_FRAMES - 1);
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <OffthreadVideo src={staticFile('bed-pool/gi.mp4')} startFrom={Math.round(START * 30)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 56,
          padding: '12px 22px',
          borderRadius: 10,
          background: 'rgba(10,10,10,0.86)',
          opacity: tag,
        }}
      >
        <span style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, fontStyle: 'italic', color: C.text}}>Bristol Night Race </span>
        <span style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, fontStyle: 'italic', color: C.amber}}>- Sept 2026</span>
      </div>
      <AbsoluteFill style={{backgroundColor: '#000', opacity: black}} />
    </AbsoluteFill>
  );
};
