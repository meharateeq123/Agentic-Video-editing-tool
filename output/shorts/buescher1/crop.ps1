# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\buescher1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # SportsWire USA, "NASCAR's Brake Problem Just WRECKED the Playoffs" (l-PFbWLiexw,
  # 2026-09-15), re-pulled at 1280x720 for real sharpness. Clip covers seconds 40-70 of the
  # source; local offsets below are within that 30s window. Avatar bug top-left, banner from
  # y~590 - crops stay inside y 0-560/604.
  @('buescher-portrait', 'brake-problem-hq.mp4', 14.3, 2.3, 460, 0, 340, 604),
  @('briscoe-portrait', 'brake-problem-hq.mp4', 11.3, 2.2, 440, 0, 316, 560),
  @('gateway-pack1', 'brake-problem-hq.mp4', 1.0, 2.3, 440, 0, 316, 560),
  @('gateway-pack2', 'brake-problem-hq.mp4', 19.0, 2.3, 440, 0, 316, 560),
  @('gateway-pack3', 'brake-problem-hq.mp4', 23.0, 2.3, 400, 0, 316, 560),
  # NASCAR ON FOX HIGHLIGHTS, "Chris Buescher snaps 222-race winless streak after victory at
  # Bristol" (E-tpcuo-XnU, 2022-09-18), re-pulled at 1280x720. HQ section covers original
  # seconds 80-95, so the real win moment (originally at 88s) is at local offset 8.0 here.
  @('buescher-bristol-win', 'buescher-bristol-win-hq.mp4', 8.0, 3.2, 380, 0, 360, 660),
  # Holston Aerial Vistas, "Bristol Motor Speedway" (rqsSNfIvQRY, 2026-05-16), re-pulled at
  # 1280x720. Clean, no overlays.
  @('bristol-aerial-a', 'bristol-aerial-hq.mp4', 10.0, 3.0, 440, 0, 406, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
