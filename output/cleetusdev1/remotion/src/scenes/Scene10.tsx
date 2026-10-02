import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {Globe, PlacePlate} from '../components/Maps';
import {TRACKS} from '../geo';
import {ease, band} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10); // 398f, 3 links

/**
 * Scene 10 — "His 2025 debut season included a Daytona start that ended early in a multi-car
 * crash, but by the end of the year he'd posted two top-10 finishes, including a career-best
 * result at Charlotte."
 *
 * Two places, one season, so the globe turns once between them: Daytona drops as the crash is
 * named, Charlotte drops as the recovery is. The globe treatment is used here and the flat map
 * in scene 11, so the film's two map moments never repeat the same trick.
 */
const W: Win = [24, 54, 300, 340];

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  const present = band(frame, W[0], W[1], W[2], W[3]);
  const daytonaK = ease(frame, 60, 96);
  const charlotteK = ease(frame, 176, 212);

  // A slow turn from Florida up toward the Carolinas as the second pin lands.
  const turn = ease(frame, 150, 260);
  const center: [number, number] = [-83.5 + turn * 1.6, 30.5 + turn * 3.4];
  const radius = 430 + ease(frame, 24, 300) * 40;

  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[W]} amp={0.08} maxBlur={16} dim={0.52}>
      <AbsoluteFill style={{opacity: present}}>
        <Globe
          center={center}
          radius={radius}
          cx={960}
          cy={520}
          highlight={ease(frame, 40, 110) * 0.9}
          frame={frame}
          pins={[
            {ll: TRACKS.daytona.ll, k: daytonaK, color: C.red},
            {ll: TRACKS.charlotte.ll, k: charlotteK, color: C.emerald},
          ]}
        />
        <PlacePlate
          text={charlotteK > 0.5 ? 'Charlotte — career best' : 'Daytona — out early'}
          k={Math.max(daytonaK, charlotteK)}
          y={946}
        />
      </AbsoluteFill>
    </BedChain>
  );
};
