# Usage: powershell -File sheet.ps1 <src.mp4> <out.jpg> <t1,t2,...> [cols] [width]
# Grabs one frame at each second-mark, burns the mark into it, tiles them into a contact sheet.
param([string]$Src, [string]$Out, [string]$Times, [int]$Cols = 5, [int]$W = 384)
$ff = 'D:\flick\output\rainrule1\remotion\node_modules\ffmpeg-static\ffmpeg.exe'
$tmp = Join-Path $env:TEMP ("sheet_" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $tmp | Out-Null
$i = 0
foreach ($t in ($Times -split ',')) {
  $i++
  $lab = [string]$t
  & $ff -y -loglevel error -ss $t -i $Src -frames:v 1 -vf "scale=${W}:-1,drawtext=text='$lab':x=6:y=6:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.7" ("$tmp\f{0:D3}.jpg" -f $i) 2>$null
}
& $ff -y -loglevel error -i "$tmp\f%03d.jpg" -filter_complex "tile=${Cols}x$([math]::Ceiling($i / $Cols))" $Out
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
"sheet $Out ($i frames)"
