# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (path), start s, length s, crop x, crop y, crop w, crop h.
#
# Sources (both 1280x720, so every crop is 405x720):
#   wa-day2.mp4     World Athletics, "Day 2 Extended Highlights - World Athletics Ultimate
#                   Championship" (1qZQ5akjdl4). Official broadcast, no watermark. The women's
#                   100m semi-final is at 0:00-0:30 and the FINAL at 0:57-1:55.
#   juS409CMblo.mp4 Brussels Diamond League Final broadcast. Used only for Sha'Carri portraits,
#                   where her bib reads "RICHARDSON" and the lower-third names her - the Budapest
#                   feed never shows her name next to her face, and this library never labels an
#                   unverified face.
#
# This is the first athletics short, so nothing here collides with the motorsport/swimming pools.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\richardson1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$WA = "$proj\dl\wa-day2.mp4"
$BR = "$proj\dl\juS409CMblo.mp4"
$rows = @(
  # --- Budapest, women's 100m final ---
  # The race is shot wide in 16:9, so these crop to 360x640 (a 2x upscale) rather than the full
  # 720 height - at full height the runners end up a thin band over empty infield.
  # Hands on the line, 100m clock at 0.00.
  @('b-hands', $WA, 57.5, 2.4, 440, 40, 360, 640),
  # The blocks, wide, under the "WOMEN'S 100m FINAL" banner.
  @('b-blocks', $WA, 58.7, 2.4, 450, 0, 360, 640),
  # The break from the blocks.
  @('b-start', $WA, 60.6, 2.4, 480, 0, 360, 640),
  # Mid-race, the field strung out.
  @('b-race1', $WA, 63.0, 2.4, 260, 0, 360, 640),
  @('b-race2', $WA, 65.4, 2.4, 680, 0, 360, 640),
  @('b-race3', $WA, 67.4, 2.4, 370, 0, 360, 640),
  # Across the line.
  @('b-fin', $WA, 69.6, 2.4, 280, 40, 360, 640),
  # The winner on her lap, the result list building bottom-left.
  @('b-cel', $WA, 72.6, 2.4, 430, 40, 360, 640),
  # SEIKO photo finish. Cropped hard left so the printed result - 1 JEFFERSON-WOODEN 10.62,
  # 2 ALFRED 10.74, 3 RICHARDSON 10.76 - fills the frame. This replaces a built card.
  # 91.3-93.8 only: the shot dissolves to white just after 94.0.
  @('b-photo', $WA, 91.3, 2.5, 32, 200, 288, 512),
  # Slow-motion of the two Americans in the semi-final.
  @('b-slowmo', $WA, 15.2, 2.6, 740, 40, 360, 640),
  # --- Sha'Carri portraits (Brussels) ---
  # Her whole introduction, sliced into six disjoint 2.4s beds so no frame is used twice.
  @('s-intro', $BR, 45.3, 2.4, 450, 0, 405, 720),
  @('s-name', $BR, 47.8, 2.4, 430, 0, 405, 720),
  @('s-ready', $BR, 50.3, 2.4, 440, 0, 405, 720),
  @('s-close', $BR, 53.4, 2.4, 450, 0, 405, 720),
  @('s-focus', $BR, 55.9, 2.4, 450, 0, 405, 720),
  # She walks out of frame just after 58.3s, so her run of beds ends here.
  # Closing shot instead: the final's side-tracking slow motion.
  @('b-slow2', $WA, 78.0, 2.4, 350, 0, 360, 640)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
