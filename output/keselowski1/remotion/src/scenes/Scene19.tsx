import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - "Ironically, Hocevar still finished ahead of Keselowski at Darlington. He recovered
 * from as far back as 34th to finish 11th. Keselowski was never able to fully recover, finishing
 * 23rd." Two-column comparison, same device as bar-chart scenes in earlier films.
 */
const W: Win = [40, 72, 250, 284];

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const head = ease(frame, 46, 78);
  const left = ease(frame, 90, 128);
  const right = ease(frame, 128, 166);

  return (
    <BedChain segs={chain(19)} dur={S19_DUR} wins={[W]} amp={0.06} maxBlur={16} dim={0.54}>
      <Overlay k={winK(frame, W)} rise={20}>
        <div style={{position: 'absolute', left: 0, top: 240, width: 1920, textAlign: 'center', opacity: head}}>
          <div style={{...labelStyle(19), color: C.amber}}>Ironically, Hocevar finished ahead</div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 460,
            top: 340,
            width: 1000,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{textAlign: 'center', width: 440, opacity: left}}>
            <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.muted}}>Carson Hocevar</div>
            <div style={{fontFamily: FONT, fontSize: 100, fontWeight: 800, color: C.amber, letterSpacing: -4, marginTop: 10}}>
              34th <span style={{color: C.text, fontSize: 60}}>&rarr;</span> 11th
            </div>
          </div>
          <div style={{textAlign: 'center', width: 440, opacity: right}}>
            <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.muted}}>Brad Keselowski</div>
            <div style={{fontFamily: FONT, fontSize: 100, fontWeight: 800, color: C.text, letterSpacing: -4, marginTop: 10}}>
              23rd
            </div>
            <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 8}}>
              Never fully recovered
            </div>
          </div>
        </div>
      </Overlay>
    </BedChain>
  );
};
