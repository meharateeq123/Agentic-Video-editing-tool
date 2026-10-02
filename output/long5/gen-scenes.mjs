// Writes every scene file plus FinalFilm.tsx and Root.tsx for long5 (22 scenes). Every overlay is placed from
// the Whisper word times of vo/long5.wav: `sec` is the absolute VO second a word is said at, turned into a
// scene-local frame here. No quote bars: none of the quoted lines was found in a sourced clip, so the VO carries
// them over plain real footage (flick-quote-scene-style / quote-integrity).
import {readFileSync, writeFileSync} from 'node:fs';

const N = 22;
const nn = (n) => String(n).padStart(2, '0');
const CUTS = JSON.parse(readFileSync('cuts.json', 'utf8'));
const loc = (n, sec) => Math.round((sec - CUTS[n - 1].start) * 30);

const P = {
  larson: ['id/larson-id.jpg', 'Kyle Larson', 'Hendrick Motorsports'],
  hamlin: ['id/hamlin-id.jpg', 'Denny Hamlin', 'Joe Gibbs Racing'],
  hocevar: ['id/hocevar-id.jpg', 'Carson Hocevar', 'Spire Motorsports'],
  logano: ['id/logano-id.jpg', 'Joey Logano', 'Team Penske'],
  reddick: ['id/reddick-id.jpg', 'Tyler Reddick', '23XI Racing'],
  blaney: ['id/blaney-id.jpg', 'Ryan Blaney', 'Team Penske'],
  buescher: ['id/buescher-id.jpg', 'Chris Buescher', 'RFK Racing'],
  wallace: ['id/wallace-id.jpg', 'Bubba Wallace', '23XI Racing'],
  elliott: ['id/elliott-id.jpg', 'Chase Elliott', 'Hendrick Motorsports'],
};

const stamp = (sec, value, label, w) => ({t: 'stamp', sec, value, label, w});
const card = (sec, who, w) => ({t: 'card', sec, who, w});
const venue = (sec, title, sub, w) => ({t: 'venue', sec, title, sub, w});

// each entry: scene -> overlays. `w` = explicit window in scene frames [in0, in1, out0, out1]
const OV = {
  1: [stamp(0.4, '1', 'Point Gap')],
  3: [
    card(17.6, 'larson', [-1, 6, 26, 36]),
    card(18.56, 'hamlin', [27, 35, 113, 133]),
    venue(21.72, 'Hollywood Casino 400', 'Kansas Speedway - Race 4 of 10'),
  ],
  4: [stamp(29.0, '17', 'Points Cover The Top 4')],
  5: [stamp(39.72, '1', 'Reset Only'), stamp(48.5, '0', 'Eliminated This Weekend')],
  6: [stamp(60.8, '52', 'Race Winless Streak')],
  7: [
    card(75.84, 'hocevar', [239, 247, 325, 340]),
    stamp(79.64, '<0.01', 'Second Margin At Bristol', [350, 358, 384, 396]),
    card(81.2, 'logano', [400, 408, 470, 489]),
  ],
  8: [
    card(92.48, 'reddick', [265, 273, 300, 312]),
    stamp(94.1, '17', 'Races Led - Reddick', [311, 319, 357, 373]),
    stamp(96.8, '11', 'Races Led - Hamlin', [393, 401, 439, 455]),
  ],
  9: [venue(101.4, 'Kyle Larson', 'After Bristol - P2')],
  10: [
    stamp(133.54, '89', 'Points Over Blaney', [445, 453, 470, 481]),
    card(134.68, 'blaney', [482, 490, 568, 588]),
  ],
  11: [stamp(149.4, '8TH', 'Hamlin At Bristol')],
  12: [stamp(163.64, '2 OF 2', 'Kansas Races - Most Laps Led')],
  13: [
    card(181.06, 'buescher', [351, 359, 378, 388]),
    stamp(182.2, '0.001s', 'Closest Finish In Cup History', [383, 391, 431, 447]),
  ],
  14: [card(186.54, 'wallace', [69, 77, 125, 139]), card(188.9, 'elliott', [140, 148, 208, 226])],
  15: [
    stamp(200.58, '2', 'Kansas Wins', [271, 279, 290, 298]),
    stamp(201.28, '14', 'Top-10 Finishes', [292, 300, 336, 344]),
    stamp(202.88, '21', 'Career Starts', [340, 348, 388, 404]),
  ],
  16: [card(205.4, 'reddick', [2, 10, 88, 108]), stamp(209.6, 'APRIL', 'Reddick Won Kansas', [126, 134, 172, 188])],
  17: [stamp(223.7, '1.5 MI', 'Three In A Row', [70, 78, 96, 108])],
  18: [stamp(233.44, '3', 'Straight Top Fives')],
  19: [stamp(262.26, '0', 'More Points Resets')],
  22: [card(302.36, 'larson', [175, 183, 261, 281])],
};

const CUSTOM = new Set([17]);

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

function withOverlays(n) {
  const list = OV[n].map((o) => {
    const f = loc(n, o.sec);
    const w = o.w ?? (o.t === 'card' ? [f - 4, f + 4, f + 82, f + 102] : o.t === 'venue' ? [f - 6, f + 4, f + 70, f + 86] : [f - 6, f + 2, f + 40, f + 56]);
    return {...o, f, w};
  });
  const wins = list.map((o, i) => `const W${i}: Win = [${o.w.join(', ')}];`).join('\n');
  const jsx = list
    .map((o, i) => {
      if (o.t === 'stamp')
        return `    <RankStamp value=${JSON.stringify(o.value)} label=${JSON.stringify(o.label)} at={${o.f}} win={W${i}} />\n    <Hit file="Pop.mp3" at={${o.f}} volume={0.28} />`;
      if (o.t === 'venue')
        return `    <VenueStamp title=${JSON.stringify(o.title)} sub=${JSON.stringify(o.sub)} win={W${i}} />\n    <Hit file="Pop.mp3" at={${o.f}} volume={0.28} />`;
      const [photo, name, aff] = P[o.who];
      return `    <IdCard photo=${JSON.stringify(photo)} name=${JSON.stringify(name)} affiliation=${JSON.stringify(aff)} focus={[50, 50]} zoom={1} win={W${i}} />\n    <Hit file="Pop.mp3" at={${o.f}} volume={0.28} />`;
    })
    .join('\n');
  const uses = new Set(list.map((o) => o.t));
  const imports = [
    uses.has('stamp') || uses.has('venue') ? `import {${[uses.has('stamp') ? 'RankStamp' : '', uses.has('venue') ? 'VenueStamp' : ''].filter(Boolean).join(', ')}} from '../components/Stamp';` : '',
    uses.has('card') ? `import {IdCard} from '../components/IdCard';` : '',
    `import {Hit} from '../components/Hit';`,
    `import type {Win} from '../components/Bed';`,
  ].filter(Boolean).join('\n');
  return `${head(n, imports)}
${wins}

export const Scene${nn(n)}: React.FC = () => (
  <BedChain segs={chain(${n})} dur={S${nn(n)}_DUR} wins={[${list.map((_, i) => `W${i}`).join(', ')}]} amp={0.05} maxBlur={8} dim={0.3}>
${jsx}
  </BedChain>
);
`;
}

// 17: "first of three consecutive 1.5-mile tracks... Las Vegas and Charlotte following" - the 1.5 MI stamp,
// then a 6s Kansas -> Las Vegas -> Charlotte map beat over the footage (map starts at scene frame 110).
const S17 = `import React from 'react';
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

export const S17_DUR = mountedFrames(17);

const W0: Win = [70, 78, 96, 108];
const MAP0 = 110;
const MAP: Win = [MAP0, MAP0 + 14, MAP0 + 150, MAP0 + 170];

const MapBeat: React.FC = () => {
  const frame = useCurrentFrame() - MAP0;
  if (frame < 0) return null;
  const out = 1 - ease(frame, 150, 170);
  const k = flat(TRACKS.kansas.ll, US_OPTS);
  const v = flat(TRACKS.vegas.ll, US_OPTS);
  const c = flat(TRACKS.charlotte.ll, US_OPTS);
  const kk = Math.min(1, Math.max(0, (frame - 6) / 14));
  const r1 = ease(frame, 30, 66);
  const vk = Math.min(1, Math.max(0, (frame - 64) / 14));
  const r2 = ease(frame, 86, 124);
  const ck = Math.min(1, Math.max(0, (frame - 116) / 14));
  const titleK = ease(frame, 4, 22);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{backgroundColor: 'rgba(6,6,8,0.72)'}} />
      <USMap opts={US_OPTS} draw={ease(frame, 0, 26)}>
        <Route pts={[k, v]} k={r1} color={C.amber} march={frame * 1.4} />
        <Route pts={[v, c]} k={r2} color={C.amber} march={frame * 1.4} />
        <Pin x={k.x} y={k.y} k={kk} color={C.red} scale={1.3} />
        <Pin x={v.x} y={v.y} k={vk} color={C.muted} scale={1.0} />
        <Pin x={c.x} y={c.y} k={ck} color={C.muted} scale={1.0} />
      </USMap>
      <PinLabel x={k.x} y={k.y} k={kk} text="Kansas" sub="this weekend" align="right" color="#fff" />
      <PinLabel x={v.x} y={v.y} k={vk} text="Las Vegas" sub="next" align="left" color={C.muted} />
      <PinLabel x={c.x} y={c.y} k={ck} text="Charlotte" sub="then" align="right" color={C.muted} />
      <div style={{position: 'absolute', left: 0, top: 118, width: 1920, textAlign: 'center', opacity: titleK}}>
        <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 3px 18px rgba(0,0,0,0.8)'}}>
          THREE STRAIGHT 1.5-MILE TRACKS
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene17: React.FC = () => (
  <BedChain segs={chain(17)} dur={S17_DUR} wins={[W0, MAP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="1.5 MI" label="Three In A Row" at={76} win={W0} />
    <Hit file="Pop.mp3" at={76} volume={0.28} />
    <MapBeat />
    <Hit file="Zoomin-OR-out.mp3" at={MAP0} volume={0.3} />
  </BedChain>
);
`;

for (let n = 1; n <= N; n++) {
  writeFileSync(`remotion/src/scenes/Scene${nn(n)}.tsx`, CUSTOM.has(n) ? S17 : OV[n] ? withOverlays(n) : plain(n));
}

const imports = Array.from({length: N}, (_, i) => `import {Scene${nn(i + 1)}} from './scenes/Scene${nn(i + 1)}';`).join('\n');
const list = Array.from({length: N}, (_, i) => `Scene${nn(i + 1)}`).join(', ');

writeFileSync('remotion/src/FinalFilm.tsx', `import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {HOOK_FRAMES, OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

${imports}

export const SCENES: React.FC[] = [
  ${list},
];

/** No cold open (the user had the hook removed): the VO starts at frame 0 and HOOK_FRAMES is 0. */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
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
        <Audio src={staticFile('vo/long5.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
`);

const KEBAB = [
  'one-point', 'how-tight', 'hollywood-casino-400', 'seventeen-points', 'chase-format', 'gateway-win',
  'bristol-drag-race', 'new-points-leader', 'larson-after-bristol', 'hamlin-cushion', 'mojo', 'kansas-record',
  'kansas-chaos', 'wallace-contact', 'elliott-stats', 'reddick-april', 'three-tracks', 'larson-momentum',
  'no-reset', 'both-arrive', 'unforgiving-math', 'first-test',
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
