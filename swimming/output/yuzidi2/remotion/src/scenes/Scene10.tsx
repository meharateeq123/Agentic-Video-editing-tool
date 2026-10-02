import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {C, FONT, cardStyle, labelStyle, numStyle} from '../theme';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - the months after Singapore: the Nov 2025 200 IM Asian record, then the June 2026
 * Nationals treble. Three cards, each up only while its numbers are being said, so the scene is
 * never a 37-second card.
 *
 *  A  "2 minutes 7.41" (6.6s = f198) / "Asian record" (10.3s = f309). Settles f329, out0 = 359.
 *  B  "400 I.M. ... 4:30.79" (17.3s = f519) / "8th all-time" (23.4s = f702) / "Paris silver"
 *     (26.6s-28.4s = f798-852). Settles f818, out0 = 848.
 *  C  "200 butterfly 2:06.12" (33.0s = f990) and "400 freestyle 4:05.06" (36.1s = f1083). The
 *     narration runs to the end of the scene, so out0 (f1139) lands past the cut and the scene
 *     transition takes it out; unavoidable when the last number is the last word.
 */
const WA: Win = [190, 216, 359, 385];
const WB: Win = [476, 502, 848, 874];
const WC: Win = [982, 1008, 1139, 1165];

const box = (top: number): React.CSSProperties => ({
  position: 'absolute',
  left: 130,
  top,
  width: 700,
  ...cardStyle({radius: 24, pad: 38}),
  borderLeft: `6px solid ${C.amber}`,
});

const Line: React.FC<{k: number; children: React.ReactNode; style?: React.CSSProperties}> = ({k, children, style}) => (
  <div style={{opacity: k, transform: `translateY(${(1 - k) * 20}px)`, ...style}}>{children}</div>
);

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  const a1 = ease(frame, 196, 216);
  const a2 = ease(frame, 200, 226);
  const a3 = ease(frame, 309, 329);

  const b1 = ease(frame, 480, 500);
  const b2 = ease(frame, 515, 541);
  const b3 = ease(frame, 702, 722);
  const b4 = ease(frame, 798, 818);

  const c1 = ease(frame, 986, 1008);
  const c2 = ease(frame, 1083, 1105);

  return (
    <BedChain segs={chain(10)} dur={S10_DUR} wins={[WA, WB, WC]} amp={0.06} maxBlur={10} dim={0.36}>
      <Overlay k={winK(frame, WA)} rise={22}>
        <div style={box(300)}>
          <Line k={a1} style={{...labelStyle(19), color: C.amber}}>Nov 2025 · National Games</Line>
          <Line k={a1} style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text, marginTop: 14}}>
            200m individual medley
          </Line>
          <Line k={a2} style={{...numStyle(150, C.text), marginTop: 18}}>2:07.41</Line>
          <Line k={a3} style={{fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.amber, marginTop: 20, letterSpacing: -0.8}}>
            Asian record
          </Line>
        </div>
      </Overlay>

      <Overlay k={winK(frame, WB)} rise={22}>
        <div style={box(250)}>
          <Line k={b1} style={{...labelStyle(19), color: C.amber}}>Jun 2026 · Chinese Nationals</Line>
          <Line k={b1} style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text, marginTop: 14}}>
            400m individual medley
          </Line>
          <Line k={b2} style={{...numStyle(150, C.text), marginTop: 18}}>4:30.79</Line>
          <Line k={b3} style={{fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.amber, marginTop: 20, letterSpacing: -0.8}}>
            8th fastest of all time
          </Line>
          <Line k={b4} style={{fontFamily: FONT, fontSize: 25, fontWeight: 500, color: C.muted, marginTop: 10}}>
            Fast enough for silver at Paris 2024
          </Line>
        </div>
      </Overlay>

      <Overlay k={winK(frame, WC)} rise={22}>
        <div style={box(290)}>
          <Line k={c1} style={{...labelStyle(19), color: C.amber}}>Same meet · two more wins</Line>
          <Line k={c1} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 22}}>
            <span style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text}}>200m butterfly</span>
            <span style={numStyle(78, C.text)}>2:06.12</span>
          </Line>
          <div style={{height: 1, background: C.hairline, margin: '20px 0'}} />
          <Line k={c2} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text}}>400m freestyle</span>
            <span style={numStyle(78, C.text)}>4:05.06</span>
          </Line>
        </div>
      </Overlay>
    </BedChain>
  );
};
