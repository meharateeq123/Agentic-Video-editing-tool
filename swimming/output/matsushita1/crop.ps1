# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from the one source for the Matsushita short.
# Source: TV Asahi Sports official, "Matsushita Tomoyuki - Japan record, men's 400m IM, Inkare 2026"
#         (4QFWetWwP6g), 1280x720 h264. Identity is on screen: lower-third "Matsushita Tomoyuki, Toyo
#         Univ 3rd yr" (0:00-0:35), lane-5 graphic "5 Matsushita 4:13.59" (1:04), lane 5 in the start
#         list (0:48), and the finish graphic "1 Matsushita ... Nihon-shin 4:05.83" (8:40+).
# Row: name, mode, start s, length s, crop x (number or t-expression), crop y, crop w, crop h
#   C = plain full-screen 9:16 crop.
#   L = 9:16 crop lifted 200px so a bottom-of-frame broadcast graphic clears the caption; the 200px band
#       left at the bottom is a blurred, darkened copy of the same shot (no small floating window).
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\matsushita1'
$ff = "D:\flick\output\shorts\gibbs1\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$src = "$proj\sources\asahi-inkare.mp4"
$rows = @(
  @('m1a', 'L', 1.0, 1.8, '60+270*t/1.8', 0, 405, 720),
  @('m1b', 'C', 26.4, 1.8, '545', 0, 405, 720),
  @('m1c', 'L', 86.5, 1.7, '170+550*t/1.7', 0, 405, 720),
  @('m2a', 'L', 64.0, 2.0, '110', 0, 405, 720),
  @('m2b', 'C', 222.0, 2.0, '560', 0, 405, 720),
  @('m2c', 'C', 192.2, 1.6, '560', 0, 405, 720),
  @('m2d', 'L', 424.6, 2.2, '875', 0, 405, 720),
  @('m2e', 'C', 430.9, 1.8, '480', 0, 405, 720),
  @('m3a', 'L', 300.0, 2.2, '850', 0, 405, 720),
  @('m3b', 'C', 392.0, 2.2, '560', 0, 405, 720),
  @('m4a', 'C', 518.0, 1.8, '585', 0, 405, 720),
  @('m4b', 'L', 532.0, 2.0, '30+450*t/2.0', 0, 405, 720),
  @('m4c', 'C', 578.0, 1.6, '590', 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[1] -eq 'L') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),split[a][b];[a]scale=720:1280,boxblur=30:3,eq=brightness=-0.18[bg];[b]scale=720:1280:flags=lanczos[fg];[bg][fg]overlay=0:-200,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $src -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  } else {
    $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $src -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}
