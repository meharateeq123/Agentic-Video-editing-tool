# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Gout Gout short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h (all sources are 1280x720).
#
# Sources (fresh - none appears in an earlier short):
#   au-200.mp4  Athletics Australia / World Athletics official upload of the 2026 Australian Athletics
#               Championships men's open 200m final, Sydney (bItXghj3Re8) - the race Gout ran 19.67 in.
#               He is named by the "GOUT" hip bib and the purple kit throughout.
#   u20-d3.mp4  World Athletics "Day 3 - Full Highlights", World Athletics U20 Championships Oregon 26
#               (p3gR3muZf7s). Gout withdrew from these, so it is stadium/athlete footage only.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\gout1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$A = "$proj\dl\au-200.mp4"
$E = "$proj\dl\u20-d3.mp4"
$rows = @(
  @('g1a', $A, 96.0, 2.2, 360, 0, 405, 720),
  @('g1b', $A, 246.0, 2.6, 515, 0, 405, 720),
  @('g2a', $A, 152.0, 2.6, 190, 0, 405, 720),
  @('g2b', $A, 184.0, 2.6, 360, 0, 405, 720),
  @('g3a', $A, 160.0, 2.6, 390, 0, 405, 720),
  @('g3b', $E, 350.0, 2.6, 390, 0, 405, 720),
  @('g3c', $E, 414.0, 2.6, 350, 0, 405, 720),
  @('g3d', $A, 112.0, 2.6, 250, 0, 405, 720),
  @('g4a', $A, 208.0, 2.6, 340, 0, 405, 720),
  @('g4b', $A, 216.0, 2.6, 330, 0, 360, 640),
  @('g4c', $A, 232.0, 2.6, 400, 0, 405, 720),
  @('g5a', $A, 279.5, 2.6, 290, 0, 405, 720),
  @('g5b', $A, 332.0, 3.0, 310, 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
