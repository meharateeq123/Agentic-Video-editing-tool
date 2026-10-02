# matsushita1: short (563 frames) - render whole film in one pass, retrying on the box's intermittent compositor crash.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\swimming\output\matsushita1'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
if (-not (Test-Path "$proj\remotion\public\vo\matsushita1.wav")) {
  New-Item -ItemType HardLink -Path "$proj\remotion\public\vo\matsushita1.wav" -Target "$proj\vo\matsushita1.wav" | Out-Null
}
$out = "$proj\matsushita1-final.mp4"
$tmp = "$proj\matsushita1-video.mp4"
for ($try = 1; $try -le 8; $try++) {
  Write-Output "RENDER try=$try $(Get-Date -Format HH:mm:ss)"
  if (Test-Path "$proj\bundle\index.html") { } else { Remove-Item "$proj\bundle" -Recurse -Force -ErrorAction SilentlyContinue; npx remotion bundle src/index.tsx --out-dir="$proj\bundle" }
  npx remotion render "$proj\bundle" final-film "$tmp" --codec=h264 --crf=18 --muted --gl=angle --concurrency=1 --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
  if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { break }
  Start-Sleep 10
}
if (-not (Test-Path $tmp)) { Write-Output 'FAILED render'; exit 1 }
& $ff -y -i $tmp -i "$proj\vo\matsushita1.wav" -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -shortest $out
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=1.2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
& $ff -hide_banner -i $out 2>&1 | Select-String 'Duration|Stream'
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"
