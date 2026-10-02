import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

/**
 * Scene 13 - "It was Yu's second gold medal in as many days. The night before, she had already won
 * the 200 meter butterfly in 2:05.08... She called the performance 'so-so'."
 * A quote is a sharp, unblurred bottom-centre caption - the only graphic this scene carries.
 */
const WQ: Win = [640, 664, 900, 928];

export const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const kQ = winK(frame, WQ);
  return (
    <BedChain segs={chain(13)} dur={S13_DUR} wins={[WQ]} amp={0.05} maxBlur={0} dim={0}>
      <QuoteLine k={kQ} />
    </BedChain>
  );
};

const QuoteLine: React.FC<{k: number}> = ({k}) => {
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 130,
        textAlign: 'center',
        opacity: k,
        transform: `translateY(${(1 - k) * 14}px)`,
      }}
    >
      <div style={{fontFamily: FONT, fontSize: 54, fontWeight: 800, color: C.text, fontStyle: 'italic'}}>
        "So-so."
      </div>
      <div style={{fontFamily: FONT, fontSize: 20, fontWeight: 600, letterSpacing: 2, color: C.muted, marginTop: 10, textTransform: 'uppercase'}}>
        Yu Zidi, on an Asian Games record swim
      </div>
    </div>
  );
};
