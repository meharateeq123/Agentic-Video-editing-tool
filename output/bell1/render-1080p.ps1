# 1080p render driver for the Christopher Bell / Darlington film.
#
# Renders from a PRE-BUILT bundle (D:\flick\output\bell1\bundle), not from src/index.tsx. That
# matters: rendering from source makes Remotion re-bundle and copy the 2.6GB public dir into a fresh
# temp folder on every single invocation, and every silent death this project hit - four of them -
# happened during that copy, leaving 55 orphaned temp bundles behind and no error in any log.
# Rebuild the bundle only after changing src:
#   npx remotion bundle src/index.tsx --out-dir=D:\flick\output\bell1\bundle
#
# Resumable: 1500-frame chunks into parts/, each written to .tmp.mp4 and renamed on success, so a
# killed chunk is never mistaken for a finished one and re-running resumes.
# Chunks render MUTED; the VO is muxed onto the concatenated video at the end, so audio never
# crosses a chunk seam.
#
# --gl=angle puts Chrome's frame compositing on the GTX 1650. Do NOT add --hardware-acceleration -
# it conflicts with --crf. --concurrency=2, not 3: this box has 8GB RAM.
# --timeout=180000 because OffthreadVideo's first seek into these 0.5-1.2GB beds runs well past the
# 28s default and failed the render at frame 0.
#
# Nothing heavy may run alongside this. An ffmpeg transcode running next to the render died 53
# seconds after the render started.
$ErrorActionPreference = 'Stop'

$proj   = 'D:\flick\output\bell1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 9788
$chunk = 1500
$idx = 0
$list = @()

for ($s = 0; $s -lt $total; $s += $chunk) {
    $idx++
    $e = [Math]::Min($s + $chunk - 1, $total - 1)
    $name = 'part{0:d2}.mp4' -f $idx
    $out = Join-Path $parts $name
    $list += $out

    if (Test-Path $out) {
        Write-Output "SKIP  $name (already rendered)"
        continue
    }

    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    Write-Output "START $name  frames $s-$e  $(Get-Date -Format HH:mm:ss)"
    npx remotion render $bundle final-film $tmp --codec=h264 --crf=18 --muted --frames="$s-$e" --gl=angle --concurrency=2 --timeout=180000
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $name (exit $LASTEXITCODE)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

$missing = $list | Where-Object { -not (Test-Path $_) }
if ($missing) {
    Write-Output "Stopping before join - not all parts are rendered yet:"
    $missing | ForEach-Object { Write-Output "  missing: $_" }
    exit 0
}

Write-Output "All chunks rendered. Joining..."

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only.mp4'
$final     = Join-Path $proj 'bell1.mp4'
$vo        = Join-Path $rem 'public\vo\tts-audio.wav'

& $ff -y -f concat -safe 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

& $ff -y -i $videoOnly -i $vo -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
