import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

/**
 * Scene 4 - "He worked forward all race long, climbing from 16th all the way up to second place by
 * the end of Stage 2."
 *
 * A progress rail, the same device hamlin1 used for its start-of-night sequence, but with a
 * different shape: that one was five short bullet points, this one is a straight climb, so it's
 * built as a single line with one dot rising along it - motion carrying the point rather than a
 * checklist. Only the dot moves; "16th" and "2nd" are fixed at the rail's two ends so nothing ever
 * has to share space with the moving piece (an earlier version put a floating label next to the dot
 * and it collided with the "2nd" label the instant the climb finished).
 */
const W: Win = [56, 88, 370, 410];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 62, 94);
  const climb = ease(frame, 90, 330);
  const from = ease(frame, 96, 126);
  const to = ease(frame, 300, 340);

  return (
    <BedChain segs={chain(4)} dur={S04_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={18}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 210,
            width: 1920,
            textAlign: 'center',
            ...labelStyle(19),
            color: C.amber,
            opacity: head,
          }}
        >
          Working forward through Stage 1 and Stage 2
        </div>

        <div style={{position: 'absolute', left: 860, top: 320, width: 260, height: 520}}>
          <div
            style={{
              position: 'absolute',
              left: 99,
              top: 0,
              width: 2,
              height: '100%',
              background: C.hairlineStrong,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 88,
              top: `${(1 - climb) * 460}px`,
              width: 24,
              height: 24,
              borderRadius: 12,
              background: C.amber,
              boxShadow: `0 0 22px ${C.amberDim}`,
              opacity: from,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 130,
              bottom: -10,
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 700,
              color: C.muted,
              opacity: from,
            }}
          >
            16th
          </div>
          <div
            style={{
              position: 'absolute',
              left: 130,
              top: -16,
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 800,
              color: C.amber,
              opacity: to,
              whiteSpace: 'nowrap',
            }}
          >
            2nd — end of Stage 2
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
