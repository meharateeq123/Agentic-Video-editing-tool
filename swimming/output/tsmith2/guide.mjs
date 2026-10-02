import {BEATS} from './beats.mjs';
import {execFileSync} from 'node:child_process';
const ff='D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe', dl='D:\\flick\\swimming\\output\\tsmith1\\dl\\';
let i=0;
for (const [n,f,s,l,cx] of BEATS){ i++;
  const t=(s+0.7).toFixed(2);
  // 9:16 window: width = ih*9/16; draw box centred on cx
  const vf=`scale=480:-1,drawbox=x=max(0\\,min(iw-ih*9/16\\,iw*${cx}-ih*9/32)):y=0:w=ih*9/16:h=ih:color=red@0.9:t=3,drawtext=text='${n} ${f.slice(0,3)} ${s}':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black@0.6`;
  execFileSync(ff,['-hide_banner','-loglevel','error','-y','-ss',t,'-i',dl+f,'-frames:v','1','-vf',vf,`qc/g${String(i).padStart(2,'0')}.png`]);
}
