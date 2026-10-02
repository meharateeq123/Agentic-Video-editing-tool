// Deterministic non-overlapping footage allocator (adapted from the keselowski1/larson1 template).
// For each source file, keeps a running cursor (in seconds) and hands out consecutive,
// non-overlapping bursts (each <=190 frames / 6.33s) until a scene's frame need is met.
const FPS = 30;
const MAX_LINK = 190; // frames, under the 7s/210f hard cap

// [startSec, endSec] zones per source that must never be touched by the sweep.
const RESERVED = {
  'giveaway-reveal.mp4': [
    [0, 8], // intro bumper/black frames
  ],
  'freedom-factory-tour.mp4': [
    [0, 5],
  ],
};

const cursors = {
  'giveaway-reveal.mp4': 20,
  'freedom-factory-tour.mp4': 15,
};

function inReserved(src, s, e) {
  return (RESERVED[src] || []).some(([a, b]) => s < b && a < e);
}

function nextSlot(src, frames) {
  const dur = frames / FPS;
  let s = cursors[src];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const e = s + dur;
    if (inReserved(src, s, e)) {
      s = Math.max(...RESERVED[src].filter(([a, b]) => s < b && a < e).map(([, b]) => b));
      continue;
    }
    cursors[src] = e + 0.4; // small gap so consecutive links never touch
    return {start: Number(s.toFixed(2)), frames};
  }
}

// scene => [{src, frames, extra}]  — split each scene's need into <=190f bursts automatically.
export function allocate(src, totalFrames, extraList = []) {
  const links = [];
  let remaining = totalFrames;
  let i = 0;
  while (remaining > 0) {
    const f = Math.min(MAX_LINK, remaining);
    const {start} = nextSlot(src, f);
    links.push({src, start, frames: f, extra: extraList[i] || extraList[extraList.length - 1] || {}});
    remaining -= f;
    i++;
  }
  return links;
}

export function fixed(src, start, frames, extra = {}) {
  return [{src, start, frames, extra}];
}

export function render(links) {
  const short = {'giveaway-reveal.mp4': 'R', 'freedom-factory-tour.mp4': 'F'};
  const calls = links.map((l) => {
    const ex = Object.keys(l.extra).length
      ? `, {${Object.entries(l.extra)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')}}`
      : '';
    return `L(${short[l.src]}, ${l.start}, ${l.frames}${ex})`;
  });
  // verify-chains.mjs's parser only reads a single-line scene entry as ONE link, so single-link
  // scenes stay on one line but anything with >1 link must be multi-line (one L() per line) to be
  // counted correctly.
  if (calls.length <= 1) return calls.join(', ');
  return '\n    ' + calls.join(',\n    ') + ',\n  ';
}
