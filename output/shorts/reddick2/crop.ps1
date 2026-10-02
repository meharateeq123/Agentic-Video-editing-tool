# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\reddick2'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # NASCAR Nation News, "Tyler Reddick GOES AIRBORNE in Wild Gateway Wreck" (vJlpFfcVDyA,
  # 2026-09-14, muxed at 640x360). Avatar bug top-left (~0-55x0-30), banner from y~300.
  @('reddick-pack', 'reddick-airborne-recap.mp4', 198.0, 3.5, 220, 0, 169, 300),
  @('reddick-airborne', 'reddick-airborne-recap.mp4', 0.8, 2.2, 150, 0, 169, 300),
  @('reddick-wall', 'reddick-airborne-recap.mp4', 3.0, 2.4, 270, 0, 169, 300),
  # HHLT/Knips_Kombinat DJI Air 2S, Bristol Motor Speedway short (w-mvGLCXMyE, 2025-09-29,
  # 1920x1080). Clean, no overlays.
  @('bristol3-a', 'bristol-drone2.mp4', 5.0, 3.2, 650, 0, 608, 1080),
  @('bristol3-b', 'bristol-drone2.mp4', 40.0, 3.0, 650, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
