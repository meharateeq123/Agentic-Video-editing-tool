# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\walsh2'
$ff = "D:\flick\output\shorts\melissa1\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Social Kick / Swim Culture & Stories, "HISTORY! Gretchen Walsh SMASHES 100m Butterfly World
  # Record!" (koUeGqq7mro, 2026-05-02), 1920x1080. Fort Lauderdale Aquatic Center, TYR Pro Swim
  # Series - the actual dive, mid-race butterfly action, and the sunset crowd.
  @('s1-dive', 'history-socialkick.mp4', 13.3, 2.5, 396, 0, 608, 1080),
  @('s2-fly', 'history-socialkick.mp4', 22.0, 2.5, 346, 0, 608, 1080),
  @('s4-crowd1', 'history-socialkick.mp4', 85.0, 3.8, 396, 0, 608, 1080),
  @('s5-crowd2', 'history-socialkick.mp4', 88.3, 2.6, 1096, 0, 608, 1080),
  # SwimSwam, "Gretchen Walsh WORLD RECORD 100 Fly - 54.33" (Yd_FNXA_nhk, 2026-05-04),
  # 1280x720. Same meet, different broadcast angle - the pack mid-race and the real results
  # board: "E029/H2 F 100 Fly ... 5 Walsh, G NYAC 29.24 54.33 1".
  @('s3-pack', 'race-swimswam.mp4', 30.0, 2.6, 448, 0, 405, 720),
  # The camera pans across the 72-76s stretch, so the board drifts out of a static crop there.
  # 76.8-79.2s is the one stable hold on it - the crop is centred on "Walsh, G NYAC 29.24 54.33".
  @('s2-board', 'race-swimswam.mp4', 76.8, 2.4, 590, 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\sources\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
