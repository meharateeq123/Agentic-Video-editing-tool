# Splits the one remaining source (darlington-highlights-nascar, 1420s) into two halves so both
# CPU workers can transcode it in parallel — the earlier single-stream job died silently around
# 20:17 with no error in its own log (process just vanished; RAM pressure from running alongside
# worker B is the leading suspect), so this also restarts from zero rather than trying to resume.
# Takes a $half argument: 'a' for 0-712s, 'b' for 712-1420s (712s = 1420/2 + keyframe padding room).
param([Parameter(Mandatory)][ValidateSet('a','b')]$half)

$ErrorActionPreference = 'Stop'
$proj = 'D:\flick\output\bell1'
Set-Location $proj
$ff = 'D:\flick\output\cleetusdev1\remotion\node_modules\ffmpeg-static\ffmpeg.exe'
$pool = "$proj\remotion\public\bed-pool"
$crop = 'crop=1710:962:150:118'

if ($half -eq 'a') {
    $ss = 0; $t = 712; $out = "$pool\darlington-half-a.mp4"
} else {
    $ss = 712; $t = 708; $out = "$pool\darlington-half-b.mp4"
}

$tmp = "$out.tmp.mp4"
Write-Output "START darlington-half-$half  $(Get-Date -Format HH:mm:ss)  pid=$PID"
& $ff -y -v error -stats -ss $ss -t $t -i "dl\darlington-highlights-nascar.mp4" -an `
    -vf "$crop,scale=1920:1080:flags=lanczos" `
    -c:v libx264 -preset veryfast -crf 20 $tmp
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED darlington-half-$half"; exit 1 }
Move-Item $tmp $out -Force
Write-Output "DONE  darlington-half-$half  $(Get-Date -Format HH:mm:ss)"
