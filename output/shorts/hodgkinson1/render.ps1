# hodgkinson1 short: bundle, single-pass render with the VO, duration probe, freeze check.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\output\shorts\hodgkinson1'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
Write-Output "BUNDLE start $(Get-Date -Format HH:mm:ss)"
npx remotion bundle src/index.tsx --out-dir="$proj\bundle"
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED bundle"; exit 1 }
$out = "$proj\hodgkinson1-final.mp4"
$tmp = "$proj\hodgkinson1-final.tmp.mp4"
$ok = $false
foreach ($try in 1..3) {
  Write-Output "RENDER try $try $(Get-Date -Format HH:mm:ss)"
  npx remotion render "$proj\bundle" final-film "$tmp" --codec=h264 --crf=18 --gl=angle --concurrency=1 --timeout=180000 --offthreadvideo-cache-size-in-bytes=67108864
  if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
  if (Test-Path $tmp) { Remove-Item $tmp -Force }
}
if (-not $ok) { Write-Output 'FAILED render'; exit 1 }
Move-Item $tmp $out -Force
$probe = & $ff -i $out -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=1" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"







