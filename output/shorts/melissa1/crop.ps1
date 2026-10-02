# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\melissa1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # World Athletics official, "Melissa Jefferson-Wooden comes from behind to win in 10.62" (Ly0Gyu6ZSLs,
  # 2026-09-12), 1920x1080 source. Women's 100m Final, World Athletics Ultimate Championship, Budapest.
  @('s1-blocks', 'sprint100m.mp4', 0.2, 3.5, 656, 0, 608, 1080),
  @('s2-100mid', 'sprint100m.mp4', 6.3, 3.2, 646, 0, 608, 1080),
  @('s2-100finish', 'sprint100m.mp4', 13.0, 3.8, 696, 0, 608, 1080),
  # World Athletics official, "Melissa Jefferson-Wooden STORMS to 21.49 over 200m" (s4LUGlKrLf4,
  # 2026-09-13), 1920x1080 source. Women's 200m Final. Only the 0-15s race window is real race
  # footage - after ~15s the source cuts to a black title-card outro, so both clips stay inside it.
  @('s2-200mid', 'sprint200m.mp4', 3.0, 3.4, 396, 0, 608, 1080),
  @('s2-200finish', 'sprint200m.mp4', 9.5, 3.4, 646, 0, 608, 1080),
  # APT Sports, "Jefferson-Wooden and Bednarek Strike 200m Gold to Complete Sprint Double in Budapest"
  # (ysp2MnpTF8w, 2026-09-14), 1280x720 source. Only the 0-90s window (real Budapest 200m final +
  # celebration) is used - the rest of that video is an unrelated highlight-reel montage.
  @('s3-celeb1', 'budapest-double.mp4', 77.3, 2.4, 448, 0, 405, 720),
  @('s4-celeb2', 'budapest-double.mp4', 80.8, 2.6, 500, 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
