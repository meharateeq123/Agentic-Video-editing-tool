# Bakes 9:16 beds (720x1280, 30fps) for the Agnes Ngetich world-half-marathon-record short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode (cover | fill)
# Every range below is used ONCE - no clip, and no overlapping range of the source, appears twice.
#   wa-hl.mp4  World Athletics, "Women's Half Marathon | World Road Running Championships
#              Copenhagen 26" (wM8YAVdIxzY). The broadcast prints "LEAD KEN NGETICH", the
#              "RESULTS 1 NGETICH 1:05:15 / 2 LOLEO 1:06:05" board, the RECORDS graphic
#              (WR 1:05:16) and the finish-gantry clock, and her bib reads NGETICH.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\ngetich1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$W = "$proj\dl\wa-hl.mp4"
$rows = @(
  # --- Scene 1: "Agnes Ngetich just destroyed a world record." ---
  @('a1', $W, 72.6, 2.4, 575, 0, 405, 720, 'cover'),
  @('a2', $W, 160.6, 2.4, 520, 0, 405, 720, 'cover'),
  # --- Scene 2: "In Copenhagen, she ran an insane 1:05:15" ---
  @('b1', $W, 1.0, 2.4, 600, 0, 405, 720, 'cover'),
  @('b2', $W, 152.6, 2.4, 437, 0, 405, 720, 'cover'),
  # --- Scene 3: "win the World Half Marathon title and break the women-only record by one second" ---
  @('c1', $W, 236.0, 2.5, 500, 0, 405, 720, 'cover'),
  @('c2', $W, 133.4, 2.4, 430, 0, 850, 720, 'fill'),
  @('c3', $W, 155.2, 2.4, 437, 0, 405, 720, 'cover'),
  # --- Scene 4: "But here's the crazy part. She won by 50 seconds" ---
  @('d1', $W, 66.0, 2.4, 380, 0, 405, 720, 'cover'),
  @('d2', $W, 211.0, 2.4, 0, 0, 640, 720, 'fill'),
  # --- Scene 5: "and Ngetich is on another level." ---
  @('e1', $W, 220.1, 1.5, 650, 0, 405, 720, 'cover'),
  @('e2', $W, 242.0, 2.3, 430, 0, 405, 720, 'cover')
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


