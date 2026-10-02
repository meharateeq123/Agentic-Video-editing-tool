Set-Location 'D:\flick\swimming\output\kojima1\dl'
$ff='D:\flick\output\shorts\blaney1\remotion\node_modules\ffmpeg-static'
foreach($j in @(@('nhk','EQ3PTEUkZMY'),@('js','XsFn0enT7-M'),@('phelps','sHblLbk0Flo'))){ for($t=0;$t -lt 3;$t++){ python -m yt_dlp -f "136+140/bv*[height<=720][vcodec^=avc1]+ba[ext=m4a]" --merge-output-format mp4 --ffmpeg-location $ff -o "$($j[0]).%(ext)s" "https://www.youtube.com/watch?v=$($j[1])" --no-progress -q; if(Test-Path "$($j[0]).mp4"){break} }; "$($j[0]) done" }
