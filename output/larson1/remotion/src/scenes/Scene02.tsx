import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

/**
 * Scene 2 - "Qualifying at Darlington got wiped out entirely due to weather... that system dropped
 * Larson, the No. 7 seed, all the way back to 25th on the grid."
 *
 * The scene's whole job is to land one number, so it gets the frame the same way scene 5's pit-stop
 * drop did in hamlin1: one huge figure, arriving late enough that the setup ("no qualifying, points
 * metric instead") is already spoken.
 */
const W: Win = [70, 100, 300, 340];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 76, 108);
  const num = ease(frame, 108, 160);
  const foot = ease(frame, 190, 226);

  return (
    <BedChain segs={chain(2)} dur={S02_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div style={{position: 'absolute', left: 0, top: 260, width: 1920, textAlign: 'center'}}>
          <div style={{...labelStyle(19), color: C.amber, opacity: head}}>
            Qualifying washed out - grid set by points
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 260,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -14,
              lineHeight: 1,
              marginTop: 16,
              opacity: num,
              transform: `scale(${interpolateStart(num)})`,
            }}
          >
            P25
          </div>
          <div style={{fontFamily: FONT, fontSize: 30, fontWeight: 500, color: C.muted, marginTop: 10, opacity: foot}}>
            The No. 7 seed, starting worse than almost every other playoff driver
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};

const interpolateStart = (k: number) => 1 + (1 - k) * 0.08;
