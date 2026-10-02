# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Yu Zidi short. All sources 1920x1080 h264.
# Sources (all fresh - none used in an earlier film):
#   fg  CGTN Sports Scene, "13-Year-Old Yu Zidi wins 200m butterfly gold at Aichi Nagoya 2026" (vVSxM_edPCA)
#   st  Sports Today, "Who is Yu Zidi? 13-year-old who smashed the Asian Games record" (-NHp3dH_7HU)
#   ng  CGTN / CCTV, 15th National Games 200m IM final (X6w2g-zX-EE), Nov 2025 - NOT the Asian Games race
#   mc  CBC Sports, Summer McIntosh's 200 IM world record (zOWS_GBJue0), 2:05.70
# Row: name, source, start s, length s, crop x (number or t-expression), crop y, crop w, crop h, mode
#   C = plain full-height 9:16 crop (no face, or a small subject).
#   F = face-safe: a WIDER crop (so the whole head, hair and ears fit with margin) fitted to the 720 width,
#       the few pixels left top and bottom filled with a soft blurred extension of the same shot.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\yuzidi3'
$ff = 'D:\flick\output\rainrule1\remotion\node_modules\ffmpeg-static\ffmpeg.exe'
$S = @{ fg = "$proj\sources\cgtn-fly-gold.mp4"; st = "$proj\sources\sportstoday.mp4"; ng = "$proj\sources\cgtn-ng-asianrec.mp4"; mc = "$proj\sources\mcintosh-wr.mp4" }
$rows = @(
  @('a1', 'fg', 0.3, 2.2, '720', 0, 800, 1080, 'F'),
  @('a2', 'st', 37.4, 2.2, '0', 0, 800, 1080, 'F'),
  @('a3', 'st', 53.4, 2.2, '0', 0, 800, 1080, 'F'),
  @('b1', 'st', 5.4, 2.2, '560', 0, 800, 1080, 'F'),
  @('b2', 'ng', 0.8, 2.2, '80+620*t/2.0', 0, 585, 1040, 'C'),
  @('b3', 'ng', 6.5, 2.2, '100', 0, 585, 1040, 'C'),
  @('b4', 'ng', 14.6, 2.2, '606', 0, 800, 1040, 'F'),
  @('b5', 'ng', 24.4, 2.2, '40', 0, 585, 1040, 'C'),
  @('b6', 'ng', 38.8, 2.2, '250', 0, 800, 1040, 'F'),
  @('c1', 'fg', 4.0, 2.2, '670', 0, 800, 1080, 'F'),
  @('c2', 'ng', 33.0, 2.2, '400', 0, 585, 1040, 'C'),
  @('c3', 'mc', 116.0, 2.2, '700', 0, 608, 1080, 'C'),
  @('c4', 'mc', 206.8, 2.2, '690', 0, 608, 1080, 'C'),
  @('c5', 'mc', 189.4, 2.4, '300+700*t/2.0', 0, 608, 1080, 'C'),
  @('d1', 'st', 77.4, 2.2, '540', 0, 800, 1080, 'F'),
  @('d2', 'fg', 7.6, 2.4, '640', 0, 800, 1080, 'F')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[8] -eq 'F') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),split[a][b];[a]scale=-2:1280,crop=720:1280,boxblur=34:3,eq=brightness=-0.10[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=0:(H-h)/2,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $S[$r[1]] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  } else {
    $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $S[$r[1]] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}

