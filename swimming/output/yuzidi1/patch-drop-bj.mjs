// One-off: replace the Beijing swim-school source with the cropped China Daily clip.
// The Beijing upload carries a promoter's "www.alifaedtech.com — For Admissions" badge that moves
// between shots, so no single crop removes it; an ad does not go in the film.
import {readFileSync, writeFileSync} from 'node:fs';

const f = 'build-footage.mjs';
let s = readFileSync(f, 'utf8');

const ct = `  CT: {
    file: 'china-swim-training.mp4',
    // China Daily, Chinese swimmers in training. Re-baked with its decorative frame and the
    // CHINADAILY bug cropped off (crop=414:233:36:65 at source), which leaves it soft — kept to the
    // training beats only. Replaces a Beijing swim-school clip whose promoter badge moves between
    // shots and could not be cropped out.
    usable: [
      [9, 42],
      [44, 62],
    ],
  },
`;

const before = s;
s = s.replace(/  BJ: \{[\s\S]*?\n  \},\n/, ct);
s = s.replace("5: ['HP', 'IT', 'BJ']", "5: ['HP', 'IT', 'CT']");
s = s.replace("6: ['IT', 'BJ']", "6: ['IT', 'CT']");
s = s.replace("7: ['BJ', 'IT']", "7: ['IT', 'CT']");
s = s.replace("11: ['MF4', 'BJ']", "11: ['MF4']");
s = s.replace(
  ' *   BJ   beijing-swim-school.mp4   children\'s swim meet at a Beijing school (badge cropped off)',
  ' *   CT   china-swim-training.mp4   China Daily, Chinese swimmers training (frame and bug cropped off)'
);

if (s === before || /'BJ'/.test(s)) {
  console.error('patch did not apply cleanly');
  process.exit(1);
}
writeFileSync(f, s);
console.log('BJ -> CT patched');
