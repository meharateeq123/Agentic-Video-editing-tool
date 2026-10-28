import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FONT} from '../theme';

/**
 * Modern 10s hook (ching1 test): hard cuts locked to the VO words (0-10.8s, "7 events ... Adriana Erica Ching"),
 * one kinetic graphic per beat - number slam, medal pops + face punch-in, location pin, rolling counter, name slam.
 * Shots are only the scene 1-3 beds this hook replaces, each split into different moments (no frame shown twice);
 * the sofa photo appears once (as the name card), the trophy photo once (medals + face punch).
 */
export const HOOK_FRAMES = 324;
const OUT = Easing.bezier(0.16, 1, 0.3, 1);
const POP = Easing.bezier(0.34, 1.56, 0.64, 1);
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const GOLD = '#f7c548';
const PH = ['#0038A8', '#ffffff', '#CE1126'];

const k = (f: number, a: number, b: number, e = OUT) => interpolate(f, [a, b], [0, 1], {easing: e, ...cl});

type ShotDef = {src: string; sf: number; from: number; dur: number; z0?: number; z1?: number; ox?: string};
const SHOTS: ShotDef[] = [
  {src: 'R1_30', sf: 0, from: 0, dur: 30, z0: 1.18, z1: 1.06},          // "7 events" - Cebu Race Pace race
  {src: 'Pg1', sf: 0, from: 30, dur: 66, z0: 1.0, z1: 1.04, ox: '53% 30%'}, // "7 gold medals ... 10-year-old" - trophy + 7 GOLD MEDALS board
  {src: 'R1_3', sf: 0, from: 96, dur: 28, z0: 1.12, z1: 1.2},           // "That is what happened at"
  {src: 'R1_30', sf: 40, from: 124, dur: 22, z0: 1.25, z1: 1.15},       // "a swim meet in"
  {src: 'Cd12_6', sf: 0, from: 146, dur: 52, z0: 1.0, z1: 1.12},        // "Cebu City in the Philippines" - drone
  {src: 'R1_36', sf: 0, from: 198, dur: 24, z0: 1.1, z1: 1.18},         // "at a meet with about"
  {src: 'R1_3', sf: 40, from: 222, dur: 40, z0: 1.0, z1: 1.1, ox: '50% 20%'}, // "500 swimmers" - stands + lanes
];

const Shot: React.FC<{s: ShotDef}> = ({s}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, s.dur], [s.z0 ?? 1.05, s.z1 ?? 1.12], cl);
  // face punch-in on the trophy photo at "1 10-year-old" (VO 2.26s = frame 66 -> local 36)
  const punch = s.src === 'Pg1' ? 1 + 0.95 * k(f, 36, 42, Easing.bezier(0.7, 0, 0.2, 1)) : 1;
  const src = staticFile(`bed-pool/${s.src}.mp4`);
  // boxed look: the same shot blurred fills the frame, the sharp shot plays in a centred rounded box
  const pop = s.from === 0 ? k(f, 0, 8, POP) : 1;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{filter: 'blur(40px) brightness(0.5) saturate(1.3)', transform: `scale(${1.25 * z})`}}>
        <OffthreadVideo src={src} startFrom={s.sf} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: BOX.x, top: BOX.y, width: BOX.w, height: BOX.h, borderRadius: 28, overflow: 'hidden',
        border: '4px solid rgba(255,255,255,0.9)', boxShadow: '0 40px 120px rgba(0,0,0,0.75)', transform: `scale(${0.9 + 0.1 * pop})`}}>
        <OffthreadVideo src={src} startFrom={s.sf} muted
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z * punch})`, transformOrigin: s.ox ?? '50% 50%'}} />
      </div>
    </AbsoluteFill>
  );
};
const BOX = {x: 230, y: 150, w: 1460, h: 822};

const Vignette: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)'}} />
);

/** top scrim so the kinetic type reads on bright pool footage */
const TopScrim: React.FC<{o?: number}> = ({o = 0.7}) => (
  <AbsoluteFill style={{background: `linear-gradient(to bottom, rgba(3,6,12,${o}) 0%, rgba(3,6,12,${o * 0.5}) 35%, rgba(3,6,12,0) 60%)`}} />
);

const Flash: React.FC<{at: number; len?: number; max?: number}> = ({at, len = 6, max = 1}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at, at + 1, at + len], [0, max, 0], cl);
  return o > 0.001 ? <AbsoluteFill style={{background: '#fff', opacity: o}} /> : null;
};

/** 0-30: "7" slams in, EVENTS slides beside it */
const SevenEvents: React.FC = () => {
  const f = useCurrentFrame();
  if (f >= 30) return null;
  const s = k(f, 0, 6, POP);
  const e = k(f, 6, 14);
  const shake = f < 8 ? Math.sin(f * 2.7) * (8 - f) * 2 : 0;
  return (
    <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
      <TopScrim o={0.75} />
      <div style={{position: 'absolute', top: 190, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24}}>
        <div style={{fontFamily: FONT, fontSize: 200, fontWeight: 900, color: '#fff', lineHeight: 0.85, letterSpacing: -8,
          transform: `scale(${2.4 - 1.4 * s})`, opacity: Math.min(1, s * 2), textShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>7</div>
        <div style={{fontFamily: FONT, fontSize: 80, fontWeight: 900, color: '#fff', letterSpacing: 4, lineHeight: 1,
          opacity: e, transform: `translateX(${(1 - e) * 220}px) skewX(${(1 - e) * -12}deg)`, textShadow: '0 12px 40px rgba(0,0,0,0.6)'}}>EVENTS</div>
      </div>
    </AbsoluteFill>
  );
};

/** 30-66: 7 GOLD MEDALS + seven medals popping in a row; 66-96: AGE 10 over the face punch-in */
const Medal: React.FC<{p: number}> = ({p}) => (
  <div style={{width: 120, height: 170, position: 'relative', opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * -80}px) scale(${0.3 + 0.7 * p}) rotate(${(1 - p) * -25}deg)`}}>
    <div style={{position: 'absolute', left: 30, top: 0, width: 60, height: 70, background: 'linear-gradient(90deg, #0038A8 0 33%, #fff 33% 66%, #CE1126 66%)',
      clipPath: 'polygon(0 0, 100% 0, 75% 100%, 25% 100%)'}} />
    <div style={{position: 'absolute', left: 0, top: 50, width: 120, height: 120, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 30%, #fff6c9 0%, ${GOLD} 35%, #b8860b 80%, #7a5500 100%)`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 6px rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <span style={{fontFamily: FONT, fontSize: 54, fontWeight: 900, color: '#6b4a00'}}>1</span>
    </div>
  </div>
);

const GoldsAndAge: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 30 || f >= 96) return null;
  if (f < 66) {
    const t = k(f, 31, 40);
    return (
      <AbsoluteFill>
        {/* medals live in the blurred strip above the box, the words in the strip below - her face stays clear */}
        <div style={{position: 'absolute', top: -14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6, transform: 'scale(0.8)'}}>
          {Array.from({length: 7}, (_, i) => <Medal key={i} p={k(f, 37 + i * 3, 45 + i * 3, POP)} />)}
        </div>
        <div style={{position: 'absolute', top: 990, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontSize: 64, fontWeight: 900, letterSpacing: 4, lineHeight: 1,
          color: '#fff', opacity: t, transform: `scale(${1.3 - 0.3 * t})`, textShadow: '0 12px 40px rgba(0,0,0,0.7)'}}>
          7 <span style={{color: GOLD}}>GOLD</span> MEDALS
        </div>
      </AbsoluteFill>
    );
  }
  const a = k(f, 67, 73, POP);
  const b = k(f, 70, 78);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(to right, rgba(3,6,12,0.75) 0%, rgba(3,6,12,0.35) 35%, rgba(3,6,12,0) 55%)'}} />
      <div style={{position: 'absolute', left: 260, top: 190}}>
        <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 300, letterSpacing: 14, color: 'rgba(255,255,255,0.9)', opacity: b, transform: `translateY(${(1 - b) * 20}px)`}}>AGE</div>
        <div style={{fontFamily: FONT, fontSize: 190, fontWeight: 900, color: GOLD, lineHeight: 0.85, letterSpacing: -6,
          transform: `scale(${1.8 - 0.8 * a})`, transformOrigin: 'left center', opacity: Math.min(1, a * 2), textShadow: '0 20px 70px rgba(0,0,0,0.7)'}}>10</div>
      </div>
    </AbsoluteFill>
  );
};

/** 146-198: location pin on the Cebu drone */
const LocationPin: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 146 || f >= 198) return null;
  const pin = k(f, 148, 156, POP);
  const line = k(f, 152, 162);
  const name = k(f, 154, 164);
  const ph = k(f, 177, 186);
  const coords = '10.32°N  123.89°E';
  const typed = Math.round(interpolate(f, [160, 176], [0, coords.length], cl));
  const ring = ((f - 148) % 24) / 24;
  return (
    <AbsoluteFill>
      <TopScrim o={0.7} />
      <div style={{position: 'absolute', left: 340, top: 280, transform: 'scale(0.6)', transformOrigin: '0 0'}}>
        <div style={{position: 'absolute', left: -60, top: -60, width: 120, height: 120, borderRadius: '50%', border: `4px solid ${GOLD}`,
          transform: `scale(${0.3 + ring * 1.4})`, opacity: (1 - ring) * pin}} />
        <div style={{position: 'absolute', left: -18, top: -18, width: 36, height: 36, borderRadius: '50%', background: GOLD,
          boxShadow: `0 0 30px ${GOLD}`, transform: `scale(${pin})`}} />
        <div style={{position: 'absolute', left: 30, top: -2, height: 4, width: 140 * line, background: GOLD}} />
        <div style={{position: 'absolute', left: 200, top: -96, whiteSpace: 'nowrap'}}>
          <div style={{fontFamily: FONT, fontSize: 130, fontWeight: 900, color: '#fff', letterSpacing: 2, lineHeight: 1,
            opacity: name, clipPath: `inset(0 ${(1 - name) * 100}% 0 0)`, textShadow: '0 12px 40px rgba(0,0,0,0.6)'}}>CEBU CITY</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 14, opacity: ph, transform: `translateY(${(1 - ph) * 20}px)`}}>
            <div style={{display: 'flex', width: 70, height: 28, borderRadius: 4, overflow: 'hidden'}}>{PH.map((c) => <div key={c} style={{flex: 1, background: c}} />)}</div>
            <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 800, letterSpacing: 10, color: GOLD}}>PHILIPPINES</div>
          </div>
          <div style={{fontFamily: 'Consolas, monospace', fontSize: 30, color: 'rgba(255,255,255,0.8)', marginTop: 14, letterSpacing: 3}}>{coords.slice(0, typed)}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 222-262: counter rolls to 500, SWIMMERS lands on the word */
const Counter: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 222 || f >= 262) return null;
  const n = Math.round(interpolate(f, [222, 238], [0, 500], {easing: Easing.out(Easing.cubic), ...cl}));
  const land = k(f, 238, 244, POP);
  const sw = k(f, 239, 248);
  return (
    <AbsoluteFill>
      <TopScrim o={0.8} />
      <div style={{position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center', transform: 'scale(0.55)', transformOrigin: '50% 0'}}>
        <div style={{fontFamily: FONT, fontSize: 300, fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: -10, fontVariantNumeric: 'tabular-nums',
          transform: `scale(${1 + 0.12 * (1 - land) * (f >= 238 ? 1 : 0)})`, textShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>
          <span style={{fontSize: 160, fontWeight: 300, verticalAlign: 'top', marginRight: 10, opacity: 0.85}}>~</span>{n}
        </div>
        <div style={{fontFamily: FONT, fontSize: 90, fontWeight: 900, letterSpacing: 30, color: GOLD, opacity: sw, transform: `translateY(${(1 - sw) * 30}px)`}}>SWIMMERS</div>
      </div>
    </AbsoluteFill>
  );
};

/** 262-324: name slam - sofa photo card swings in, ADRIANNA / ERIKA / CHING land on the spoken words */
const NameSlam: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 262) return null;
  const sw = k(f, 263, 280);
  const wipe = k(f, 266, 282);
  const w1 = k(f, 288, 296), w2 = k(f, 303, 310), w3 = k(f, 313, 318, POP);
  const meta = k(f, 315, 322);
  const rot = (f - 262) * 2.4;
  const shake = f >= 313 && f < 320 ? Math.sin(f * 2.9) * (320 - f) * 2.2 : 0;
  return (
    <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.5}px)`}}>
      <AbsoluteFill style={{filter: 'blur(26px) brightness(0.45) saturate(1.2)', transform: 'scale(1.2)'}}>
        <OffthreadVideo src={staticFile('bed-pool/R1_36.mp4')} startFrom={40} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', right: 150, top: 150, width: 560, height: 740,
        transform: `perspective(1400px) translateX(${(1 - sw) * 260}px) rotateY(${(1 - sw) * 30}deg) rotate(${(1 - sw) * -5}deg)`, opacity: Math.min(1, sw * 1.6)}}>
        <div style={{position: 'absolute', inset: -6, borderRadius: 34, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: '-50%', top: '-50%', width: '200%', height: '200%',
            background: `conic-gradient(from ${rot}deg, ${GOLD}, #ffffff, ${GOLD}, rgba(255,255,255,0.15), ${GOLD})`}} />
        </div>
        <div style={{position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden', background: '#0b1018', clipPath: `inset(${(1 - wipe) * 100}% 0 0 0 round 28px)`}}>
          <Img src={staticFile('id/ching.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%', transform: `scale(${1.15 - 0.1 * wipe + 0.0008 * (f - 262)})`}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 12, display: 'flex'}}>{PH.map((c) => <div key={c} style={{flex: 1, background: c}} />)}</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 170, top: 380, width: 1050, transform: 'scale(0.62)', transformOrigin: '0 0'}}>
        <div style={{display: 'flex', gap: 28}}>
          <div style={{fontFamily: FONT, fontSize: 70, fontWeight: 300, letterSpacing: 10, color: '#fff', opacity: w1, transform: `translateY(${(1 - w1) * 40}px)`}}>ADRIANNA</div>
          <div style={{fontFamily: FONT, fontSize: 70, fontWeight: 300, letterSpacing: 10, color: '#fff', opacity: w2, transform: `translateY(${(1 - w2) * 40}px)`}}>ERIKA</div>
        </div>
        <div style={{fontFamily: FONT, fontSize: 250, fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: -6,
          opacity: Math.min(1, w3 * 2), transform: `scale(${1.6 - 0.6 * w3})`, transformOrigin: 'left center', textShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>CHING</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, opacity: meta, transform: `translateX(${(1 - meta) * -40}px)`}}>
          <div style={{display: 'flex', width: 70, height: 28, borderRadius: 4, overflow: 'hidden'}}>{PH.map((c) => <div key={c} style={{flex: 1, background: c}} />)}</div>
          <div style={{fontFamily: FONT, fontSize: 40, fontWeight: 800, letterSpacing: 8, color: GOLD}}>AGE 10 · CEBU CITY</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// no motion-graphic SFX in the hook (user 2026-10-24): background music only
export const Hook10: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
    {SHOTS.map((s) => (
      <Sequence key={`${s.src}-${s.from}`} from={s.from} durationInFrames={s.dur} layout="none"><Shot s={s} /></Sequence>
    ))}
    <Vignette />
    <SevenEvents />
    <GoldsAndAge />
    <LocationPin />
    <Counter />
    <NameSlam />
    <Flash at={0} len={7} />
    <Flash at={66} len={4} max={0.55} />
    <Flash at={313} len={4} max={0.4} />
    {/* bed music: mixkit "Sports Highlights" (123 BPM, full energy from bar 1), ducked under the VO, out over the last 0.5s */}
    <Audio src={staticFile('music/hook.mp3')} volume={(f) => interpolate(f, [0, 3, HOOK_FRAMES - 15, HOOK_FRAMES], [0, 0.035, 0.035, 0], cl)} />
  </AbsoluteFill>
);
