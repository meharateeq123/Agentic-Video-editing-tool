// Writes every scene file plus FinalFilm.tsx and Root.tsx for long4 (21 scenes).
import {writeFileSync} from 'node:fs';

const N = 21;
const nn = (n) => String(n).padStart(2, '0');

const head = (n, extra = '') => `import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
${extra}
export const S${nn(n)}_DUR = mountedFrames(${n});
`;

const plain = (n) => `${head(n)}
export const Scene${nn(n)}: React.FC = () => (
  <BedChain segs={chain(${n})} dur={S${nn(n)}_DUR} amp={0.05} />
);
`;

const withOverlays = (n, {stamps = [], quotes = [], wins = [], extraImports = '', extraBody = '', extraChildren = ''}) => {
  const imports = `import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
${extraImports}`;
  const stampWins = stamps.map((s, i) => `const W${i}: Win = [${s[3].join(', ')}];`).join('\n');
  const stampJsx = stamps
    .map((s, i) => `    <RankStamp value="${s[0]}" label="${s[1]}" at={${s[2]}} win={W${i}} color={${s[4] ?? 'C.amber'}} />\n    <Hit file="Pop.mp3" at={${s[2]}} volume={0.28} />`)
    .join('\n');
  const quoteJsx = quotes
    .map((q) => `    <QuoteBar text=${JSON.stringify(q[0])} who=${JSON.stringify(q[1])} win={[${q[2].join(', ')}]} fontSize={${q[3] ?? 36}} />`)
    .join('\n');
  const allWins = [...stamps.map((_, i) => `W${i}`), ...wins].join(', ');
  return `${head(n, imports)}
${stampWins}
${extraBody}
export const Scene${nn(n)}: React.FC = () => (
  <BedChain segs={chain(${n})} dur={S${nn(n)}_DUR} wins={[${allWins}]} amp={0.05} maxBlur={8} dim={0.3}>
${stampJsx}
${quoteJsx}
${extraChildren}
  </BedChain>
);
`;
};

const S = {};

// 3: the real "protected the bottom... wrecked me" quote, synced to the free FS window (63.36-76.4
// in source -> the second link starts at local frame where FC hands off, roughly local f330).
S[3] = withOverlays(3, {
  quotes: [
    ["I just felt like he didn't lift. I left him plenty of room. Didn't chop him, didn't run him into the fence, nothing. I protected the bottom, and he decided that he wanted to be there, didn't lift and wrecked me.", 'Ryan Blaney, infield care center', [340, 354, 700, 720], 30],
  ],
});

// 4: Blaney 33rd, Hocevar 3rd (short stat beat, two stamps back to back)
S[4] = `import React from 'react';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

const W0: Win = [4, 12, 34, 46];
const W1: Win = [40, 48, 70, 82];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="33rd" label="Ryan Blaney" at={12} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={12} volume={0.28} />
    <RankStamp value="3rd" label="Carson Hocevar" at={48} win={W1} color={C.emerald} />
    <Hit file="Pop.mp3" at={48} volume={0.28} />
  </BedChain>
);
`;

// 10: the black eye
S[10] = withOverlays(10, {stamps: [['Bruised', 'Left Eye, Two Punches', 40, [32, 44, 130, 150], 'C.red']]});

// 12: Blaney on Hamlin's podcast - real quote, found via whisper once yt-dlp's caption endpoint for
// this video stopped 429-ing. Per the user's call, that podcast clip plays only once in the whole
// film and only for 3s (local frames 210-300, exactly where the bed cuts to it) - so the quote bar's
// window sits right on top of that clip and nowhere else.
S[12] = withOverlays(12, {
  quotes: [
    ["I wasn't planning on throwing anything. I just really wanted to grab him and yell at him and show my displeasure.", 'Ryan Blaney, on Actions Detrimental', [212, 224, 288, 300], 32],
  ],
});
// 13: same podcast appearance, but the one podcast clip is already spent in scene 12 - this plays
// plain Bristol footage while the narration carries the regret line (flick-quote-scene-style /
// quote-integrity: no quote bar without matching footage of him actually saying it).
S[13] = plain(13);

// 14: the story's biggest turn (plain, momentum beat)
S[14] = plain(14);

// 15: no penalty, no fines
S[15] = withOverlays(15, {stamps: [['No Penalty', 'Blaney or Hocevar', 40, [32, 44, 150, 170]]]});

// 16: O'Donnell's real quote - per the user's call, the podcast set only shows for 3s (local frames
// 300-390, exactly where the bed cuts to it), sandwiched in racing B-roll either side - same pattern
// as scene 12's Hamlin-podcast fix, so the quote bar's window sits right on top of that clip only.
S[16] = withOverlays(16, {
  quotes: [
    ["We're not going to encourage fighting, but what we are going to encourage is passion. Those are two guys - Blaney's showing his passion, showing his fire.", "Steve O'Donnell, NASCAR CEO", [302, 314, 378, 390], 32],
  ],
});

// 17: O'Donnell on the 2010 incident and "a right hook"
S[17] = withOverlays(17, {
  quotes: [
    ["Don't use your car as a weapon. We don't want to see that, or a right hook. Drivers need to handle their business outside of the car.", "Steve O'Donnell, NASCAR CEO", [310, 324, 620, 640], 32],
  ],
});

// 18: 2023 Kansas precedent, Chastain's real quote
S[18] = withOverlays(18, {
  quotes: [
    ['He took a swipe out of turn three and then came down, grabbed a hold of me - and a very big man once told me, we have a no push policy here at Trackhouse.', 'Ross Chastain, 2023', [260, 274, 480, 500], 32],
  ],
});

// 19: crew review still unresolved
S[19] = withOverlays(19, {stamps: [['Pending', 'Crew Member Review', 40, [32, 44, 130, 150], 'C.muted']]});

// 20: standings gap + Kansas map beat
S[20] = `import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {ease} from '../components/base';
import {USMap, Pin, Route, PinLabel} from '../components/Maps';
import {US_OPTS, TRACKS, flat} from '../geo';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

const W0: Win = [40, 52, 130, 150];
const MAP: Win = [220, 236, 400, 420];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - 220;
  const out = 1 - ease(frame, 150, 170);
  const b = flat(TRACKS.bristol.ll, US_OPTS);
  const k = flat(TRACKS.kansas?.ll ?? TRACKS.bristol.ll, US_OPTS);
  const bk = Math.min(1, Math.max(0, (frame - 6) / 14));
  const rk = ease(frame, 20, 60);
  const kk = Math.min(1, Math.max(0, (frame - 58) / 14));
  const titleK = ease(frame, 4, 22);
  if (frame < 0) return null;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={ease(frame, 0, 26)}>
        <Route pts={[b, k]} k={rk} color={C.amber} march={frame * 1.4} />
        <Pin x={b.x} y={b.y} k={bk} color={C.muted} scale={0.9} />
        <Pin x={k.x} y={k.y} k={kk} color={C.red} scale={1.3} />
      </USMap>
      <PinLabel x={b.x} y={b.y} k={bk} text="Bristol" sub="last week" align="left" color={C.muted} />
      <PinLabel x={k.x} y={k.y} k={kk} text="Kansas" sub="this weekend" align="right" color="#fff" />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK}}>
        <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          NEXT: KANSAS SPEEDWAY
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="-52" label="Points Back - 6th" at={52} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={52} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={220} volume={0.3} />
  </BedChain>
);
`;

const custom = new Set(Object.keys(S).map(Number));
for (let n = 1; n <= N; n++) {
  writeFileSync(`remotion/src/scenes/Scene${nn(n)}.tsx`, custom.has(n) ? S[n] : plain(n));
}

const imports = Array.from({length: N}, (_, i) => `import {Scene${nn(i + 1)}} from './scenes/Scene${nn(i + 1)}';`).join('\n');
const list = Array.from({length: N}, (_, i) => `Scene${nn(i + 1)}`).join(', ');

writeFileSync('remotion/src/FinalFilm.tsx', `import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {HOOK_FRAMES, OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';
import {HookOpen} from './components/HookOpen';

${imports}

export const SCENES: React.FC[] = [
  ${list},
];

/**
 * Cold open: default suspense-montage (no clip was supplied for this film) - a fixed 13s real-audio
 * hook of short flashes before the narration starts. Every scene's \`from\` is pushed forward by
 * HOOK_FRAMES so timeline.ts never has to know the hook exists.
 */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Sequence from={0} durationInFrames={HOOK_FRAMES} layout="none">
      <HookOpen />
    </Sequence>

    {SCENES.map((Comp, i) => {
      const n = i + 1;
      const dur = sceneFrames(n);
      const last = n === SCENES.length;
      return (
        <Sequence key={n} from={HOOK_FRAMES + startFrame(n)} durationInFrames={dur + (last ? 0 : OVERLAP)} layout="none">
          <SceneTransition inKind={TRANSITION_IN[i]} outKind={last ? null : TRANSITION_IN[i + 1]} dur={dur} overlap={OVERLAP}>
            <Comp />
          </SceneTransition>
        </Sequence>
      );
    })}

    {VO_ALIGNED ? (
      <Sequence from={HOOK_FRAMES} layout="none">
        <Audio src={staticFile('vo/long4.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
`);

const KEBAB = [
  'punched-twice', 'the-incident', 'blaneys-anger', 'thirty-third-third', 'blaney-waiting', 'the-first-punch',
  'total-chaos', 'water-bottle', 'reactions-differ', 'black-eye', 'hocevar-reflects', 'wasnt-planning-to-throw',
  'monday-regret', 'biggest-turn', 'no-penalty', 'odonnell-explains', 'car-as-a-weapon', 'kansas-2023-precedent',
  'crew-review-pending', 'points-gap-kansas', 'the-wrap',
];

writeFileSync('remotion/src/Root.tsx', `import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ${JSON.stringify(KEBAB)};

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1920} height={1080} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1920} height={1080} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
`);
console.log('wrote', N, 'scenes + FinalFilm + Root');
