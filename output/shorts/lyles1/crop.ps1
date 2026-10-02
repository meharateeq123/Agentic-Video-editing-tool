# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Noah Lyles short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h (all sources are 1280x720).
#
# Sources (all fresh - none appears in an earlier short):
#   usatf-200.mp4  USA Track & Field official, 2026 USATF Outdoor Championships men's 200m final
#                  (RdtCMkAvI90). Lyles is named by the lower-third at 0:15 and wears the same lilac kit
#                  and hip bib "6" all through; this is the race he finished 9th in.
#   usatf-100.mp4  USA Track & Field official, 2026 USATF men's 100m final (2UuSXzxR228). Lyles won in 9.79.
#   wa-day3.mp4    World Athletics, "Day 3 Extended Highlights - World Athletics Ultimate Championship"
#                  (VGEP4NM60-c), Budapest. Lyles was not in it, so this is stadium/race footage only.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\lyles1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$A = "$proj\dl\usatf-200.mp4"
$B = "$proj\dl\usatf-100.mp4"
$W = "$proj\dl\wa-day3.mp4"
$rows = @(
  @('l1a', $A, 52.0, 2.0, 380, 0, 405, 720),
  @('l1b', $A, 100.0, 2.0, 498, 40, 360, 640),
  @('l2a', $A, 42.0, 2.6, 400, 40, 360, 640),
  @('l2b', $A, 118.0, 2.6, 537, 40, 360, 640),
  @('l3a', $A, 125.0, 2.6, 421, 40, 360, 640),
  @('l3b', $A, 25.3, 1.8, 440, 0, 405, 720),
  @('l4a', $W, 182.0, 2.6, 330, 0, 360, 640),
  @('l4b', $W, 176.0, 2.6, 485, 0, 360, 640),
  @('l5a', $B, 328.0, 2.6, 440, 0, 405, 720),
  @('l5b', $B, 342.0, 2.6, 540, 0, 405, 720),
  # The broadcast results board is 456px wide - wider than a 9:16 crop of a 720p frame - so it is
  # shown whole over a blurred fill of the same shot instead of being cropped.
  @('l5c', $B, 348.0, 2.6, 55, 0, 480, 720),
  @('l6a', $A, 18.7, 1.7, '450+290*t/1.7', 0, 405, 720),
  @('l6b', $A, 122.0, 2.4, 480, 40, 360, 640)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[0] -eq 'l5c') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2-260,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
    "$($r[0]) exit $LASTEXITCODE"
    continue
  }
  $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
