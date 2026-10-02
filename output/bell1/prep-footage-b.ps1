# Second worker, run alongside prep-footage.ps1. It takes the tail of the same queue (the four
# smaller sources) while worker A grinds through the two 25-minute race packages. Both write via a
# .tmp.mp4 and only rename on success, and worker A skips anything already present in the pool, so
# the two never collide on a file.
$ErrorActionPreference = 'Stop'
$proj = 'D:\flick\output\bell1'
Set-Location $proj
$ff = 'D:\flick\output\cleetusdev1\remotion\node_modules\ffmpeg-static\ffmpeg.exe'
$pool = "$proj\remotion\public\bed-pool"

# gateway came down at 1280x720 rather than 1080p, so the "clean" trim is written as fractions of
# the input rather than fixed pixels — a fixed 1830x1029 window is larger than that frame and ffmpeg
# refuses it outright.
$jobs = @(
    @{src = 'gateway'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'},
    @{src = 'michigan-wreck'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'},
    @{src = 'bell-recalls-michigan'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'},
    @{src = 'postrace-interviews'; crop = 'crop=1660:934:120:60'}
)

foreach ($j in $jobs) {
    $out = "$pool\$($j.src).mp4"
    $tmp = "$out.tmp.mp4"
    if (Test-Path $out) { Write-Output "SKIP  $($j.src)"; continue }
    if (Test-Path $tmp) { Write-Output "BUSY  $($j.src)"; continue }
    Write-Output "START $($j.src)  $(Get-Date -Format HH:mm:ss)"
    & $ff -y -v error -stats -i "dl\$($j.src).mp4" -an `
        -vf "$($j.crop),scale=1920:1080:flags=lanczos" `
        -c:v libx264 -preset veryfast -crf 20 $tmp
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $($j.src)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $($j.src)  $(Get-Date -Format HH:mm:ss)"
}
Write-Output "WORKER B DONE $(Get-Date -Format HH:mm:ss)"
