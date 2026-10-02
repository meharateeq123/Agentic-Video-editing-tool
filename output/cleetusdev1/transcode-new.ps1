# The four new NASCAR broadcast clips arrive from YouTube as AV1. The GTX 1650 has no AV1
# decoder, so every frame would be decoded in software — a contact sheet alone took over ten
# minutes, and a render sitting on those clips would crawl. Transcode once to H.264 so the bed
# pool is uniform and fast to seek.
#
# The crop is the other half of the job. Unlike the in-car feeds already in the pool, these are
# full broadcast packages: a running-order leaderboard down the left with a sponsor box above it,
# and driver lower-thirds and caution banners along the bottom. All of it sits in fixed safe
# areas, so one crop clears every clip — take the 1460x821 window at (460,60), which is 16:9 and
# entirely inside the graphics, then scale it back to 1920x1080.

$ErrorActionPreference = 'Stop'
$proj = 'D:\flick\output\cleetusdev1'
Set-Location $proj

$ff = & node -e "process.stdout.write(require('$($proj -replace '\\','/')/remotion/node_modules/ffmpeg-static'))"

$jobs = @(
    @('talladega-broadcast', 'talladega-broadcast'),
    @('rockingham-oreilly', 'rockingham-oreilly'),
    @('rockingham-reaction', 'rockingham-reaction'),
    @('daytona-truck', 'daytona-truck')
)

foreach ($j in $jobs) {
    $src = "dl\$($j[0]).mp4"
    $out = "remotion\public\bed-pool\$($j[1]).mp4"
    if (Test-Path $out) { Write-Output "SKIP  $($j[1])"; continue }
    $tmp = "$out.tmp.mp4"
    Write-Output "START $($j[1])  $(Get-Date -Format HH:mm:ss)"
    # h264_nvenc is listed by this ffmpeg build but fails to initialise on this box ("Error while
    # filtering: Function not implemented"), so the encode runs on the CPU. The AV1 decode is
    # software anyway — the GTX 1650 has no AV1 decoder — so NVENC bought little here.
    & $ff -y -v error -stats -i $src -an -vf "crop=1460:821:460:60,scale=1920:1080:flags=lanczos" -c:v libx264 -preset veryfast -crf 20 $tmp
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $($j[1])"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $($j[1])  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "ALL DONE $(Get-Date -Format HH:mm:ss)"
