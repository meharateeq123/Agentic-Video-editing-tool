param([string]$name, [double]$step = 4, [int]$cols = 8, [int]$rows = 8, [int]$w = 300)
$ff = "D:\flick\swimming\output\tsmith1\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$sd = "D:\flick\swimming\output\tsmith1\sheets"
$src = "D:\flick\swimming\output\tsmith1\dl\$name.mp4"
$fps = "1/$step"
& $ff -y -v error -i $src -vf "fps=$fps,scale=${w}:-1,drawtext=fontfile='C\:/Windows/Fonts/arial.ttf':text='%{pts\:hms}':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=${cols}x${rows}" "$sd\${name}_%02d.jpg"
Get-ChildItem $sd -Filter "${name}_*.jpg" | Select-Object -ExpandProperty Name
