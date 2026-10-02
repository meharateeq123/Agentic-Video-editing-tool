# tsmith1: chunked, resumable 1080p render on the GPU (angle), same recipe as yuzidi4/phelps1.
# Picture is rendered MUTED in 300-frame parts; the audio is the VO only (no cold open).
# Re-run to resume - finished parts are skipped. Every step retries with backoff.
$ErrorActionPreference = 'Continue'
$proj = 'D:\flick\swimming\output\tsmith1'
Set-Location "$proj\remotion"
$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

# stale Remotion temp dirs fill C: on this box
$cut = (Get-Date).AddMinutes(-5)
Get-ChildItem $env:TEMP -Directory -ErrorAction SilentlyContinue |
  Where-Object { ($_.Name -like 'remotion-*' -or $_.Name -like 'react-motion-render*') -and $_.LastWriteTime -lt $cut } |
  ForEach-Object { try { Remove-Item $_.FullName -Recurse -Force -ErrorAction Stop } catch {} }

$tl = Get-Content "$proj\remotion\src\timeline.ts" -Raw
$filmSeconds = [double]([regex]::Match($tl, 'FILM_SECONDS = ([\d.]+)').Groups[1].Value)
$hookSeconds = 0
$totalFrames = [int][Math]::Round($filmSeconds * 30) + $hookSeconds * 30
Write-Output "TOTAL_FRAMES = $totalFrames (hook $hookSeconds s + VO $filmSeconds s)"

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
    npx remotion render "$proj\bundle" final-film "$tmp" --frames="$s-$e" --codec=h264 --crf=18 --muted --gl=angle --concurrency=2 --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
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
Get-ChildItem "$proj\parts" -Filter 'part*.mp4' | Sort-Object Name | ForEach-Object { "file '$($_.FullName -replace '\\','/')'" } | Set-Content $listPath -Encoding ascii
$videoOnly = "$proj\video-only.mp4"
& $ff -y -f concat -safe 0 -auto_convert 0 -i $listPath -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

# --- audio: just the VO (no cold open) ----------------------------------------------------------------
$inputs = @('-i', "$proj\vo\vo.wav")
$filters = @("[0:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[aout]")
$audio = "$proj\audio-full.m4a"
& $ff -y @inputs -filter_complex ($filters -join ';') -map '[aout]' -c:a aac -b:a 192k $audio
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED audio build'; exit 1 }

$final = "$proj\Tatjana Smith Lost Her Love for Swimming - Then THIS Happened!.mp4"
& $ff -y -i $videoOnly -i $audio -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy -shortest $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

$probe = & $ff -i $final -hide_banner 2>&1 | Select-String 'Duration|Stream'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK (any line below is a frozen stretch to re-render):'
& $ff -hide_banner -i $final -vf "freezedetect=n=-60dB:d=2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output 'AUDIO CHECK:'
& $ff -i $final -af volumedetect -vn -f null - 2>&1 | Select-String 'mean_volume|max_volume'
Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"

