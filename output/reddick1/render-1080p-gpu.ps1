# 1080p GPU render driver for the Reddick Southern 500 film — native composition resolution
# (no --scale/--height needed), GPU-accelerated (ANGLE on the GTX 1650), for the fastest turnaround.
#
# Runs detached from Claude Code / VS Code so it survives the session/terminal closing.
# Chunked into parts1080/ (1500 frames each) so a killed run resumes instead of restarting: each
# chunk writes to a .tmp name and is renamed only on success. Chunks render --muted; the single
# 331.00s VO wav is muxed on at the end so audio never crosses a chunk seam.

$ErrorActionPreference = 'Stop'

$proj  = 'D:\flick\output\reddick1'
$rem   = Join-Path $proj 'remotion'
$parts = Join-Path $proj 'parts1080'
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

    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    Write-Output "START $name  frames $s-$e  $(Get-Date -Format HH:mm:ss)"
    npx remotion render src/index.tsx final-film $tmp --codec=h264 --crf=18 --muted --frames="$s-$e" --gl=angle
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $name (exit $LASTEXITCODE)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "All chunks rendered. Joining..."

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only-1080p.mp4'
$final     = Join-Path $proj 'final-film-1080p.mp4'
$vo        = Join-Path $rem 'public\vo\tts-audio.wav'

& $ff -y -f concat -safe 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

& $ff -y -i $videoOnly -i $vo -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
