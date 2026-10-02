# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
# rp-* files are sections of NASCAR's official full race replay (TkeSuY3t6iY, 720p). The crop
# windows keep the leaderboard (left) and driver bug (bottom right) out of frame.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\blaney2'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # Blaney's bumper cam behind the No. 19 Toyota in the run before the failure (replay 1:57:50).
  @('blaney-onboard', 'rp-blaney.mp4', 5.0, 3.0, 520, 0, 405, 720),
  # Overhead of the No. 12 on pit road (replay 1:57:10).
  @('blaney-pit', 'rp-brakes.mp4', 15.0, 3.0, 470, 0, 405, 720),
  # Blaney's in-car camera straight after the failure. 50.2s is before the name bug appears.
  @('blaney-incar', 'rp-blaney.mp4', 50.2, 2.6, 400, 0, 405, 720),
  # The No. 12 on pit road with a brake glowing orange.
  @('blaney-brake-glow', 'rp-blaney.mp4', 187.1, 2.8, 450, 0, 405, 720),
  # The No. 12 sliding into the wall, front on. The cut from the bumper cam lands at 60.9s; the
  # tail runs into the whip pan at 62s, which only plays under the scene transition.
  @('blaney-wall', 'rp-blaney.mp4', 60.9, 1.4, 420, 0, 405, 720),
  # The damaged No. 12 at rest, after the driver lower-third has gone (75-76.8s).
  @('blaney-stopped', 'rp-blaney.mp4', 75.0, 1.8, 440, 0, 405, 720),
  # Second in-car angle, purple-lit, Blaney sitting in the stopped car.
  @('blaney-incar2', 'rp-blaney.mp4', 173.5, 2.5, 430, 0, 405, 720),
  # Blaney in the garage after climbing out (230-233s, no lower-third).
  @('blaney-garage', 'rp-blaney.mp4', 230.4, 2.6, 480, 0, 405, 720),
  # Front of the No. 12, static close-up (replay 1:58:26).
  @('blaney-front', 'rp-brakes.mp4', 81.2, 2.8, 440, 0, 405, 720),
  # Zane Smith's No. 38 against the wall with fire at the wheel; "Z. SMITH" on the roof rail.
  @('zane-fire', 'rp-zane.mp4', 5.0, 2.4, 430, 0, 405, 720),
  # Zane Smith out of the car with the safety team.
  @('zane-crew', 'rp-zane.mp4', 93.0, 2.5, 440, 0, 405, 720),
  # Chase Elliott's No. 9, name on the roof rail.
  @('elliott-car', 'rp-elliott.mp4', 130.2, 2.2, 400, 0, 405, 720),
  # Close-up of the No. 9's bare brake rotor on pit road. Only ~0.9s is clear before a crewman
  # steps in front of it.
  @('elliott-rotor', 'rp-elliott.mp4', 108.6, 0.9, 360, 0, 405, 720),
  # Hendrick crew working on the No. 9 on pit road.
  @('elliott-pit', 'rp-elliott.mp4', 136.2, 2.5, 440, 0, 405, 720)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
