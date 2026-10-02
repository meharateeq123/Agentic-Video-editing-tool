# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Steenbergen short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode ('cover' = plain 9:16
# crop, 'fill' = the crop is shown whole over a blurred fill of itself, for graphics too wide to crop).
#
# Sources (all 720p h264, fresh - none appears in an earlier film or short):
#   wa-sing.mp4    World Aquatics official, Women's 100m Freestyle final, Singapore (LpzxaM6YnOA).
#                  Steenbergen is proven by the "STEENBERGEN" lane graphic, the results board
#                  (STEENBERGEN 1) and her cap (NED STEENBERGEN).
#   wa-sing2.mp4   World Aquatics, the same final (j4KK2SJj22I).
#   canale10.mp4   Canale 10 / TV Regione Lazio report from the 62nd Settecolli (8siHVHzbHCU): the
#                  poster reads "26-27-28 giugno 2026, Foro Italico". Pool and podium, no swimmers named.
#   nuoto-sette.mp4  Nuoto.com "Marrit Steenbergen Settecolli 2026" (opAIZYI5OSw) - the Rome backdrop.
#   swimswam-wr.mp4  SwimSwam, "Steenbergen on 100 Free World Record" (DjbWOhcPFhQ) - a portrait video
#                  inside a 16:9 frame, so the crop is the inner picture.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\steenbergen1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$WS = "$proj\dl\wa-sing.mp4"
$W2 = "$proj\dl\wa-sing2.mp4"
$C10 = "$proj\dl\canale10.mp4"
$NS = "$proj\dl\nuoto-sette.mp4"
$SW = "$proj\dl\swimswam-wr.mp4"
$rows = @(
  @('s1a', $WS, 0.3, 1.7, 400, 0, 405, 720, 'cover'),
  @('s1b', $NS, 12.0, 1.7, 360, 0, 405, 720, 'cover'),
  @('s1c', $WS, 1.7, 2.0, 375, 0, 405, 720, 'cover'),
  @('s2a', $C10, 15.45, 1.15, 0, 0, 1280, 720, 'fill'),
  @('s2b', $C10, 11.0, 2.0, 500, 0, 405, 720, 'cover'),
  @('s2c', $NS, 24.0, 2.2, 460, 0, 405, 720, 'cover'),
  @('s3a', $SW, 3.0, 2.0, 438, 0, 405, 720, 'cover'),
  @('s3b', $SW, 24.0, 2.0, 438, 0, 405, 720, 'cover'),
  @('s3c', $SW, 52.0, 2.4, 438, 0, 405, 720, 'cover'),
  @('s4a', $WS, 24.0, 2.0, 640, 0, 405, 720, 'cover'),
  @('s4b', $W2, 7.5, 2.0, 380, 0, 405, 720, 'cover'),
  @('s4c', $WS, 66.0, 2.4, 440, 0, 480, 720, 'fill'),
  @('s4d', $WS, 82.6, 2.0, 760, 0, 360, 640, 'cover'),
  @('s5a', $C10, 90.5, 2.0, 700, 0, 405, 720, 'cover'),
  @('s5b', $SW, 96.0, 2.0, 438, 0, 405, 720, 'cover'),
  @('s5c', $NS, 84.0, 2.6, 360, 0, 405, 720, 'cover')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[8] -eq 'fill') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  } else {
    $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}
