# 1080p render driver for the Michael Phelps film. Launch as a scheduled task (survives session
# teardown); re-run after a reboot and finished parts are skipped.
#
# Same lessons as yuzidi1: pre-built bundle, 1500-frame chunks written to .tmp and renamed, 3 tries
# stepping concurrency 2/1/1, --gl=angle, --timeout=180000, capped OffthreadVideo cache, muted
# chunks, concat with -auto_convert 0, duration probe, freezedetect.
#
# Audio differs: the film opens with a 15s hook montage that carries the clips' REAL sound. The
# track is built here from the same ranges hook.ts lists (cut from ../sources, which still have
# audio), followed by the VO starting at exactly 15.0s.

$ErrorActionPreference = 'Continue'

$proj   = 'D:\flick\swimming\output\phelps1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts1080'
$srcs   = Join-Path $proj 'sources'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

# Stale Remotion temp dirs filled C: to 6.8GB on yuzidi1 and killed a chunk at the stitch step.
$cut = (Get-Date).AddMinutes(-5)
Get-ChildItem $env:TEMP -Directory -ErrorAction SilentlyContinue |
  Where-Object { ($_.Name -like 'remotion-*' -or $_.Name -like 'react-motion-render*') -and $_.LastWriteTime -lt $cut } |
  ForEach-Object { try { Remove-Item $_.FullName -Recurse -Force -ErrorAction Stop } catch {} }

$tl = Get-Content (Join-Path $rem 'src\timeline.ts') -Raw
$filmSeconds = [double]([regex]::Match($tl, 'FILM_SECONDS = ([\d.]+)').Groups[1].Value)
$hook = Get-Content (Join-Path $rem 'src\hook.ts') -Raw
$hookSeconds = [double]([regex]::Match($hook, 'HOOK_SECONDS = ([\d.]+)').Groups[1].Value)
$total = [int][Math]::Round($filmSeconds * 30) + [int]($hookSeconds * 30)
Write-Output "TOTAL $total frames (hook $hookSeconds s + VO $filmSeconds s)  $(Get-Date -Format HH:mm:ss)"

Write-Output "BUNDLE start $(Get-Date -Format HH:mm:ss)"
npx remotion bundle src/index.tsx --out-dir="$bundle"
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED bundle (exit $LASTEXITCODE)"; exit 1 }
Write-Output "BUNDLE done $(Get-Date -Format HH:mm:ss)"

$chunk = 1500
$idx = 0
$list = @()
for ($s = 0; $s -lt $total; $s += $chunk) {
    $idx++
    $e = [Math]::Min($s + $chunk - 1, $total - 1)
    $name = 'part{0:d2}.mp4' -f $idx
    $out = Join-Path $parts $name
    $list += $out
    if (Test-Path $out) { Write-Output "SKIP  $name (already rendered)"; continue }
    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    $ok = $false
    foreach ($conc in @(1, 1, 1)) {
        Write-Output "START $name frames $s-$e concurrency $conc  $(Get-Date -Format HH:mm:ss)"
        npx remotion render "$bundle" final-film "$tmp" --codec=h264 --crf=18 --muted --gl=angle `
            --frames="$s-$e" --concurrency=$conc --timeout=180000 `
            --offthreadvideo-cache-size-in-bytes=134217728
        if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
        Write-Output "RETRY $name (exit $LASTEXITCODE)"
        if (Test-Path $tmp) { Remove-Item $tmp -Force }
    }
    if (-not $ok) { Write-Output "FAILED $name after 3 tries"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "All chunks rendered. Joining..."
$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile
$videoOnly = Join-Path $proj 'video-only.mp4'
& $ff -y -f concat -safe 0 -auto_convert 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

# --- audio: hook cuts' real sound, then the VO -------------------------------------------------
$cuts = [regex]::Matches($hook, "file: '([^']+)', from: ([\d.]+), frames: (\d+)")
$inputs = @()
$filters = @()
$labels = ''
$i = 0
foreach ($m in $cuts) {
    $inputs += @('-i', (Join-Path $srcs $m.Groups[1].Value))
    $from = [double]$m.Groups[2].Value
    $dur = [double]$m.Groups[3].Value / 30
    $filters += "[${i}:a]atrim=start=${from}:duration=${dur},asetpts=PTS-STARTPTS,aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[h$i]"
    $labels += "[h$i]"
    $i++
}
$vo = Join-Path $rem 'public\vo\phelps.wav'
$inputs += @('-i', $vo)
$fadeAt = $hookSeconds - 0.25
$filters += "${labels}concat=n=${i}:v=0:a=1,apad,atrim=duration=${hookSeconds},afade=t=out:st=${fadeAt}:d=0.25[hook]"
$filters += "[${i}:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[vo]"
$filters += "[hook][vo]concat=n=2:v=0:a=1[aout]"
$audio = Join-Path $proj 'audio-full.m4a'
& $ff -y @inputs -filter_complex ($filters -join ';') -map '[aout]' -c:a aac -b:a 192k $audio
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED audio build'; exit 1 }

$final = Join-Path $proj 'phelps1-final.mp4'
& $ff -y -i $videoOnly -i $audio -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy -shortest $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

$probe = & $ff -i $final -hide_banner 2>&1 | Select-String 'Duration'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK (any line below is a frozen stretch to re-render):'
& $ff -hide_banner -i $final -vf "freezedetect=n=-60dB:d=2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'
Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
