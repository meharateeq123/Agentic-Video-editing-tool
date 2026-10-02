Set-Location 'D:\flick\swimming\output\sc27\sources'
$f='bv*[height<=1080][vcodec^=avc1]'
foreach ($id in 'bWiFHfYHusg','TH8MUt0reQM','lWSr56NXigw') { python -m yt_dlp -q --no-warnings -f $f -o "$id.%(ext)s" "https://www.youtube.com/watch?v=$id"; "done $id $LASTEXITCODE" }
python -m yt_dlp -q --no-warnings -f $f --download-sections "*0-100" --force-keyframes-at-cuts -o "toronto-2025.%(ext)s" "https://www.youtube.com/watch?v=2jJm1VF42FM"; "done toronto $LASTEXITCODE"
"ALLDONE"
