import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/scenes';
const map = [
  ['â€”', '—'], // em dash
  ['â€“', '–'], // en dash
  ['â€™', '’'], // right single quote
  ['â€˜', '‘'],
  ['â€œ', '“'],
  ['â€', '”'],
  ['âˆ’', '−'], // minus
  ['Ã©', 'é'], // é
  ['Ã¨', 'è'],
  ['Ã¶', 'ö'],
  ['ï»¿', ''], // stray BOM
];

let total = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.tsx')) continue;
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [bad, good] of map) s = s.split(bad).join(good);
  if (s !== before) {
    fs.writeFileSync(p, s, 'utf8');
    console.log('repaired', f);
    total++;
  }
}
console.log('files repaired:', total);
