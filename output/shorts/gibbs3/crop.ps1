# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\gibbs3'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Gateway 2026, NBC extended highlights (ZMwqXq8N8fY, section from 19:00). Gibbs's No. 54
  # onboard just after the backstretch incident the commentators pin on him (19:40).
  @('gw-onboard', 'gateway-nbc.mp4', 40.7, 2.2, 900, 0, 608, 1080),
  # The backstretch incident itself, wide (19:35).
  @('gw-incident', 'gateway-nbc.mp4', 36.0, 1.4, 1050, 0, 608, 1080),
  # The big multi-car wreck (20:06): the No. 54 spins with the No. 16 - the "late chaos".
  @('gw-wreck', 'gateway-nbc.mp4', 65.6, 2.3, 1050, 0, 608, 1080),
  # Bristol Motor Speedway this week (WJHL, ILrjTEsY-bg). The haulers on the infield, no lower-third.
  @('bms-track', 'ILrjTEsY-bg.mp4', 12.5, 2.4, 700, 0, 608, 1080),
  # The grandstands and scoreboard, cropped above the station lower-third (y 850+).
  @('bms-stands', 'ILrjTEsY-bg.mp4', 44.0, 2.4, 1300, 0, 467, 830),
  # 2026 Food City 500 win, FOX final laps (qFPW6VyI3hI): the No. 54 after the flag. The FOX
  # results ticker (y 1030+) stays out of frame.
  @('win-car', 'qFPW6VyI3hI.mp4', 388.5, 1.8, 400, 0, 580, 1030),
  # The burnout at the start-finish line.
  @('win-burnout', 'qFPW6VyI3hI.mp4', 431.0, 1.8, 420, 0, 580, 1030),
  # 2025 Bass Pro Shops Night Race, NBC extended highlights (bwb0H_19a_E, section from 7:35):
  # the No. 54 leading on its own ("54 - GIBBS" bug stays outside the crop).
  @('night-lead', 'night25-455.mp4', 5.0, 2.5, 800, 0, 608, 1080),
  # Same race (section from 4:45): the No. 54 in close-up alongside the No. 12.
  @('night-close', 'night25-285.mp4', 25.0, 1.8, 1050, 0, 608, 1080),
  # 2026 Bristol victory lane, NASCAR (gHYC3aQ7DZE): Gibbs at the door of the No. 54.
  @('gibbs-car', 'gHYC3aQ7DZE.mp4', 144.0, 2.0, 600, 0, 608, 1080),
  # Gibbs on the roof of the car (FOX, qFPW6VyI3hI).
  @('gibbs-roof', 'qFPW6VyI3hI.mp4', 456.5, 2.0, 640, 0, 580, 1030),
  # Gibbs's FOX interview, after the "TY GIBBS / FIRST CAREER WIN" lower-third has gone.
  @('gibbs-smile', 'gHYC3aQ7DZE.mp4', 213.5, 2.5, 450, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
