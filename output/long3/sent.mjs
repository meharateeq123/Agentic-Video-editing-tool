import {readFileSync} from 'node:fs';
const norm=(w)=>w.toLowerCase().replace(/[^a-z0-9]/g,'');
const words=JSON.parse(readFileSync('vo/words.json','utf8'));
const cuts=JSON.parse(readFileSync('cuts.json','utf8'));
const paras=readFileSync('source-script.txt','utf8').split(/\r?\n/).filter(Boolean);
let cursor=0;
paras.forEach((p,pi)=>{
  const c=cuts[pi];
  const sents=p.match(/[^.?!]+[.?!]+["']?\s*/g)||[p];
  const out=[];
  for(const s of sents){
    const ws=s.split(/\s+/).map(norm).filter(Boolean);
    const key=ws.slice(0,3);
    let found=-1;
    for(let i=cursor;i<words.length-2;i++){ if(key.every((k,j)=>words[i+j].w===k)){found=i;break;} }
    if(found<0){ // fallback first word
      for(let i=cursor;i<Math.min(words.length,cursor+400);i++) if(words[i].w===ws[0]){found=i;break;}
    }
    if(found>=0){cursor=found+1; out.push(`  ${(words[found].start-c.start).toFixed(1).padStart(5)}s | ${s.trim().slice(0,90)}`);}
    else out.push(`   ?? | ${s.trim().slice(0,90)}`);
  }
  console.log(`--- scene ${pi+1}  ${c.start}-${c.end} (${(c.end-c.start).toFixed(1)}s)`);
  console.log(out.join('\n'));
});
