# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under sources\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\sc27'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$L = 'OFbxcD5DuqE.mp4'  # World Aquatics: Liendo 100 fly WR 47.68, Swimming World Cup 2025 (25m)
$K = 'SF1PBwFQAI8.mp4'  # World Aquatics: Kos 100 back WR 48.16, Swimming World Cup 2025 (25m)
$D = 'i4sO7vHOT38.mp4'  # World Aquatics: Douglass 100 free WR 50.19, Swimming World Cup 2025 (25m)
$rows = @(
  # The final lining up, lane names on the water, into the start.
  @('liendo-start', $L, 0.3, 2.4, 800, 0, 608, 1080),
  # Kos touching first with the WR flag on the finish graphic.
  @('kos-wr', $K, 52.0, 2.0, 850, 0, 608, 1080),
  # Liendo celebrating, arms out, in the water.
  # Cropped above the name lower-third (y 825+), which a 9:16 window would only half show.
  @('liendo-cheer', $L, 57.0, 2.5, 770, 0, 461, 820),
  # Douglass smiling after her swim (56.4s is past the finish-graphic cut).
  @('douglass-smile', $D, 56.4, 2.4, 740, 0, 608, 1080),
  # Freestyle racing, close.
  @('douglass-race', $D, 30.0, 2.2, 650, 0, 608, 1080),
  # Backstroke racing, close.
  @('kos-race', $K, 34.0, 1.8, 650, 0, 608, 1080),
  # Kos in the water after the record.
  @('kos-cheer', $K, 57.5, 2.5, 815, 0, 461, 820),
  # Liendo's finish graphic ("1 LIENDO").
  @('liendo-finish', $L, 48.2, 1.8, 900, 0, 608, 1080),
  # Douglass's finish graphic with the WR flag.
  @('douglass-wr', $D, 52.3, 1.6, 820, 0, 608, 1080),
  # Beijing's National Aquatics Centre (the Water Cube) lit up at night (One Flight Out,
  # bWiFHfYHusg). Shown as Beijing only - nothing on screen claims it is the 2026 venue.
  @('beijing-cube', 'bWiFHfYHusg.mp4', 14.0, 2.5, 700, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\sources\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
