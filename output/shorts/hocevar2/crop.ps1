# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (path), start s, length s, crop x, crop y, crop w, crop h.
# rp-* files are sections of NASCAR's official Gateway full race replay (TkeSuY3t6iY, 720p):
# rp-battle 3:48:10, rp-chaos 3:49:50, rp-finish 3:54:40 - none used by blaney2 / elliott3.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\hocevar2'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$D = "$proj\dl"
$FS = "$D\nVoIowRAZog.mp4"  # Frontstretch, Hocevar after the Gateway race (720p)
$rows = @(
  # The No. 77 Spectrum Chevrolet side by side with the No. 3 and No. 6.
  @('b-77', "$D\rp-battle.mp4", 8.4, 2.4, 740, 0, 326, 580),
  # A restart pack four wide.
  @('b-pack', "$D\rp-battle.mp4", 13.0, 2.4, 430, 0, 405, 720),
  @('b-pack2', "$D\rp-battle.mp4", 46.0, 2.4, 330, 0, 405, 720),
  # Smoke in the pack as the late wreck starts.
  @('c-wreck', "$D\rp-chaos.mp4", 10.0, 2.4, 430, 0, 405, 720),
  # The No. 77 alongside the No. 97 through the wreck, from another car's camera.
  @('c-77a', "$D\rp-chaos.mp4", 26.0, 1.8, 0, 0, 405, 720),
  # The No. 77 driving past the spinning No. 97.
  @('c-77b', "$D\rp-chaos.mp4", 41.8, 1.2, 60, 0, 405, 720),
  # The No. 97 spinning in the smoke.
  @('c-97', "$D\rp-chaos.mp4", 44.0, 2.2, 450, 0, 405, 720),
  # The field on the last lap.
  @('f-pack', "$D\rp-finish.mp4", 18.0, 2.2, 500, 0, 405, 720),
  # Hocevar after the race, clear of the Frontstretch watermark and donate banner.
  @('fs-a', $FS, 16.0, 2.6, 326, 62, 370, 658),
  @('fs-b', $FS, 38.0, 2.6, 326, 62, 370, 658),
  @('fs-c', $FS, 44.0, 2.6, 326, 62, 370, 658),
  @('fs-d', $FS, 24.0, 2.6, 326, 62, 370, 658),
  # Bristol Motor Speedway this week (WJHL, ILrjTEsY-bg), above the station lower-third.
  @('bms-c', 'D:\flick\output\shorts\gibbs3\dl\ILrjTEsY-bg.mp4', 90.0, 2.2, 900, 0, 395, 700)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
