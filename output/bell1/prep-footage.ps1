# Turns the raw downloads into a uniform bed pool: one crop per source to strip that broadcaster's
# on-screen furniture, then H.264 1920x1080 so every clip in the film decodes and seeks the same way.
#
# The crops are per-source because each package puts its graphics somewhere different:
#   - USA/FOX race packages (final-laps, southern500-highlights) carry a full running-order
#     leaderboard down the left, a "LAPS TO GO" header across the top and a network logo top-right.
#     Verified crop: the 1470x827 window at (450,130) clears all three.
#   - NASCAR's own highlight package puts a small session box top-left only, so it needs far less.
#   - The interview packages carry a results ticker along the bottom plus a logo on the right.
#   - michigan-wreck and gateway came down clean; they only get trimmed enough to match the others.
#
# Transient lower-thirds (driver name / speed callouts) can't be cropped away since they cross the
# middle of frame. Those are avoided by picking ranges around them in footage.ts instead.
$ErrorActionPreference = 'Stop'
$proj = 'D:\flick\output\bell1'
Set-Location $proj
$ff = 'D:\flick\output\cleetusdev1\remotion\node_modules\ffmpeg-static\ffmpeg.exe'
$pool = "$proj\remotion\public\bed-pool"
New-Item -ItemType Directory -Force $pool | Out-Null

$jobs = @(
    @{src = 'final-laps'; crop = 'crop=1470:827:450:130'},
    @{src = 'southern500-highlights'; crop = 'crop=1470:827:450:130'},
    @{src = 'darlington-highlights-nascar'; crop = 'crop=1710:962:150:118'},
    @{src = 'postrace-interviews'; crop = 'crop=1660:934:120:60'},
    @{src = 'michigan-wreck'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'},
    @{src = 'bell-recalls-michigan'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'},
    @{src = 'gateway'; crop = 'crop=iw*0.953:ih*0.953:iw*0.023:ih*0.024'}
)

foreach ($j in $jobs) {
    $out = "$pool\$($j.src).mp4"
    if (Test-Path $out) { Write-Output "SKIP  $($j.src)"; continue }
    $tmp = "$out.tmp.mp4"
    Write-Output "START $($j.src)  $(Get-Date -Format HH:mm:ss)"
    & $ff -y -v error -stats -i "dl\$($j.src).mp4" -an `
        -vf "$($j.crop),scale=1920:1080:flags=lanczos" `
        -c:v libx264 -preset veryfast -crf 20 $tmp
    if ($LASTEXITCODE -ne 0) { Write-Output "FAILED $($j.src)"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $($j.src)  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "ALL DONE $(Get-Date -Format HH:mm:ss)"
Get-ChildItem $pool -File | ForEach-Object { '{0,-36} {1} MB' -f $_.Name, [math]::Round($_.Length / 1MB, 1) }
