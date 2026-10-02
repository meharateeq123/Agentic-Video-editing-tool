# Bakes 9:16 bed clips (720x1280, 30fps, no audio) from downloaded sources.
# Each row: name, source (under dl\), start s, length s, crop x, crop y, crop w, crop h.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\logano3'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$rows = @(
  # NASCAR TODAY, "Kyle Larson Won the Enjoy Illinois 300 at Gateway After Two Overtimes!"
  # (PrvdDg9wibc, 2026-09-14, 1920x1080). No overlay graphics anywhere sampled.
  # Leading pack exiting a corner (54.5s) — reads as dominance/leading laps.
  @('lead-corner', 'larson-overtime-win.mp4', 54.5, 3.5, 600, 0, 608, 1080),
  # Joey Logano on the pit box beside crew chief Paul Wolfe (25.0s) — real team/strategy visual.
  @('logano-wolfe', 'larson-overtime-win.mp4', 25.0, 3.5, 250, 0, 608, 1080),
  # The checkered flag falling at the finish line (175.0s) — the "changed everything" payoff.
  @('checkered-flag', 'larson-overtime-win.mp4', 174.0, 4.0, 100, 0, 608, 1080),
  # NASCAR Nation News, "Joey Logano ADMITS BITTER Truth After Gateway Heartbreak!"
  # (LBMqIoGjvQA, 2026-09-15, 1280x720). Has a persistent small avatar bug (top-left, ~0-165x0-95)
  # and a lower banner (from y~645). Every crop below stays inside y 0-620 and x >=170 to avoid both.
  # Logano interview close-up, early in the video (3.0s).
  @('logano-open', 'logano-bitter-recap.mp4', 2.0, 3.5, 250, 0, 348, 620),
  # The real "bitter at the moment... they beat us" quote (70.0s).
  @('logano-bitter', 'logano-bitter-recap.mp4', 69.0, 3.2, 430, 0, 348, 620),
  # Logano and Paul Wolfe laughing together in the garage (105.0s).
  @('logano-team', 'logano-bitter-recap.mp4', 104.0, 3.2, 250, 0, 348, 620),
  # Interview close-up during the "51-point gap" narration (247.0s).
  @('logano-51pts', 'logano-bitter-recap.mp4', 246.0, 3.2, 300, 0, 348, 620),
  # HHLT Marketing & Drone Services, "IT'S BRISTOL, BABY! Epic 4K Drone Footage of Bristol Motor
  # Speedway" (RdXqEbiWGck, 2026-08-27, 1920x1080). Clean, no overlays.
  @('bristol-a', 'bristol-drone.mp4', 8.0, 3.2, 650, 0, 608, 1080),
  @('bristol-b', 'bristol-drone.mp4', 28.0, 2.6, 650, 0, 608, 1080)
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):$($r[4]):$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i "$proj\dl\$($r[1])" -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  "$($r[0]) exit $LASTEXITCODE"
}
