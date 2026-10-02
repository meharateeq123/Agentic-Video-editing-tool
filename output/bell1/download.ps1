# Footage for the Christopher Bell / Darlington film. Every source is an official broadcaster or
# series channel — NASCAR, NASCAR on FOX, Motorsports on NBC. Nothing from a fan re-upload, and
# (per the standing rule) no game capture of any kind: this story is entirely real racing.
$ErrorActionPreference = 'Stop'
$dl = 'D:\flick\output\bell1\dl'
New-Item -ItemType Directory -Force $dl | Out-Null

$items = @(
    # The race itself: FOX's own highlight package and the final-laps cut of the winning move.
    @{id = 'Qsqf5pcZa6o'; name = 'southern500-highlights'; sections = $null},
    @{id = 'qR0mxf0YVIo'; name = 'final-laps'; sections = $null},
    # NASCAR's own highlight package — a second set of camera cuts so the race scenes are not all
    # from one broadcast edit.
    @{id = '_oz2J1uO3Is'; name = 'darlington-highlights-nascar'; sections = $null},
    # Post-race: Bell's quotes, Ty Gibbs, Hamlin.
    @{id = 'LU3gGalKMoU'; name = 'postrace-interviews'; sections = $null},
    # The Michigan crash that broke his wrist, and him describing it afterwards.
    @{id = 'clcM2L0yI4s'; name = 'michigan-wreck'; sections = $null},
    @{id = 'y1m2Ei3ro-c'; name = 'bell-recalls-michigan'; sections = $null},
    # Gateway, where the Chase goes next — only a slice is needed out of a three-hour replay.
    @{id = 'IqRKxvua7q8'; name = 'gateway'; sections = '*00:20:00-00:24:00'}
)

foreach ($i in $items) {
    $out = "$dl\$($i.name).mp4"
    if (Test-Path $out) { Write-Output "SKIP  $($i.name)"; continue }
    Write-Output "START $($i.name)  $(Get-Date -Format HH:mm:ss)"
    $args = @(
        "https://www.youtube.com/watch?v=$($i.id)",
        '-f', 'bv*[height<=1080][ext=mp4]/bv*[height<=1080]',
        '-o', "$dl\$($i.name).%(ext)s",
        '--no-warnings', '--no-playlist', '--quiet', '--progress', '--newline'
    )
    if ($i.sections) { $args += @('--download-sections', $i.sections, '--force-keyframes-at-cuts') }
    python -m yt_dlp @args
    Write-Output "DONE  $($i.name)  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "ALL DONE $(Get-Date -Format HH:mm:ss)"
Get-ChildItem $dl -File | ForEach-Object { '{0,-34} {1} MB' -f $_.Name, [math]::Round($_.Length / 1MB, 1) }
