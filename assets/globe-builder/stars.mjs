// Deterministic starfield for the globe's background. Seeded so every render on every machine
// gets identical stars — a random field regenerated per render would shimmer between frames.
import sharp from 'sharp';

const T = 'D:/flick/assets/globe/textures';
const W = 4096;
const H = 2048;

let seed = 20260907;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

let stars = '';
for (let i = 0; i < 2600; i++) {
  const x = (rnd() * W).toFixed(1);
  const y = (rnd() * H).toFixed(1);
  // Cubed random keeps most stars tiny and only a few bright, which is what a real sky looks like.
  const r = (0.4 + Math.pow(rnd(), 3) * 2.2).toFixed(2);
  const o = (0.25 + Math.pow(rnd(), 1.6) * 0.75).toFixed(2);
  const warm = rnd();
  const col = warm > 0.9 ? '#ffd9b0' : warm > 0.8 ? '#cfe0ff' : '#ffffff';
  stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" fill-opacity="${o}"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#000206"/>${stars}</svg>`;

await sharp(Buffer.from(svg)).jpeg({quality: 90}).toFile(`${T}/starfield_4096.jpg`);
console.log('BUILT starfield_4096.jpg');
