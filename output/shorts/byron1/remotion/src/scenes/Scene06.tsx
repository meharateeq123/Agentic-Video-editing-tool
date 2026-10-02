import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SceneBed} from '../components/Bed';
import {FadeIn, band} from '../components/base';
import {Caption} from '../components/Caption';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {SCENE6_CUTS, BYRON_ID} from '../footage';

export const S06_DUR = 156; // 15.48 -> 20.68s

const CUT_FRAMES = [52, 52, 52];

// Rides the middle cut — the only one of the three that is Byron on camera — so the bookend card
// is again a real face under a real name. Frames are scene-relative, the middle cut is 52-103.
const CARD_WIN: [number, number, number, number] = [60, 74, 92, 104];

/** Same low placement as the opening card: the bed under it is a face close-up. */
const IdCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = band(frame, ...CARD_WIN);
  if (k <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 1180,
        width: 820,
        display: 'flex',
        alignItems: 'stretch',
        opacity: k,
        transform: `translateY(${(1 - k) * 22}px)`,
        ...cardStyle({radius: 20, pad: 0}),
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile(BYRON_ID)}
        style={{width: 190, height: 190, objectFit: 'cover', alignSelf: 'center', margin: 18, borderRadius: 14}}
      />
      <div style={{padding: '26px 30px 26px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{...labelStyle(17), color: C.amber}}>9 races to turn it around</div>
        <div style={{fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1.05, marginTop: 8}}>
          William Byron
        </div>
        <div style={{fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.muted, marginTop: 8, lineHeight: 1.3}}>
          114 points out of the Chase lead
        </div>
      </div>
    </div>
  );
};

/** Scene 6 — the button: the question is carried by the caption, the card bookends the open. */
export const Scene06: React.FC = () => {
  let from = 0;
  return (
    <>
      {CUT_FRAMES.map((dur, i) => {
        const isFirst = i === 0;
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <FadeIn len={isFirst ? 0 : 6} skip={isFirst}>
              <SceneBed {...SCENE6_CUTS[i]} dur={dur} wins={[]} amp={0.06} />
            </FadeIn>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <IdCard />
      <Caption
        text="Can Byron pull off a massive comeback, or is his title run already in trouble?"
        outAt={S06_DUR - 3}
        fontSize={40}
      />
    </>
  );
};
