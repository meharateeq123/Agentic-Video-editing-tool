# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from the two sources.
# Each row: name, source (path), start s, length s, crop x, crop y, crop w, crop h.
#
# Sources (both 1920x1080, already on disk from records2026 - nothing new had to be downloaded):
#   PP  mcintosh-400im-panpacs.mp4   USA Swimming, "McIntosh and Forrester Top Two in Record
#                                    Breaking 400M IM | 2026 Pan Pacific Swimming Championships"
#                                    (O4CZYNGkZqM). Official, no watermark.
#   WR  mcintosh-400im-wr-cbc.mp4    CBC's coverage of the 2025 Canadian Trials, where she set the
#                                    4:23.65 world record this script compares against.
#
# REUSE: records2026 already used PP 0-4.0s, 286-298.67s and WR 266-280s. Every row below sits
# outside those windows.
#
# The 320-338s stretch of PP is the broadcast's own replay of her swim - fly head-on, backstroke
# tracking, overhead - and is the only part of that feed shot tight enough to crop to 9:16. The
# live race coverage is all wide overheads where the swimmers are a thin band.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\mcintosh1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$R = 'D:\flick\swimming\output\records2026\sources'
$PP = "$R\mcintosh-400im-panpacs.mp4"
$WR = "$R\mcintosh-400im-wr-cbc.mp4"
$rows = @(
  # --- Pan Pacs: her swim (the broadcast replay) ---
  @('pp-fly', $PP, 320.0, 2.6, 620, 0, 608, 1080),
  @('pp-back', $PP, 327.0, 2.6, 780, 0, 608, 1080),
  @('pp-fly2', $PP, 322.8, 2.6, 620, 0, 608, 1080),
  # --- Pan Pacs: the wall. Cropped above the lower-third so nothing fights the caption, but her
  #     cap still reads "McINTOSH / CAN" - that plus the 299s lower-third is the identity proof.
  @('pp-wall', $PP, 299.2, 2.6, 957, 80, 405, 720),
  @('pp-smile', $PP, 303.6, 2.6, 760, 100, 405, 720),
  @('pp-hug', $PP, 311.4, 2.6, 680, 200, 405, 720),
  @('pp-rope', $PP, 313.5, 2.6, 680, 220, 405, 720),
  # --- Pan Pacs: the post-race interview, where "she wasn't satisfied" actually happens ---
  @('pp-int1', $PP, 383.0, 2.6, 1000, 0, 608, 1080),
  @('pp-int2', $PP, 390.0, 2.6, 880, 0, 608, 1080),
  @('pp-int3', $PP, 397.5, 2.6, 800, 0, 608, 1080),
  @('pp-int4', $PP, 404.0, 2.6, 850, 0, 608, 1080),
  # --- Canadian Trials: the 4:23.65 world record itself. Both cropped above the results strip so
  #     nothing competes with the caption at the bottom of the frame.
  @('wr-water', $WR, 307.0, 2.6, 760, 100, 405, 720),
  # She turns away from camera just after 341s, so this one is short.
  @('wr-smile', $WR, 338.8, 2.2, 670, 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
