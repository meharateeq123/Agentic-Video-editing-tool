# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Regan Smith prelims-vs-finals short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode
#   cover = plain 9:16 crop; fill = crop shown whole over a blurred fill (for wide graphics/boards)
#
# Sources (all fresh, 1280x720 h264, none appears in an earlier short):
#   usas-100back-final.mp4  USA Swimming, "Berkoff and Smith Chase Down Top Two Spots in 100M
#                           Backstroke | 2026 Pan Pacific Championships" (K1CKuU4VKx4). The results
#                           board prints "1 BERKOFF 57.93 / 2 SMITH 58.11" - the exact final number.
#   usas-200back-final.mp4  USA Swimming, "Regan Smith Cruises to Gold in 200M Backstroke" (FUaBnm2yEZs).
#                           Results board prints "1 Regan SMITH 2:05.57" and a "REGAN SM!TH" lower third.
#   d1-100back-h4.mp4       USA Swimming's Day 1 Prelims livestream (z_GHzq1TuUo), cut to the Women's
#                           100 Backstroke Heat 4 (fastest heat). The broadcast's own winner graphic
#                           reads "USA Regan SMITH - WINNER - HEAT 4 - 57.86", matching the script.
#   d3-200back-h4.mp4       USA Swimming's Day 3 Prelims livestream (yHC6b9LePKc), cut to the Women's
#                           200 Backstroke Heat 4. Results board: "1 Regan SMITH 2:04.13".
#   ss-interview.mp4        SwimSwam, "Regan Smith on 100 Back: 'I haven't swam a 58 at night...'"
#                           (kY1m2QzOeNE) - her own words on the exact prelim/finals pattern the
#                           script describes.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\smith1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$F100 = "$proj\dl\usas-100back-final.mp4"
$F200 = "$proj\dl\usas-200back-final.mp4"
$P100 = "$proj\dl\d1-100back-h4.mp4"
$P200 = "$proj\dl\d3-200back-h4.mp4"
$SS   = "$proj\dl\ss-interview.mp4"
$rows = @(
  # --- Scene 1: intro ---
  @('s1a', $SS, 6.0, 2.4, 450, 0, 405, 720, 'cover'),
  # --- Scene 2: won the 200 back, faster in prelims than finals ---
  @('s2a', $F200, 180.0, 2.2, 430, 0, 405, 720, 'cover'),
  @('s2b', $F200, 15.0, 2.0, 470, 0, 405, 720, 'cover'),
  @('s2c', $P100, 61.0, 1.8, 430, 0, 405, 720, 'cover'),
  # A clean side-view swim stroke, not the abstract underwater-streak shot this used to be.
  @('s2d', $P200, 144.5, 1.8, 430, 0, 405, 720, 'cover'),
  # --- Scene 3: 100 back, 57.86 prelim -> 58.11 final ---
  # The broadcast's own "57.86 WINNER HEAT 4" caption - the exact prelim number, no card needed.
  @('s3a', $P100, 130.0, 2.2, 430, 0, 405, 720, 'cover'),
  @('s3c', $F100, 195.0, 2.4, 430, 0, 405, 720, 'cover'),
  # "1 BERKOFF 57.93 / 2 SMITH 58.11" results board, shown whole.
  @('s3d', $F100, 192.0, 2.2, 0, 0, 1280, 720, 'fill'),
  # --- Scene 4: 200 back, 2:04.13 prelim -> winning final in 2:05.57 ---
  # A clean overhead pool shot, not the pole-in-foreground framing this used to be.
  @('s4a', $P200, 122.5, 2.4, 430, 0, 405, 720, 'cover'),
  # The board takes ~1.2s to fade in after 205.0s; starting at 206.2 means it is already up.
  @('s4b', $P200, 206.2, 1.8, 0, 0, 1280, 720, 'fill'),
  @('s4c', $F200, 160.0, 2.4, 430, 0, 405, 720, 'cover'),
  # 225-233s is a cross-fade between a "REGAN SMITH" title card and this board - washed/ghosted. 236s
  # is past the transition, board fully settled.
  @('s4d', $F200, 236.0, 2.4, 0, 0, 1280, 720, 'fill'),
  # --- Scene 5: closer --- a DIFFERENT clip from scene 1's ss-interview.mp4, not a repeat of it: the
  # 200 back prelim heat's own celebration at the wall.
  @('s5a', $P200, 175.0, 2.0, 430, 0, 405, 720, 'cover')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  if ($r[8] -eq 'skip') { continue }
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
