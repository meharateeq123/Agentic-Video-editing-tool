import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

/** One id per paragraph in source-script.txt, in order — these name the Studio compositions. */
const KEBAB = [
  'photo-from-singapore',
  'she-is-twelve',
  'the-record-to-come',
  'who-is-yu-zidi',
  'the-water-park',
  'that-one-question',
  'she-never-quit',
  'the-age-rule',
  'beating-the-standard',
  'nationals-2-10-63',
  'two-seconds-at-eleven',
  'she-earned-her-lane',
  'li-bingjie-and-mcintosh',
  'singapore-2025',
  'ledecky-and-mcintosh',
  'youngest-finalist',
  'here-to-fight',
  'fourth-by-six-hundredths',
  'the-200-butterfly',
  'the-400-medley',
  'three-fourth-places',
  'not-a-heartbreak',
  'the-relay-split',
  'eighty-nine-years',
  'no-signature-swim-yet',
  'the-promised-number',
  'national-games-shenzhen',
  'two-oh-seven-four-one',
  'erasing-ye-shiwen',
  'ninth-of-all-time',
  'say-it-again',
  'best-junior-in-the-world',
  'what-happens-next',
  'los-angeles-2028',
  'barely-a-beginning',
  'the-close-recap',
  'ceiling-or-warning-shot',
];

export const RemotionRoot: FC = () => (
  <>
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {SCENES.map((Comp, i) => (
      <Composition
        key={KEBAB[i]}
        id={KEBAB[i]}
        component={Comp}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
