# 4K render driver for the Reddick Southern 500 film.
#
# Run detached from Claude Code / VS Code — a full-film 4K pass takes hours on this machine and a
# single `remotion render` tied to a parent shell loses everything when that shell dies (it did,
# at frame 3022 of 9930).
#
# Two things make this survivable:
#   1. The film renders in 1500-frame chunks into parts4k/. A finished chunk is never redone, so
#      re-running this script resumes instead of restarting.
#   2. Chunks render MUTED and the single 331.00s voiceover is muxed onto the concatenated video
#      at the end. Audio therefore never crosses a chunk seam, so there is no drift to correct.

$ErrorActionPreference = 'Stop'

$proj  = 'D:\flick\output\reddick1'
$rem   = Join-Path $proj 'remotion'
$parts = Join-Path $proj 'parts4k'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 9930
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

    # Render to a .tmp name and rename on success, so a chunk killed mid-write is never mistaken
    # for a finished one on the next run.
    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    Write-Output "START $name  frames $s-$e  $(Get-Date -Format HH:mm:ss)"
    npx remotion render src/index.tsx final-film $tmp --scale=2 --codec=h264 --crf=18 --muted --frames="$s-$e"
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $name (exit $LASTEXITCODE)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "All chunks rendered. Joining..."

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only-4k.mp4'
$final     = Join-Path $proj 'final-film-4k.mp4'
$vo        = Join-Path $rem 'public\vo\tts-audio.wav'

& $ff -y -f concat -safe 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

& $ff -y -i $videoOnly -i $vo -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
