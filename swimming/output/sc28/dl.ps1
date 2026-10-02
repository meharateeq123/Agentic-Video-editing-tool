Set-Location 'D:\flick\swimming\output\sc28\sources'
$f='bv*[height<=1080][vcodec^=avc1]'
foreach ($id in 'UA7BjGI4xV0','uJCImUmVRus','ND_sPfabFic','FM-yQx6teRk','g6zkjbQCmqs','Rc-MeZx4i20') { python -m yt_dlp -q --no-warnings --write-auto-subs --sub-langs en --sub-format vtt -f $f -o "$id.%(ext)s" "https://www.youtube.com/watch?v=$id"; "done $id $LASTEXITCODE" }
"ALLDONE"
