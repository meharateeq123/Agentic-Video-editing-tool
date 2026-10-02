# Bakes 9:16 beds (720x1280, 30fps) for the "NASCAR JUST Revealed Why Kansas Could DESTROY the Chase!" short.
# Row: name, source, start s, length s, crop x  (every bed is an 800x666 window at y=27, laid over its own blur)
# Every range below is used ONCE - no clip, and no overlapping range of a source, appears twice.
#   ot2nd       NASCAR, "Final Laps: Watch the wild second overtime | NASCAR race at Kansas Speedway" (Lhda_Ro_poo)
#   thriller25  NASCAR, "Final Laps: Edge-of-Your-Seat THRILLER in Kansas | 2025 NASCAR Cup Series" (QzpujcBALvQ)
#   nose24      NASCAR, "Kansas overtime ends at the line with closest finish in NASCAR Cup Series history" (zuhBr4ibh2c)
#   hamlin23    NASCAR, "Hamlin overcomes Larson for win after last-lap pass at Kansas" (qRSUFLDXvRI)
# thriller25 prints a scoring pylon on the left ~14% of the frame; every crop of it starts at x>=200 so it stays out.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\kansas1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$R = "$proj\dl\ot2nd.mp4"
$T = "$proj\dl\thriller25.mp4"
$N = "$proj\dl\nose24.mp4"
$H = "$proj\dl\hamlin23.mp4"
$rows = @(
  # --- Scene 1: "Kansas has become NASCAR's wildest late-race track." ---
  @('a1', $R, 25.0, 2.5, 240),
  @('a2', $T, 40.0, 2.5, 320),
  # --- Scene 2: "In five of the last seven Kansas races, the winning pass happened in the final two laps, and four went to overtime." ---
  @('b1', $N, 21.5, 3.0, 480),
  @('b2', $T, 125.5, 3.0, 340),
  @('b3', $N, 30.0, 3.0, 240),
  # --- Scene 3: "Now the chase arrives with Kyle Larson only one point ahead of Denny Hamlin, while several drivers are desperately trying to close the gap." ---
  @('c1', $H, 28.0, 2.7, 350),
  @('c2', $H, 32.0, 2.7, 260),
  @('c3', $H, 86.0, 2.7, 355),
  @('c4', $T, 19.5, 2.7, 300),
  # --- Scene 4: "One late restart could completely change the championship picture." ---
  @('d1', $R, 13.0, 2.6, 480),
  @('d2', $R, 28.2, 2.6, 450),
  # --- Scene 5: "And at Kansas, anything can happen in the final lap." ---
  @('e1', $T, 130.0, 2.8, 355),
  @('e2', $H, 90.0, 2.8, 355)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $fc = "[0:v]crop=800:666:$($r[4]):27,split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -filter_complex $fc -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}

