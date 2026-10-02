import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19); // 518f, 3 links

/**
 * Scene 19 — the close. "For a YouTuber who started out flooding burnouts in a driveway, showing
 * up in a big-budget NASCAR video game two years in a row is already a milestone."
 *
 * The film ends on the card it has been building toward: his own face beside the in-game shot,
 * the real driver and the rendered one on the same plate. The last film shipped with no closing
 * card at all, which is the gap this scene exists to not repeat.
 */
const W: Win = [120, 150, 400, 450];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const g = Math.max(0, Math.min(1, ease(frame - W[0], 0, 26) * 1.25));

  return (
    <BedChain segs={chain(19)} dur={S19_DUR} wins={[W]} amp={0.07} maxBlur={16} dim={0.5}>
      <Overlay k={winK(frame, W)} rise={22}>
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 250,
            width: 1320,
            opacity: g,
            transform: `translateY(${(1 - g) * 26}px)`,
            ...cardStyle({radius: 20, pad: 0}),
            overflow: 'hidden',
          }}
        >
          <div style={{display: 'flex', alignItems: 'stretch'}}>
            <Img
              src={staticFile('id/cleetus.png')}
              style={{width: 300, height: 300, objectFit: 'cover', display: 'block'}}
            />
            <Img
              src={staticFile('id/cleetus30-ingame.jpg')}
              style={{flex: 1, height: 300, objectFit: 'cover', objectPosition: '52% 52%', display: 'block'}}
            />
          </div>
          <div style={{padding: '30px 38px 34px'}}>
            <div style={{...labelStyle(18), color: C.amber}}>Two years running, in the game</div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 52,
                fontWeight: 800,
                color: C.text,
                letterSpacing: -1.8,
                lineHeight: 1.08,
                marginTop: 10,
              }}
            >
              Cleetus McFarland — No. 30
            </div>
            <div style={{fontFamily: FONT, fontSize: 21, fontWeight: 500, color: C.muted, marginTop: 10}}>
              NASCAR 26 launches September 18.
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
