Set-Location 'D:\flick\swimming\output\kojima1\dl'
$ff='D:\flick\output\shorts\blaney1\remotion\node_modules\ffmpeg-static'
$fmt='bv*[height<=720][vcodec^=avc1]+ba[ext=m4a]/b[height<=720][vcodec^=avc1]'
$jobs=@(@('nhk','EQ3PTEUkZMY'),@('js','XsFn0enT7-M'),@('jn1','Op3kvI364Nc'),@('sam','VJdmxXwj6oY'),@('jn2','o3ofD_JCZT0'),@('hl','jRHbzmy_2Mc'),@('wjr','D8pAhu5Mx4o'))
foreach($j in $jobs){ python -m yt_dlp -f $fmt --merge-output-format mp4 --ffmpeg-location $ff -o "$($j[0]).%(ext)s" "https://www.youtube.com/watch?v=$($j[1])" --no-progress -q; "$($j[0]) done" }
