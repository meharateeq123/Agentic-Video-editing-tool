import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, labelStyle} from '../theme';
import {BedChain} from '../components/BedChain';
import {Overlay, winK, type Win} from '../components/Bed';
import {ease} from '../components/base';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - the contact. "Michael McDowell, running behind him in the No. 71 Spire Motorsports
 * Chevrolet, made contact with the back of Hamlin's car. That contact sent Hamlin's Toyota into the
 * outside wall, right-front first."
 *
 * The bed under this is the broadcast's own replay, which holds the #11 and the #71 in one frame,
 * so the graphic is a pair of tags naming the two cars rather than a card explaining them. They
 * arrive one at a time - Hamlin first, then the car that hit him - and a thin bar underneath
 * timestamps the moment in the race.
 */
const W: Win = [40, 74, 256, 300];

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const a = ease(frame, 74, 106);
  const b = ease(frame, 132, 164);
  const bar = ease(frame, 190, 226);

  const tag = (k: number, color: string, num: string, name: string, sub: string) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        opacity: k,
        transform: `translateX(${(1 - k) * -26}px)`,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          background: color,
          color: '#0b0b0d',
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 800,
          padding: '10px 22px',
          borderRadius: '10px 0 0 10px',
          minWidth: 96,
          textAlign: 'center',
          letterSpacing: -1,
        }}
      >
        {num}
      </div>
      <div
        style={{
          background: 'rgba(10,10,13,0.9)',
          border: `1px solid ${C.hairlineStrong}`,
          borderLeft: 'none',
          borderRadius: '0 10px 10px 0',
          padding: '10px 26px',
        }}
      >
        <div style={{fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.text}}>{name}</div>
        <div style={{fontFamily: FONT, fontSize: 18, fontWeight: 500, color: C.muted, marginTop: 2}}>
          {sub}
        </div>
      </div>
    </div>
  );

  // Barely any blur here on purpose: this is the one scene where the bed *is* the evidence - the
  // #11 and the #71 in the same frame - so the tags sit over a picture you can still read.
  return (
    <BedChain segs={chain(8)} dur={S08_DUR} wins={[W]} amp={0.06} maxBlur={5} dim={0.22}>
      <Overlay k={winK(frame, W)} rise={16}>
        <div style={{position: 'absolute', left: 130, top: 620}}>
          {tag(a, C.amber, '11', 'Denny Hamlin', 'Lifted off Turn 4, then hit from behind')}
          {tag(b, C.red, '71', 'Michael McDowell', 'Spire Motorsports Chevrolet')}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 540,
            ...labelStyle(18),
            color: C.amber,
            opacity: bar,
          }}
        >
          Stage 3, lap 4 - right-front into the outside wall
        </div>
      </Overlay>
    </BedChain>
  );
};
