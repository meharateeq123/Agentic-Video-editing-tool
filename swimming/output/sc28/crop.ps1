# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under sources\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\sc28'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$W = 'UA7BjGI4xV0.mp4'   # World Aquatics: Walsh 100 fly championship record, Singapore 2025 (1080p)
$M0 = 'marchand-0.mp4'   # USA Swimming: Marchand 200 breast, 2026 Pro Swim Westmont (uJCImUmVRus 0-14s, 720p)
$M = 'marchand-128.mp4'  # same race, 128-175s: finish and celebration
$T = 'matsu-270.mp4'     # USA Swimming: Matsushita 400 IM win, 2026 Pan Pacs (ND_sPfabFic 270-365s, 720p)
$rows = @(
  # --- scene 1: fast racing
  @('m-dive', $M0, 5.6, 1.4, 700, 0, 405, 720),
  # Lower part of the frame only, so the sponsor board along the top stays out.
  @('w-race', $W, 11.0, 1.3, 960, 227, 480, 853),
  @('m-race', $M, 3.0, 1.3, 440, 0, 405, 720),
  @('t-race', $T, 84.4, 1.3, 420, 0, 405, 720),
  # Walsh's name on the water with the "1" (Walsh / Vanotterdijk / Perkins).
  @('w-board', $W, 30.3, 1.8, 800, 0, 608, 1080),
  # --- scene 2: the three names
  # Walsh at the wall, "WALSH" and the US flag on her cap.
  @('w-cheer', $W, 33.0, 1.6, 820, 0, 608, 1080),
  # Marchand ("MARCHAND" on his cap), cropped above the winner lower-third.
  @('m-cap', $M, 30.5, 2.1, 300, 0, 304, 540),
  # Matsushita at the wall right after his "Tomoyuki MATSUSHITA / WINNER" lower-third.
  @('t-face', $T, 42.3, 2.2, 400, 0, 405, 720),
  # --- scene 3: "changing fast"
  @('t-race2', $T, 87.0, 1.2, 380, 0, 405, 720),
  @('m-over', $M0, 10.3, 1.2, 560, 0, 405, 720),
  # --- scene 4 tail
  @('w-splash', $W, 35.6, 1.6, 820, 0, 608, 1080),
  @('t-crowd', $T, 45.0, 1.8, 300, 0, 405, 720),
  # SoFi Stadium, the LA28 swimming venue (7NEWS, g6zkjbQCmqs, 720p). Cropped above the 7NEWS
  # lower-third (y 598+ at 720p).
  # The empty bowl with the "SoFi Stadium" sign on the roof ring.
  @('sofi-bowl', 'g6zkjbQCmqs.mp4', 64.0, 2.5, 780, 0, 332, 590),
  # Swimmers sitting in the stands above the floor.
  @('sofi-sign', 'g6zkjbQCmqs.mp4', 75.3, 2.2, 500, 0, 332, 590),
  # Young Australian swimmers on the tour.
  @('young-swimmers', 'g6zkjbQCmqs.mp4', 79.0, 1.8, 470, 0, 332, 590)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\sources\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
