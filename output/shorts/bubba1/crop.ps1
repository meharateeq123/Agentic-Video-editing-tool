# Bakes 9:16 beds (720x1280, 30fps) for the Bubba Wallace Kansas short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode (cover | fill)
# Every range below is used ONCE - no clip, and no overlapping range of a source, appears twice.
#   k22   NASCAR, "Bubba Wallace holds off Denny Hamlin to win at Kansas" (QpGcFTvHJSY), the 2022
#         Hollywood Casino 400 - the ticker prints "HOLLYWOOD CASINO 400 AT KANSAS SPEEDWAY" with
#         Wallace P1 / Hamlin P2. Stops at 1:38; the end card after it is never used. The cover
#         crops start at y=124 so that ticker bar stays out of frame.
#   st    Peter Stratta, "Bubba Wallace Talks Kansas, Generational Chase Run" (_I1dHhOHDJw), a phone
#         call posted 2026-09-23. The vertical video sits at x 448-832 of the 720p frame, so the crop
#         keeps only that strip: the "Peter Stratta" watermark and channel logo live in the blurred
#         side pads and never reach the short. Bubba says "we're still 92 points out" (2:23.8) and
#         "I look at Kansas as a great opportunity for us" (2:27.9), and "winning Sunday ultimately
#         flips the script for all of us" (3:10.9-3:15.6) - the tail bed keeps that last line's audio.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\bubba1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$K = "$proj\dl\kansas22.mp4"
$S = "$proj\dl\stratta.mp4"
$rows = @(
  # --- Scene 1: "Bubba Wallace knows Kansas could change everything." ---
  @('a1', $K, 86.5, 2.3, 553, 124, 335, 596, 'cover'),
  @('a2', $S, 147.6, 2.3, 448, 0, 384, 683, 'cover'),
  # --- Scene 2: "He enters this weekend 92 points behind the championship lead, ... needs badly to win." ---
  @('b1', $S, 143.1, 3.7, 448, 0, 384, 683, 'cover'),
  @('b2', $K, 82.4, 3.7, 395, 124, 760, 596, 'fill'),
  # --- Scene 3: "Wallace has already won at Kansas before, so he knows what it takes." ---
  @('c1', $K, 71.5, 2.6, 523, 124, 335, 596, 'cover'),
  @('c2', $K, 89.3, 2.6, 473, 124, 335, 596, 'cover'),
  # --- Scene 4: "But with the chase getting tighter, can Bubba pull off another Kansas shocker?" ---
  @('d1', $S, 217.3, 2.7, 448, 0, 384, 683, 'cover'),
  @('d2', $K, 96.2, 2.7, 593, 124, 335, 596, 'cover')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[8] -eq 'fill') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  } else {
    $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}

# --- Scene 5: the real voice. Bubba's own words, WITH their audio; the 1.9s of dead air between
# "winning Sunday." (191.9) and "Ultimately" (193.44) is cut out.
if (-not $Only.Count -or ($Only -contains 'tail')) {
  $v = "crop=384:683:448:0,scale=720:1280:flags=lanczos,fps=30,setsar=1"
  $fc = "[0:v]$v[v0];[1:v]$v[v1];[0:a]aresample=48000,asetpts=PTS-STARTPTS[a0];[1:a]aresample=48000,asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]"
  & $ff -hide_banner -loglevel error -y -ss 190.55 -t 1.40 -i $S -ss 193.30 -t 2.45 -i $S -filter_complex $fc -map '[v]' -map '[a]' -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -threads 4 "$proj\remotion\public\bed-pool\tail.mp4"
  "tail exit $LASTEXITCODE"
}



