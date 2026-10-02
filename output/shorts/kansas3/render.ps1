# kansas3 short: bundle, single-pass render with VO + SFX, master to -12 LUFS, deliver as <title>.mp4, freeze check.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\output\shorts\kansas3'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
Write-Output "BUNDLE start $(Get-Date -Format HH:mm:ss)"
npx remotion bundle src/index.tsx --out-dir="$proj\bundle"
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED bundle"; exit 1 }
$raw = "$proj\kansas3-quiet.mp4"
$tmp = "$proj\kansas3-quiet.tmp.mp4"
$ok = $false
foreach ($try in 1..3) {
  Write-Output "RENDER try $try $(Get-Date -Format HH:mm:ss)"
  npx remotion render "$proj\bundle" final-film "$tmp" --codec=h264 --crf=18 --gl=angle --concurrency=2 --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
  if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
  if (Test-Path $tmp) { [IO.File]::Delete($tmp) }
}
if (-not $ok) { Write-Output 'FAILED render'; exit 1 }
Move-Item $tmp $raw -Force

# measure, then apply the gain that lands the mix at -12 LUFS with a -1 dBTP-ish limiter
$m = & $ff -hide_banner -i $raw -af ebur128=peak=true -f null - 2>&1 | Out-String
$mm = [regex]::Matches($m, 'I:\s+(-?[\d.]+) LUFS')
$lufs = [double]$mm[$mm.Count - 1].Groups[1].Value
$gain = [Math]::Round(-12 - $lufs, 2)
Write-Output "MEASURED $lufs LUFS -> gain $gain dB"
$title = 'NASCAR JUST Revealed WHY Kansas Could Get CRAZY!.mp4'
$final = Join-Path $proj $title
& $ff -hide_banner -loglevel error -y -i $raw -af "volume=${gain}dB,alimiter=limit=0.891:attack=5:release=60:level=false" -c:v copy -c:a aac -b:a 256k $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED master'; exit 1 }
$probe = & $ff -i $final -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $final -vf "freezedetect=n=-60dB:d=1" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output 'LOUDNESS CHECK:'
& $ff -hide_banner -i $final -af ebur128=peak=true -f null - 2>&1 | Select-String 'I:|Peak:' | Select-Object -Last 2
Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
