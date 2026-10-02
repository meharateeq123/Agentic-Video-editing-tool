# zhang5 short: bundle, single-pass render with the VO, duration probe, freeze check, then a
# post-mux loudness pass (target ~-12 LUFS, true peak <= -1dBTP).
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\swimming\output\zhang5'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
Write-Output "BUNDLE start $(Get-Date -Format HH:mm:ss)"
npx remotion bundle src/index.tsx --out-dir="$proj\bundle"
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED bundle"; exit 1 }
$raw = "$proj\zhang5-raw.mp4"
$tmp = "$proj\zhang5-raw.tmp.mp4"
$ok = $false
foreach ($try in 1..3) {
  Write-Output "RENDER try $try $(Get-Date -Format HH:mm:ss)"
  npx remotion render "$proj\bundle" final-film "$tmp" --codec=h264 --crf=18 --gl=angle --concurrency=1 --timeout=180000 --offthreadvideo-cache-size-in-bytes=33554432
  if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
  if (Test-Path $tmp) { Remove-Item $tmp -Force }
}
if (-not $ok) { Write-Output 'FAILED render'; exit 1 }
Move-Item $tmp $raw -Force

Write-Output "LOUDNESS pass $(Get-Date -Format HH:mm:ss)"
$out = "$proj\Zhang Zhanshuo JUST Did Something NO Swimmer Had Done Before!.mp4"
& $ff -hide_banner -y -i $raw -af "volume=14.5dB:eval=frame,alimiter=limit=0.891:attack=5:release=60:level=false" -c:v copy -c:a aac -b:a 256k $out

$probe = & $ff -i $out -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=1" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output 'LOUDNESS CHECK:'
& $ff -hide_banner -i $out -af "ebur128=peak=true" -f null - 2>&1 | Select-String 'I:|Peak:' | Select-Object -Last 4
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"
