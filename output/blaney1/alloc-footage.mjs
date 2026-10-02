// Deterministic non-overlapping footage allocator (adapted from the cleetus2/keselowski1 template).
// For each source file, keeps a running cursor (in seconds) and hands out consecutive,
// non-overlapping bursts (each <=190 frames / 6.33s) until a scene's frame need is met.
const FPS = 30;
const MAX_LINK = 190; // frames, under the 7s/210f hard cap

// [startSec, endSec] zones per source that must never be touched by the sweep.
const RESERVED = {
  'gateway-drone1.mp4': [],
  'gateway-drone2.mp4': [],
  'broadcast-wide.mp4': [],
  'broadcast-turn.mp4': [],
  'broadcast-pitroad.mp4': [],
  'broadcast-hamlin.mp4': [],
};

const cursors = {
  'gateway-drone1.mp4': 2,
  'gateway-drone2.mp4': 2,
  'broadcast-wide.mp4': 0.5,
  'broadcast-turn.mp4': 0.5,
  'broadcast-pitroad.mp4': 0.5,
  'broadcast-hamlin.mp4': 0.5,
};

// verify-chains.mjs's CHAINS parser only captures a single \w character after "L(", so every
// source key handed to render() below must be one character (A-Z), never a multi-char id like
// "D1" - that would silently fail to parse and the scene would show as "no links parsed".

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

const SHORT = {
  'gateway-drone1.mp4': 'D',
  'gateway-drone2.mp4': 'G',
  'broadcast-wide.mp4': 'W',
  'broadcast-turn.mp4': 'T',
  'broadcast-pitroad.mp4': 'P',
  'broadcast-hamlin.mp4': 'H',
};

export function render(links) {
  const calls = links.map((l) => {
    const ex = Object.keys(l.extra).length
      ? `, {${Object.entries(l.extra)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')}}`
      : '';
    return `L(${SHORT[l.src]}, ${l.start}, ${l.frames}${ex})`;
  });
  // verify-chains.mjs's parser only reads a single-line scene entry as ONE link, so single-link
  // scenes stay on one line but anything with >1 link must be multi-line (one L() per line) to be
  // counted correctly.
  if (calls.length <= 1) return calls.join(', ');
  return '\n    ' + calls.join(',\n    ') + ',\n  ';
}
