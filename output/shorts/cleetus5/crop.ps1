# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from 1080p sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\cleetus5'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Cleetus after Rockingham (NASCAR repost of the FloRacing interview), face at ~43% across.
  @('cleetus-interview-a', 'hd-EiGiotdP2zc.mp4', 8.5, 5.5, 522, 0, 608, 1080),
  # Same interview, later stretch, face centred.
  @('cleetus-interview-b', 'hd-EiGiotdP2zc.mp4', 59.5, 7.0, 740, 0, 608, 1080),
  # Squirrel McNutt after his Rockingham top-10 (Peter Stratta). 63.5s drifted off the right edge;
  # 88.5-93s keeps his face 41-50% across (his hand crosses the frame before 88.5s).
  @('mcnutt-rockingham', 'SmVYQzKnAQ8.mp4', 87.5, 6.0, 579, 0, 608, 1080),
  # FloRacing ARCA East Rockingham (720p only). No. 30 Kenetik Ford on track, section starts at race
  # time 655s. Crop starts at y=120 to drop the running-order ticker; the driver-spotlight lower-third
  # sits left of x=391 and stays out.
  @('cleetus30-track', 'hd-flo-track30.mp4', 11.5, 3.0, 521, 120, 338, 600),
  # Same broadcast, No. 30 pit stop (race time 2307s). x=553 keeps the COMMERCIAL BREAK tag out.
  @('cleetus30-pit', 'hd-flo-pit30.mp4', 6.8, 3.2, 553, 0, 405, 720),
  # His own vlog, first RCR test at Rockingham: in-car camera on track (vlog 1644-1656s).
  @('cleetus-incar-pov', 'hd-vlog-incar.mp4', 44.0, 12.0, 656, 0, 608, 1080),
  # Same vlog: Cleetus strapped in, helmet on, before the run (vlog 1768-1778s, section starts 1720s).
  @('cleetus-helmet', 'hd-vlog-helmet.mp4', 48.0, 10.0, 694, 0, 608, 1080),
  # Same vlog: helmet-cam close-up in the car (vlog 3400-3408s, section starts 3400s).
  @('cleetus-helmet-close', 'hd-vlog-33rock.mp4', 0.0, 8.0, 656, 0, 608, 1080),
  # Same vlog: the No. 33 RCR Chevrolet passing THE ROCK wall (vlog 3432-3436s), car ~40% across.
  @('cleetus33-track', 'hd-vlog-33rock.mp4', 32.0, 4.0, 464, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
