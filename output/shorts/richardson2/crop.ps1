# Bakes 9:16 beds (720x1280, 30fps) for the Sha'Carri "warning for 2027" short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode (cover | fill | live)
# Every range below is used ONCE - no clip, and no overlapping range of a source, appears twice.
#   usa-athlos100.mp4  USA Sports, "100m Highlights Athlos London" (E_majT_oUKQ), 2026-09-18: her 10.80.
#                      The "100M RESULTS - 1 SHA'CARRI RICHARDSON 10.80" board and the
#                      "SHA'CARRI RICHARDSON 100M WINNER 10.80" interview bug name her on screen.
#   rog-mjw.mp4        Republic of Games, "Women's 100m Melissa Jefferson-Wooden wins 10.62s"
#                      (-tqyKdNAY0w), Budapest - the leader board reads "1 Melissa JEFFERSON-WOODEN 10.62".
#   citius-int.mp4     CITIUS MAG mixed zone after the Athlos race (sxjdib6SWJI).
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\richardson2'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$U = "$proj\dl\usa-athlos100.mp4"; $R = "$proj\dl\rog-mjw.mp4"; $C = "$proj\dl\citius-int.mp4"
$rows = @(
  @('a5', $U, 189.5, 2.4, 120, 0, 405, 720, 'cover'),
  @('a3', $U, 107.0, 2.4, 480, 0, 405, 720, 'cover'),
  @('a2', $U, 170.0, 2.2, 300, 0, 405, 720, 'cover'),
  @('a4', $U, 255.0, 2.6, 130, 60, 1000, 563, 'fill'),
  @('b2', $U, 228.0, 2.4, 250, 0, 405, 720, 'cover'),
  @('a6', $U, 195.0, 2.4, 480, 0, 405, 720, 'cover'),
  @('b1', $U, 214.0, 2.4, 250, 0, 405, 720, 'cover'),
  @('m1', $R, 0.0, 2.2, 440, 0, 405, 720, 'cover'),
  @('m4', $R, 33.3, 1.8, 280, 0, 405, 720, 'cover'),
  @('m3', $R, 50.0, 2.4, 300, 0, 405, 720, 'cover'),
  # REAL-VOICE PAYOFF: "I'm so excited for more next year. I felt really good." Never speed-changed.
  @('h5', $U, 197.6, 5.4, 300, 0, 405, 720, 'live')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[8] -eq 'fill') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  } elseif ($r[8] -eq 'live') {
    $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 -c:a aac -b:a 192k -ar 48000 -ac 2 $out
  } else {
    $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}