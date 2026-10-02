// The 15-second cold-open montage. One list drives both the picture (HookMontage.tsx plays these
// ranges from bed-pool) and the sound (render-1080.ps1 cuts the same ranges' REAL audio from
// ../sources and lays the VO after them), so picture and sound can never drift apart.
//
// Every cut is the clip's own sound - crowd, commentary, or Phelps' own voice. No narration.
// render-1080.ps1 parses `file: '...', from: X, frames: N` in that order - keep the field order.

export const HOOK_SECONDS = 15;
export const HOOK_FRAMES = HOOK_SECONDS * 30;

export type HookWord = {t: string; at: number; hot?: boolean};

export type HookCut = {
  /** file name, identical in remotion/public/bed-pool (picture) and ../sources (audio) */
  file: string;
  /** seconds into the source */
  from: number;
  frames: number;
  /** the uploading channel's real YouTube handle */
  source: string;
  /** Phelps' own words in this cut. `at` = frame (from the cut's start) the word is said, from
   *  Whisper word timestamps on the clip itself. */
  words?: HookWord[];
};

export const HOOK_CUTS: HookCut[] = [
  // Rio 2016, his last race: the relay finish and the crowd.
  {file: 'rio-medley-last-race.mp4', from: 291.5, frames: 103, source: '@Olympics'},
  // "I questioned whether I wanted to be alive anymore." (14.98-17.34s)
  {
    file: 'talkspace-therapy-saved.mp4', from: 14.9, frames: 74, source: '@talkspace',
    words: [
      {t: 'I', at: 2}, {t: 'questioned', at: 18}, {t: 'whether', at: 29}, {t: 'I', at: 37},
      {t: 'wanted', at: 43}, {t: 'to', at: 48}, {t: 'be', at: 55}, {t: 'alive', at: 58, hot: true},
      {t: 'anymore.', at: 65},
    ],
  },
  // Phelps' roar after the 4x100 free relay. Not 530-535: that is the finish and results board
  // from overhead; the close-up of him roaring starts at 535.4.
  {file: 'beijing2008-eight-golds.mp4', from: 535.4, frames: 75, source: '@Olympics'},
  // "I saw it as a sign of weakness." (58.00-59.40s)
  {
    file: 'nbc-depression.mp4', from: 57.9, frames: 60, source: '@NBCNews',
    words: [
      {t: 'I', at: 3}, {t: 'saw', at: 14}, {t: 'it', at: 22}, {t: 'as', at: 25}, {t: 'a', at: 29},
      {t: 'sign', at: 31}, {t: 'of', at: 35}, {t: 'weakness.', at: 37, hot: true},
    ],
  },
  // "That decision saved my life." (30.06-32.06s)
  {
    file: 'talkspace-therapy-saved.mp4', from: 30.0, frames: 65, source: '@talkspace',
    words: [
      {t: 'That', at: 2}, {t: 'decision', at: 23}, {t: 'saved', at: 34}, {t: 'my', at: 44},
      {t: 'life.', at: 51, hot: true},
    ],
  },
  // Rio podium, his last gold.
  {file: 'rio-medley-last-race.mp4', from: 420, frames: 73, source: '@Olympics'},
];

/** Shown bottom-centre over the last cut, right before the hard cut to black. */
export const HOOK_SUSPENSE_LINE = 'The medals stopped. The real fight didn’t.';
