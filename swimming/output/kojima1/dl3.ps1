Set-Location 'D:\flick\swimming\output\kojima1\dl'
$ff='D:\flick\output\shorts\blaney1\remotion\node_modules\ffmpeg-static'
foreach($j in @(@('pp','K-6tqztILTQ'),@('tva','xilM9L6754k'))){ for($t=0;$t -lt 3;$t++){ python -m yt_dlp -f "bv*[height<=720][vcodec^=avc1]+ba[ext=m4a]/b[height<=720][vcodec^=avc1]" --merge-output-format mp4 --ffmpeg-location $ff -o "$($j[0]).%(ext)s" "https://www.youtube.com/watch?v=$($j[1])" --no-progress -q; if(Test-Path "$($j[0]).mp4"){break} }; "$($j[0]) done" }
