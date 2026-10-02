Set-Location 'D:\flick\swimming\output\yuzidi4\dl'
$ff='D:\flick\output\shorts\blaney1\remotion\node_modules\ffmpeg-static'
$fmt='bv*[height<=720][vcodec^=avc1]+ba[ext=m4a]/b[height<=720][vcodec^=avc1]'
$jobs=@(@('im-final','_WeNEjIBTQE'),@('apt-fly','7a1dAijpPJE'),@('apt-4golds','yUzNfOH6WeI'),@('wion1','JUrt3WoOFzw'),@('wion2','iDzgokycMeU'))
foreach($j in $jobs){ python -m yt_dlp -f $fmt --merge-output-format mp4 --ffmpeg-location $ff -o "$($j[0]).%(ext)s" "https://www.youtube.com/watch?v=$($j[1])" --no-progress -q; "$($j[0]) done" }
