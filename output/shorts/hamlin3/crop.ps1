# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\hamlin3'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Larson in the Gateway media centre after the win (Peter Stratta, wRcnINPCGWk). Face ~53% across;
  # the channel bug (top right) and name (bottom right) stay outside the crop.
  @('larson-gateway-presser', 'wRcnINPCGWk.mp4', 29.0, 8.0, 714, 0, 608, 1080),
  # Hamlin in the Gateway media centre (Peter Stratta, NWoDoL1kng4), two separate stretches.
  @('hamlin-gateway-presser-a', 'NWoDoL1kng4.mp4', 34.0, 7.0, 752, 0, 608, 1080),
  @('hamlin-gateway-presser-b', 'NWoDoL1kng4.mp4', 98.0, 7.0, 752, 0, 608, 1080),
  # Bristol Motor Speedway this week (WJHL, -z0KZwwiwX8). Crop stops at y=830 so the station's
  # lower-third (y 850-975) never shows.
  @('bristol-stands', '-z0KZwwiwX8.mp4', 10.0, 6.0, 900, 0, 467, 830),
  # 102.3-105.8s: the Food City tower and main grandstand, nothing else (113s cut to a fan interview).
  @('bristol-building', '-z0KZwwiwX8.mp4', 102.3, 3.5, 631, 0, 467, 830),
  # Hamlin's 2023 Bristol Night Race win (NASCAR, LfOgrWhZFYk, 720p): at the fence with the flag,
  # then the NBC interview.
  # 19.3-22.8s: Hamlin centred with the checkered flag (16.5-19s drifted off the right edge).
  @('hamlin-bristol-flag', 'LfOgrWhZFYk.mp4', 19.3, 3.5, 374, 0, 405, 720),
  @('hamlin-bristol-interview', 'LfOgrWhZFYk.mp4', 33.0, 10.0, 502, 0, 405, 720),
  # Gateway victory lane (KSDK, d-np3aBM8tE): Larson standing on the No. 5 as the confetti drops.
  # The SP+ bug (bottom right) stays outside the crop.
  @('larson-victory-lane', 'd-np3aBM8tE.mp4', 29.0, 9.0, 598, 0, 608, 1080),
  # Same KSDK package: Larson's interview beside the trophy, no lower-third in this stretch.
  @('larson-trophy-interview', 'd-np3aBM8tE.mp4', 91.0, 6.0, 578, 0, 608, 1080),
  # NASCAR Film Room (1zM9bTLsSy8): Larson full screen at the Hendrick shop, no insets.
  @('larson-filmroom', '1zM9bTLsSy8.mp4', 350.0, 7.0, 656, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
