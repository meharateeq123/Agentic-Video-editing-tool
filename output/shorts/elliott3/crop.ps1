# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (path), start s, length s, crop x, crop y, crop w, crop h.
# rp-* files are sections of NASCAR's official Gateway full race replay (TkeSuY3t6iY, 720p). None of
# the stretches below were used by blaney1 or blaney2 (see remotion/src/footage.ts).
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\elliott3'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$B2 = 'D:\flick\output\shorts\blaney2\dl'
$G3 = 'D:\flick\output\shorts\gibbs3\dl'
$rows = @(
  # Elliott's No. 9 stopped with the front-left wheel broken, "ELLIOTT" on the windshield (3:06:10).
  @('e-car', "$B2\rp-elliott.mp4", 20.0, 3.0, 600, 0, 405, 720),
  # The No. 9 and No. 19 spinning after the failure (3:05:42).
  @('e-spin', "$proj\dl\rp-e-pre.mp4", 47.5, 2.0, 600, 0, 405, 720),
  # Hendrick crew on the No. 9's brakes on pit road.
  @('e-crew', "$B2\rp-elliott.mp4", 120.5, 2.2, 300, 0, 405, 720),
  # Elliott's USA Network interview, before the standings lower-third appears.
  @('e-int', "$B2\rp-elliott-int.mp4", 16.0, 3.0, 440, 0, 405, 720),
  # Same interview later on, after the stale mid-race standings lower-third has gone (50s+).
  @('e-int2', "$B2\rp-elliott-int.mp4", 51.0, 3.0, 440, 0, 405, 720),
  # The No. 9 limping with smoke off the front after the failure.
  @('e-limp', "$B2\rp-elliott.mp4", 0.3, 2.5, 640, 0, 405, 720),
  # Elliott's Frontstretch interview (RHs47apM-tU), cropped clear of the watermark and banner.
  @('e-fs', "$B2\RHs47apM-tU.mp4", 88.0, 2.5, 220, 55, 304, 540),
  # Chris Buescher's No. 17 into the wall on Lap 238 (3:39:35), then in close-up.
  @('b-wall', "$proj\dl\rp-buescher.mp4", 24.0, 1.6, 470, 0, 405, 720),
  # 39s is after the "CHRIS BUESCHER / RFK RACING" lower-third leaves.
  @('b-close', "$proj\dl\rp-buescher.mp4", 39.4, 1.4, 700, 0, 405, 720),
  # Buescher out of the car, "BUESCHER" on the windshield (3:44:11), past the in-car dissolve.
  @('b-out', "$proj\dl\rp-buescher-out.mp4", 7.0, 1.4, 280, 0, 405, 720),
  # Blaney's No. 12 with the right-front wheel torn up (2:14:10).
  @('bl-car', "$B2\rp-blaney.mp4", 130.5, 2.2, 520, 0, 405, 720),
  # Bristol Motor Speedway this week (WJHL, ILrjTEsY-bg), above the station lower-third.
  @('bms-a', "$G3\ILrjTEsY-bg.mp4", 84.5, 2.2, 700, 0, 395, 700),
  @('bms-b', "$G3\ILrjTEsY-bg.mp4", 106.2, 2.2, 700, 0, 395, 700),
  # Bristol night-race action (night25-60.mp4, a stretch gibbs3/bell3 never touched — they only used
  # night25-285/455 and night25-finish). Cropped clear of the running-order ticker on the left.
  @('br-a', "$G3\night25-60.mp4", 17.9, 2.2, 850, 0, 608, 1080),
  @('br-b', "$G3\night25-60.mp4", 32.25, 2.2, 760, 0, 608, 1080),
  @('br-c', "$G3\night25-60.mp4", 44.6, 2.2, 880, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
