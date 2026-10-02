# Bakes 9:16 bed clips (720x1280, 30fps) for the Josh Kerr short.
#
# Row: name, source, start s, length s, crop x (a number or an ffmpeg expression in t), crop y,
#      crop w, crop h, mode. Modes:
#   cover  plain 9:16 crop (silent)
#   fill   the crop shown whole over a blurred fill of itself, for graphics too wide to crop
#   live   like cover, but the clip KEEPS ITS AUDIO - this is the bed that plays the real
#          broadcast commentary at full volume once the voiceover has finished.
#
# Sources (fresh - none appears in an earlier short):
#   kerr-race.mp4   World Athletics' own Day 3 livestream of the Ultimate Championship, Budapest
#                   (NIssOF0RavQ), cut to 7745-8110s: the men's 1500m final Kerr won in 3:29.35.
#                   At 35s the broadcast puts a full-screen "JOSH KERR - Great Britain & N.I." card
#                   on his face, and the leader bug reads "1 KERR" all through the race, so every
#                   shot is a proven face. Its audio is the live call and the crowd.
#   wa-mile-wr.mp4  World Athletics, "Josh Kerr smashes the men's mile world record at home"
#                   (wQ7uTKlg2Us), London Diamond League - the WR 3:42.68 board is in frame.
#   cg-mile.mp4     Commonwealth Games, "Josh Kerr's ICONIC Commonwealth Mile Win", Glasgow 2026
#                   (se_-SFBJv5M) - Kerr in the Scotland vest.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\kerr1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$R = "$proj\dl\kerr-race.mp4"
$M = "$proj\dl\wa-mile-wr.mp4"
$G = "$proj\dl\cg-mile.mp4"
$rows = @(
  @('k1a', $R, 35.0, 3.0, 430, 0, 405, 720, 'cover'),
  # The field runs right-to-left across the frame, so the crop pans with it.
  @('k1b', $R, 283.0, 3.0, '620-150*t/3', 0, 405, 720, 'cover'),
  @('k2a', $R, 80.2, 3.0, 440, 0, 405, 720, 'cover'),
  @('k2b', $R, 254.5, 3.0, 330, 0, 405, 720, 'cover'),
  @('k2c', $R, 262.8, 3.0, '250+140*t/3', 0, 405, 720, 'cover'),
  @('k3a', $R, 182.5, 3.0, 430, 0, 405, 720, 'cover'),
  @('k3b', $R, 247.0, 3.0, 400, 0, 405, 720, 'cover'),
  # The finish. The SEIKO clock rolling to 3:29.36 sits bottom-centre, so the crop is centred on it.
  @('k4a', $R, 288.6, 3.0, 300, 0, 405, 720, 'cover'),
  @('k4b', $R, 292.9, 3.0, 420, 0, 405, 720, 'cover'),
  # The stadium screen - "Men's 1609m / NEW WR / GBR 3:42.66 / KERR JOSH" - is wider than a 9:16 crop,
  # so it is shown whole over a blurred fill: the record number is the venue's own graphic, not a
  # built card. It lasts only 0.8s in the source and SceneBed slows it to fill the cut, which is
  # harmless for a static board with no sound.
  @('k5a1', $M, 35.85, 0.8, 0, 0, 1280, 720, 'fill'),
  @('k5a2', $M, 36.7, 3.0, 560, 0, 405, 720, 'cover'),
  @('k5b', $G, 249.5, 3.0, 430, 0, 405, 720, 'cover'),
  @('k5c', $R, 305.5, 3.0, 430, 0, 405, 720, 'cover'),
  # THE PAYOFF. One continuous 8.4s take with its own sound: "...he is the ultimate champion over
  # 1500 metres, four targets this year, three titles and a World Record." Never speed-changed -
  # SceneBed would pitch-shift the commentary - so the bake is longer than the scene needs.
  @('k6', $R, 296.4, 8.4, 430, 0, 405, 720, 'live')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  if ($r[8] -eq 'fill') {
    $fc = "[0:v]crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30"
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
    "$($r[0]) exit $LASTEXITCODE"
    continue
  }
  $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  if ($r[8] -eq 'live') {
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 -c:a aac -b:a 192k -ar 48000 -ac 2 $out
  } else {
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}
