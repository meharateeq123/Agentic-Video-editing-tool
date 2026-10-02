# Chunked, GPU-accelerated render driver for the Cleetus / NASCAR 26 film.
#
# Same shape as the reddick1 driver, for the same reasons: run detached so the render outlives
# the session that started it, render in chunks so an interruption costs one chunk rather than
# the whole film, and render muted with the single voiceover muxed on at the end so audio never
# crosses a chunk seam.
#
# --gl=angle puts frame compositing on the GTX 1650. Do NOT add --hardware-acceleration: that
# flag is for FFmpeg's encoder, conflicts with --crf, and silently killed an earlier render.
#
# --concurrency=3 is deliberate. This box has 6 cores but only 8 GB of RAM, and each Remotion
# worker is a Chrome tab; letting Remotion pick its own concurrency fills memory and makes the
# machine unusable while the render runs. Three workers keep the desktop responsive.

$ErrorActionPreference = 'Stop'

$proj  = 'D:\flick\output\cleetusdev1'
$rem   = Join-Path $proj 'remotion'
$parts = Join-Path $proj 'parts'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 10237
$chunk = 1500
$idx = 0
$list = @()

for ($s = 0; $s -lt $total; $s += $chunk) {
    $idx++
    $e = [Math]::Min($s + $chunk - 1, $total - 1)
    $name = 'part{0:d2}.mp4' -f $idx
    $out = Join-Path $parts $name
    $list += $out

    if (Test-Path $out) { Write-Output "SKIP  $name"; continue }

    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    Write-Output "START $name  frames $s-$e  $(Get-Date -Format HH:mm:ss)"
    npx remotion render src/index.tsx final-film $tmp --codec=h264 --crf=18 --muted --frames="$s-$e" --gl=angle --concurrency=2
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $name (exit $LASTEXITCODE)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output 'All chunks rendered. Joining...'

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"
$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only.mp4'
$final     = Join-Path $proj 'final-film-1080p.mp4'
$vo        = Join-Path $rem 'public\vo\tts-audio.wav'

& $ff -y -f concat -safe 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

& $ff -y -i $videoOnly -i $vo -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
