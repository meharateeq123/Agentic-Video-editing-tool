# yuzidi3 short: bundle, render with the VO, master loudness to about -12 LUFS, freeze check.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\swimming\output\yuzidi3'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
Remove-Item "$proj\bundle" -Recurse -Force -ErrorAction SilentlyContinue
npx remotion bundle src/index.tsx --out-dir="$proj\bundle" 2>&1 | Select-String 'error|Error' | Select-Object -First 3
$raw = "$proj\yuzidi3-raw.mp4"
$out = "$proj\yuzidi3-final.mp4"
$ok = $false
foreach ($try in 1..4) {
  Write-Output "RENDER try $try $(Get-Date -Format HH:mm:ss)"
  npx remotion render "$proj\bundle" final-film "$raw" --codec=h264 --crf=18 --gl=angle --concurrency=1 --timeout=180000 --offthreadvideo-cache-size-in-bytes=67108864 2>&1 | Select-String 'Encoded 6|error|Error' | Select-Object -Last 2
  if ($LASTEXITCODE -eq 0 -and (Test-Path $raw)) { $ok = $true; break }
  Remove-Item $raw -Force -ErrorAction SilentlyContinue
  Start-Sleep 8
}
if (-not $ok) { Write-Output 'FAILED render'; exit 1 }
# loudness: measure, then gain + limiter so the integrated level lands near -12 LUFS
$m = & $ff -hide_banner -i $raw -af ebur128=peak=true -f null - 2>&1 | Out-String
$i = [regex]::Matches($m, 'I:\s+(-?[\d.]+)\s+LUFS') | Select-Object -Last 1
$lufs = [double]$i.Groups[1].Value
$gain = [math]::Round(-12 - $lufs, 2)
Write-Output "MEASURED $lufs LUFS -> gain $gain dB"
& $ff -y -hide_banner -loglevel error -i $raw -af "volume=${gain}dB,alimiter=limit=0.891:attack=5:release=60:level=false" -c:v copy -c:a aac -b:a 256k $out
$m2 = & $ff -hide_banner -i $out -af ebur128=peak=true -f null - 2>&1 | Out-String
Write-Output ("FINAL LUFS: " + ([regex]::Matches($m2, 'I:\s+(-?[\d.]+)\s+LUFS') | Select-Object -Last 1).Groups[1].Value)
& $ff -hide_banner -i $out 2>&1 | Select-String 'Duration|Stream #0:0'
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=1" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"
