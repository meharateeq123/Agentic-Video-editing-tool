# Bakes 9:16 beds (720x1280, 30fps) for the Yumeki Kojima Asian Games short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h, mode (cover | fill)
# Every range is used ONCE - no clip, and no overlapping range of a source, appears twice.
#   hl.mp4      Japan High Life (jRHbzmy_2Mc): a spectator's phone video of the men's 200m IM final at
#               the 20th Asian Games, Aichi-Nagoya 2026 (banners in shot). Its last seconds pan to the
#               big screen "Men's 200m Individual Medley - Final: WANG Shun 3, MATSUSHITA Tomoyuki 1,
#               KOJIMA Yumeki 2".
#   pp.mp4      USA Swimming, "Kojima, Tierney, and Ekk in 200M Backstroke | 2026 Pan Pacific" (K-6tqztILTQ):
#               the broadcast names him (lower third "Yumeki KOJIMA", JPN) - used only for shots of HIM.
#   phelps.mp4  Olympic Games channel, "15 year-old Michael Phelps' first Olympic race" (sHblLbk0Flo):
#               the Sydney 2000 200m butterfly start list naming "3 Michael Phelps".
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\swimming\output\kojima1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$H = "$proj\dl\hl.mp4"; $P = "$proj\dl\pp.mp4"; $PH = "$proj\dl\phelps.mp4"
$rows = @(
  # --- Scene 1: "Yumeki Kojima just did something huge at the Asian Games." ---
  @('a1', $P, 149.0, 2.0, '560+150*t/2.0', 0, 405, 720, 'cover'),
  @('a2', $H, 6.0, 1.7, 250, 0, 405, 720, 'cover'),
  # --- Scene 2: "The 17-year-old Japanese swimmer smashed the World Junior Record" ---
  @('b1', $P, 158.0, 2.4, 300, 0, 405, 720, 'cover'),
  @('b2', $P, 164.0, 2.4, 440, 0, 405, 720, 'cover'),
  # --- Scene 3: "in the 200-meter IM with a crazy 1:55.36!" ---
  @('c1', $H, 9.0, 2.4, 300, 0, 405, 720, 'cover'),
  @('c2', $H, 27.0, 2.4, 100, 0, 405, 720, 'cover'),
  @('c3', $H, 63.0, 2.4, 700, 0, 405, 720, 'cover'),
  # --- Scene 4: "He even went faster than Michael Phelps' old unofficial junior best," ---
  @('d1', $PH, 3.0, 2.4, 180, 0, 920, 720, 'fill'),
  @('d2', $P, 227.0, 2.4, 420, 0, 405, 720, 'cover'),
  # --- Scene 5: "and he was just 0.06 seconds from gold!" ---
  @('e1', $H, 74.0, 2.4, 300, 0, 405, 720, 'cover'),
  @('e2', $H, 84.0, 2.4, 300, 0, 405, 720, 'cover'),
  @('e3', $H, 106.0, 2.5, 350, 0, 930, 720, 'fill')
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

