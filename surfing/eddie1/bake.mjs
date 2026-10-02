// Bakes every 1920x1080 / 30fps bed for the Eddie Aikau film. Row: name, source, start s, length s, mode.
// mode: undefined = full frame; 'zoomTop' = trim the top 10% (a heat scoreboard) and scale back to 16:9.
//
// Footage honesty: nothing here is the 1978 capsize *filmed from the water by a news crew* - it is the
// documentary's own archival cutaways, so beats are matched to the line by subject, not claimed as exact.
//   DOC  QAH5HYpu3so  "The Eddie Aikau Story" (ABC Wide World of Sports documentary, Cumulus). 47 min of
//                     interviews with burned-in name lower-thirds - those shots are NOT used; only the
//                     archival cutaways between them (1978 Hokule'a voyage, storm, hull, night, early
//                     photos of Eddie, 1970s surfing, beach).
//   ES   gK0BtceW3gY  ESPN "Hawaiian: The Legend of Eddie Aikau" 30 for 30 trailer: the newspaper clipping
//                     "thanks rescuer Eddie Aikau", the capsized canoe, the grave.
//   WS   PQECse9VW20  WSL, water patrol rescues at The Eddie, Waimea Bay 2015/16 - a heat scoreboard runs
//                     across the top, trimmed away (zoomTop).
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\surfing\\eddie1\\dl\\';
const OUT = 'D:\\flick\\surfing\\eddie1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {DOC: 'QAH5HYpu3so.mp4', ES: 'gK0BtceW3gY.mp4', WS: 'PQECse9VW20.mp4'};

export const BEATS = [
  // S1 - "March 1978, in rough seas off Molokai, the voyaging canoe Hokule'a lies capsized."
  ['b01', 'DOC', 1874.0, 2.9],
  ['b02', 'DOC', 2058.0, 2.9],
  ['b03', 'DOC', 2340.0, 2.9],
  // S2 - "Sixteen crew members cling to its hull. One of them is about to make a choice..."
  ['b04', 'DOC', 2346.0, 3.3],
  ['b05', 'DOC', 2070.0, 3.3],
  // S3 - "Eddie Aikau was Waimea Bay's first lifeguard."
  ['b06', 'DOC', 87.0, 2.3, 'frame'],
  ['b07', 'DOC', 411.0, 2.3],
  // S4 - "He pulled more than 500 people from the ocean. Not one person drowned on his watch."
  ['b08', 'ES', 84.0, 3.0],
  ['b09', 'WS', 124.0, 3.0, 'zoomTop'],
  // S5 - "Now his own crew needed saving. Their voyage to Tahiti had lasted only hours. Drifting, cold..."
  ['b10', 'DOC', 1826.0, 3.0],
  ['b11', 'DOC', 2220.0, 3.0],
  ['b12', 'DOC', 2292.0, 3.0],
  // S6 - "So Eddie put on a life vest, grabbed his surfboard, and paddled toward Lanai..."
  ['b13', 'DOC', 567.0, 3.2],
  ['b14', 'DOC', 501.0, 3.2],
  // S7 - "That night, a passing airliner spotted the crew's flares. Everyone on the canoe was rescued."
  ['b15', 'DOC', 2364.0, 3.1],
  ['b16', 'DOC', 2052.0, 3.1],
  // S8 - "Everyone except Eddie. Searchers covered the ocean by air and sea. His body was never found. He was 31."
  ['b17', 'DOC', 2304.0, 2.7],
  ['b18', 'ES', 124.0, 2.7],
  ['b19', 'DOC', 2376.0, 2.7],
  // S9 - "What happened to him out there? No one knows. But Hawaii remembers what he chose."
  ['b20', 'DOC', 2064.0, 2.9],
  ['b21', 'DOC', 591.0, 2.9],
  // S10 - "Today, three words carry his legacy: Eddie Would Go."
  ['b22', 'DOC', 99.0, 2.3],
  ['b23', 'WS', 14.0, 2.3, 'zoomTop'],
];

const only = process.argv.slice(2);
for (const [name, k, start, len, mode] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const vf = mode === 'frame'
    ? 'crop=760:428:262:76,scale=1920:1080:flags=lanczos,fps=30,setsar=1'
    : mode === 'zoomTop'
    ? 'crop=1056:594:112:120,scale=1920:1080:flags=lanczos,fps=30,setsar=1'
    : k === 'DOC'
      ? 'crop=752:423:266:149,scale=1920:1080:flags=lanczos,fps=30,setsar=1'
      : 'scale=1920:1080:flags=lanczos,fps=30,setsar=1';
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', DL + FILES[k],
    '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, k, start);
}
