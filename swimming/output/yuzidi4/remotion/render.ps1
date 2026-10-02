# yuzidi4: chunked render into parts/ (VO is the only sound - Footage/BedChain always mutes its
# own clips), then concat. Resumable - re-run to pick up where it left off. Every step retries in a
# loop with backoff so one launch runs to completion unattended, same pattern as long3's render.ps1.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\swimming\output\yuzidi4'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

$totalFrames = 13902
Write-Output "TOTAL_FRAMES = $totalFrames (463.4s)"

$bundleOk = $false
for ($try = 1; $try -le 20; $try++) {
  if (-not (Test-Path "$proj\bundle\index.html")) { Remove-Item "$proj\bundle" -Recurse -Force -ErrorAction SilentlyContinue }
  Write-Output "BUNDLE start try=$try $(Get-Date -Format HH:mm:ss)"
  npx remotion bundle src/index.tsx --out-dir="$proj\bundle"
  if ($LASTEXITCODE -eq 0 -and (Test-Path "$proj\bundle\bundle.js")) { $bundleOk = $true; break }
  Write-Output "BUNDLE failed try=$try, retrying after backoff"
  Start-Sleep 15
}
if (-not $bundleOk) { Write-Output 'FAILED bundle after 20 tries'; exit 1 }

New-Item -ItemType Directory -Force -Path "$proj\bundle\public\vo" | Out-Null
if (-not (Test-Path "$proj\bundle\public\vo\yuzidi4.wav")) {
  Copy-Item "$proj\remotion\public\vo\yuzidi4.wav" "$proj\bundle\public\vo\yuzidi4.wav" -Force
}

New-Item -ItemType Directory -Force -Path "$proj\parts" | Out-Null
$chunk = 300
$idx = 0
for ($s = 0; $s -lt $totalFrames; $s += $chunk) {
  $idx++
  $e = [Math]::Min($s + $chunk - 1, $totalFrames - 1)
  $partName = "part{0:D2}.mp4" -f $idx
  $out = "$proj\parts\$partName"
  if (Test-Path $out) { Write-Output "SKIP $partName (exists)"; continue }
  $tmp = "$out.tmp.mp4"
  $ok = $false
  for ($try = 1; $try -le 30; $try++) {
    Write-Output "RENDER $partName frames $s-$e try=$try concurrency=2 gl=angle $(Get-Date -Format HH:mm:ss)"
    npx remotion render "$proj\bundle" final-film "$tmp" --frames="$s-$e" --codec=h264 --crf=18 --gl=angle --concurrency=2 --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
    if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    Write-Output "RENDER $partName try=$try failed, retrying after backoff"
    Start-Sleep 15
  }
  if (-not $ok) { Write-Output "FAILED $partName after 30 tries - stopping, re-run to resume"; exit 1 }
  Move-Item $tmp $out -Force
}

Write-Output "CONCAT start $(Get-Date -Format HH:mm:ss)"
$listPath = "$proj\parts\list.txt"
Get-ChildItem "$proj\parts" -Filter 'part*.mp4' | Sort-Object Name | ForEach-Object { "file '$($_.FullName)'" } | Set-Content $listPath -Encoding ascii
$out = "$proj\yuzidi4-final.mp4"
& $ff -y -f concat -safe 0 -auto_convert 0 -i $listPath -c copy $out
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

$probe = & $ff -i $out -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output "AUDIO CHECK:"
& $ff -i $out -af volumedetect -vn -f null - 2>&1 | Select-String 'mean_volume|max_volume'
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"
