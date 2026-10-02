Set-Location 'D:\flick\swimming\output\yuzidi4\dl'
$ff='D:\flick\output\shorts\blaney1\remotion\node_modules\ffmpeg-static'
$fmt='bv*[height<=720][vcodec^=avc1]+ba[ext=m4a]/b[height<=720][vcodec^=avc1]'
$jobs=@(@('mc-wr','zOWS_GBJue0'),@('hz-wr','uJdQXXtmUkE'),@('mc-paris','mi0VawAZi04'))
foreach($j in $jobs){ python -m yt_dlp -f $fmt --merge-output-format mp4 --ffmpeg-location $ff -o "$($j[0]).%(ext)s" "https://www.youtube.com/watch?v=$($j[1])" --no-progress -q; "$($j[0]) done" }
