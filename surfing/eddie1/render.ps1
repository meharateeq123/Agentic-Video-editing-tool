# eddie1: chunked render into parts/ (audio baked in per chunk - Footage.tsx always mutes its own
# clips, HookOpen's own real audio + the VO Audio are the only sound, so no --muted / separate-mux
# needed), then concat. Resumable - re-run to pick up where it left off.
# Self-healing: this box has 8GB RAM and the compositor intermittently dies (access violation /
# EPIPE / silent OOM) under memory pressure. Every step below retries in a loop with backoff instead
# of giving up, so one launch runs to completion unattended.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\surfing\eddie1'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

New-Item -ItemType Directory -Force -Path "$proj\remotion\public\vo" | Out-Null
if (-not (Test-Path "$proj\remotion\public\vo\eddie1.wav")) {
  New-Item -ItemType HardLink -Path "$proj\remotion\public\vo\eddie1.wav" -Target "$proj\vo\eddie1.wav" -ErrorAction SilentlyContinue | Out-Null
}

$cuts = Get-Content "$proj\cuts.json" | ConvertFrom-Json
$filmSeconds = ($cuts | Select-Object -Last 1).end
$hookSeconds = 0
$totalFrames = [math]::Round(($filmSeconds + $hookSeconds) * 30)
Write-Output "TOTAL_FRAMES = $totalFrames ($([math]::Round($filmSeconds+$hookSeconds,1))s)"

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
if (-not (Test-Path "$proj\bundle\public\vo\eddie1.wav")) {
  New-Item -ItemType HardLink -Path "$proj\bundle\public\vo\eddie1.wav" -Target "$proj\vo\eddie1.wav" -ErrorAction SilentlyContinue | Out-Null
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
    Write-Output "RENDER $partName frames $s-$e try=$try concurrency=1 $(Get-Date -Format HH:mm:ss)"
    npx remotion render "$proj\bundle" final-film "$tmp" --frames="$s-$e" --codec=h264 --crf=18 --gl=angle --concurrency=1 --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
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
$out = "$proj\eddie1-final.mp4"
& $ff -y -f concat -safe 0 -auto_convert 0 -i $listPath -c copy $out
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

$probe = & $ff -i $out -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK:'
& $ff -hide_banner -i $out -vf "freezedetect=n=-60dB:d=2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output "AUDIO CHECK:"
& $ff -i $out -af volumedetect -vn -f null - 2>&1 | Select-String 'mean_volume|max_volume'
Write-Output "COMPLETE $out $(Get-Date -Format HH:mm:ss)"
