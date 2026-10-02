import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Overlay, SceneBed, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {StepTimeline} from '../components/Elements';
import {bed} from '../footage';

export const S21_DUR = 503; // 262.01 -> 280.56s

const STEPS = [
  {label: 'Short tracks'},
  {label: 'ARCA'},
  {label: 'Truck Series'},
  {label: "O'Reilly Series"},
  {label: 'Daytona 500', sub: 'The goal'},
];

/**
 * Scene 21 — the long game, drawn as the climb the narration describes. The
 * ladder rides on the clip and lifts away before the closing line.
 */
const W: Win = [200, 238, 446, 480];

export const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const g = frame - W[0];
  const climb = ease(g, 14, 208);

  return (
    <SceneBed {...bed(21)} dur={S21_DUR} wins={[W]} accent={C.amber} amp={0.09} maxBlur={15} dim={0.32}>
      <Overlay k={winK(frame, W)} rise={16}>
        <StepTimeline steps={STEPS} k={climb} x={320} y={400} width={1240} rise={200} />
      </Overlay>
    </SceneBed>
  );
};

