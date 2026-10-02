# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\bell3'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Gateway 2026, NBC extended highlights (ZMwqXq8N8fY, section 18:10-18:59 - the commentary
  # names Bell in this wreck). The leaderboard (x < 300) stays out of frame.
  @('gw-wreck', 'gateway-bell.mp4', 24.8, 1.8, 1000, 0, 608, 1080),
  @('gw-after', 'gateway-bell.mp4', 30.0, 2.2, 800, 0, 608, 1080),
  @('gw-overhead', 'gateway-bell.mp4', 41.8, 2.2, 760, 0, 608, 1080),
  # 2025 Bass Pro Shops Night Race, NASCAR extended highlights (rlGeh4sBXfs, section from 18:20).
  # The frontstretch under the lights.
  @('night-front', 'night25-finish.mp4', 66.0, 2.5, 700, 0, 608, 1080),
  # Bell's No. 20 DeWalt Toyota on the cool-down lap, then the burnout.
  @('win-lap', 'night25-finish.mp4', 76.2, 1.8, 800, 0, 608, 1080),
  @('win-burnout', 'night25-finish.mp4', 126.5, 1.8, 650, 0, 608, 1080),
  # The No. 20 racing for the win on the last lap (two separate stretches).
  @('night-battle', 'night25-finish.mp4', 57.0, 1.8, 760, 0, 608, 1080),
  @('night-battle-b', 'night25-finish.mp4', 61.0, 2.2, 520, 0, 608, 1080),
  # Bell climbing out ("BELL" on the roof rail), then arms up under the lights.
  @('bell-climb', 'night25-finish.mp4', 137.5, 2.0, 560, 0, 608, 1080),
  @('bell-arms', 'night25-finish.mp4', 143.0, 3.0, 660, 0, 608, 1080),
  # Bell's USA Network interview after the win (NASCAR, YxFybTYTFyk).
  @('bell-interview', 'YxFybTYTFyk.mp4', 18.0, 2.6, 670, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
