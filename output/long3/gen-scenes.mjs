// Writes every scene file plus FinalFilm.tsx and Root.tsx for long3 (28 scenes).
// Plain scenes are a bare BedChain; overlay scenes list their stamps / quote bars below.
// All windows are scene-local frames read off the VO word timings (when.mjs / sent.mjs).
import {writeFileSync} from 'node:fs';

const N = 28;
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

/** stamps: [value, label, at, [win...], color?]; quotes: [text, who, win, fontSize?] */
const withOverlays = (n, {stamps = [], quotes = [], hits = [], extraImports = '', extraBody = '', extraChildren = '', wins = []}) => {
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

S[2] = withOverlays(2, {stamps: [['29th', 'Starting Position', 26, [20, 30, 95, 110]], ['202', 'Laps Led - Race High', 371, [364, 376, 428, 448]]]});
S[3] = withOverlays(3, {stamps: [['43', 'Laps To Go', 14, [8, 18, 74, 92], 'C.red']]});
S[4] = withOverlays(4, {stamps: [['457', 'The Lap', 48, [40, 52, 112, 132]]]});
S[5] = withOverlays(5, {stamps: [['33rd', 'Final Result', 208, [200, 214, 270, 290], 'C.red']]});
S[7] = withOverlays(7, {
  quotes: [
    ['He crossed and never lifted, and I got crashed.', 'Ryan Blaney, after the wreck', [104, 118, 190, 204], 38],
    ['I protected pretty early and he just kept coming left and never lifted and crashed me.', 'Ryan Blaney, after the wreck', [244, 258, 355, 370], 34],
    ['Something is gonna happen.', 'Ryan Blaney, after the wreck', [460, 472, 500, 516], 44],
  ],
});
S[8] = withOverlays(8, {
  quotes: [["I haven't had a problem with him for probably a year and a half, but it's getting old.", 'Ryan Blaney, infield care center', [514, 528, 632, 650], 36]],
});
S[14] = withOverlays(14, {
  quotes: [["I wasn't trying to wreck him.", 'Carson Hocevar', [74, 86, 126, 142], 44]],
});
S[15] = withOverlays(15, {
  quotes: [
    ["There wasn't a whole lot of talking. He just kind of said one thing and then went after me, and I wasn't going to take it.", 'Carson Hocevar, after the race', [125, 138, 290, 306], 34],
    ['I got ran into a lot for the win. That was for second, and he wants to come fight. They got an old school Bristol show here.', 'Carson Hocevar, after the race', [413, 426, 582, 598], 33],
  ],
});
S[21] = withOverlays(21, {stamps: [['3rd', "Hocevar's Finish", 176, [168, 180, 238, 258], 'C.emerald']]});
S[24] = withOverlays(24, {stamps: [['2023', 'Cup Series Champion', 118, [110, 124, 192, 212]]]});
S[26] = withOverlays(26, {stamps: [['202', 'Laps Led', 62, [54, 68, 122, 142]], ['6th', 'Down From 4th', 380, [372, 386, 446, 470], 'C.red']]});

// 18: the format twist - "10 races" stamp, then a ~6s Bristol -> Homestead map beat
S[18] = `import React from 'react';
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

export const S18_DUR = mountedFrames(18);

// "10 races" is spoken at f357; "Homestead" lands at f561, so the map draws f486-f560 and the
// pin drops right on the word.
const W0: Win = [350, 362, 432, 452];
const MAP: Win = [484, 500, 650, 672];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - 484;
  const draw = ease(frame, 0, 30);
  const out = 1 - ease(frame, 168, 188);
  const b = flat(TRACKS.bristol.ll, US_OPTS);
  const h = flat(TRACKS.homestead.ll, US_OPTS);
  const bk = Math.min(1, Math.max(0, (frame - 8) / 14));
  const rk = ease(frame, 28, 72);
  const hk = Math.min(1, Math.max(0, (frame - 70) / 14));
  const titleK = ease(frame, 6, 26);
  if (frame < 0) return null;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={draw}>
        <Route pts={[b, h]} k={rk} color={C.amber} march={frame * 1.4} />
        <Pin x={b.x} y={b.y} k={bk} color={C.amber} scale={0.95} />
        <Pin x={h.x} y={h.y} k={hk} color={C.red} scale={1.3} />
      </USMap>
      <PinLabel x={b.x} y={b.y} k={bk} text="Bristol" sub="this race" align="left" color={C.muted} />
      <PinLabel x={h.x} y={h.y} k={hk} text="Homestead-Miami" sub="the new finale" align="left" color="#fff" />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK, transform: \`translateY(\${(1 - titleK) * 12}px)\`}}>
        <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          THE 2026 CHASE FINALE
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="10" label="Race Chase - No Eliminations" at={357} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={357} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={484} volume={0.3} />
    <Hit file="Pop.mp3" at={554} volume={0.28} />
  </BedChain>
);
`;

// 20: the points gap - "-33" stamp, before/after standings card, Larson/Hamlin plates
S[20] = `import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Overlay, winK, type Win} from '../components/Bed';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {VenueStamp} from '../components/Stamp';
import {C, FONT, cardStyle, labelStyle} from '../theme';
import {Hit} from '../components/Hit';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

// "33 points" f83-f105, "sixth" f238, "52 points" f311-f337, Larson f486, "one point back" f595.
const W0: Win = [76, 90, 152, 172];
const CARD: Win = [226, 240, 368, 394];
const LARSON: Win = [490, 504, 574, 590];
const HAMLIN: Win = [592, 606, 694, 712];
const ROWS_AT = [238, 311];

const ROWS = [
  {pos: '4th', name: 'Before Bristol', tag: '-33', color: C.muted},
  {pos: '6th', name: 'After Bristol', tag: '-52', color: C.red},
];

const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (frame: number, at: number) => ({
  k: interpolate(frame, [at, at + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  s: interpolate(frame, [at, at + 14], [0.55, 1], {easing: BACK, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
});

const GapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = winK(frame, CARD);
  return (
    <Overlay k={k} rise={20}>
      <div style={{position: 'absolute', left: 130, top: 610, width: 780, ...cardStyle({radius: 26, pad: 26})}}>
        <div style={{...labelStyle(18), color: C.amber, letterSpacing: 5}}>Ryan Blaney - Chase Points Gap</div>
        <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10}}>
          {ROWS.map((r, i) => {
            const p = pop(frame, ROWS_AT[i]);
            return (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 6px',
                  borderBottom: i < ROWS.length - 1 ? \`1px solid \${C.hairline}\` : 'none',
                  opacity: p.k,
                  transform: \`scale(\${p.s})\`,
                  transformOrigin: 'left center',
                }}
              >
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.text}}>
                  {r.pos} - {r.name}
                </span>
                <span style={{fontFamily: FONT, fontSize: 30, fontWeight: 900, color: r.color, letterSpacing: -0.5}}>{r.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} wins={[W0, CARD]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="-33" label="Points Back - 4th" at={86} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={86} volume={0.28} />
    <GapCard />
    <Hit file="Popups.mp3" at={ROWS_AT[0]} />
    <Hit file="Popups.mp3" at={ROWS_AT[1]} />
    <VenueStamp title="Kyle Larson" sub="New points leader" win={LARSON} />
    <VenueStamp title="Denny Hamlin" sub="One point back" win={HAMLIN} />
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
 * Cold open: the supplied real clip (NASCAR's own pit-road fight footage) plays full-screen with its
 * own broadcast/crowd sound before the narration starts. Every scene's \`from\` is pushed forward by
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
        <Audio src={staticFile('vo/long3.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
`);

const KEBAB = [
  'the-fall', 'started-29th', 'forty-three-to-go', 'lap-457-sequence', 'the-hit', 'on-purpose', 'blaney-quotes', 'atlanta-history',
  'ten-minutes-before', 'the-punches', 'pulled-apart', 'the-crowd', 'blaneys-side', 'hocevar-not-on-purpose', 'hocevar-quotes',
  'who-was-right', 'damage-in-points', 'format-twist', 'still-hurt', 'points-gap', 'hocevar-third', 'st-louis-brakes', 'logano-wins',
  'where-this-leaves-him', 'the-math', 'bring-it-together', 'your-take', 'subscribe',
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
