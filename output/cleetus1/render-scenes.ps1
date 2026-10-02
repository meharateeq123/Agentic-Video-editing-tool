# Individual scenes, named s1..s25, all in one folder (not a folder per scene).
#
# The scene compositions carry no audio — the voiceover lives at the root of final-film — so each
# rendered scene gets its own slice of the VO muxed in, cut at the same transcript timings the
# timeline uses. That makes every sN.mp4 watchable on its own instead of silent.
#
# Same two constraints as the film render: low concurrency (4GB of RAM) and no hardware encoder.

# NOT 'Stop': a native exe's stderr piped through 2>&1 becomes a terminating NativeCommandError
# under 'Stop', which would abort this whole loop on the first scene that hits a transient
# compositor hiccup instead of retrying it and moving on. See render-chunked.ps1 for the same
# fix — chunk 16 died there for exactly this reason, not because of a bad source file.
$ErrorActionPreference = 'Continue'
$nodeDir = "$env:USERPROFILE\tools\node-v24.20.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

$proj   = "D:\flick\output\cleetus1"
$rem    = "$proj\remotion"
$out    = "$proj\scenes"
$ffmpeg = "$rem\node_modules\ffmpeg-static\ffmpeg.exe"
$vo     = "$rem\public\vo\tts-audio.wav"

$ids = @(
  'hook-berlin-crash','what-we-break-down','berlin-raceway-michigan','qualified-18th',
  'the-spin-p19','right-rear-overheated','the-backlash','dale-jr-download',
  'earnhardts-argument','first-attempt-wreck','every-level','asked-then-punished',
  'seventy-five-lap-race','running-position-graph','no-crash-no-spin','the-real-story',
  'two-races-compared','racing-resume','rockingham-to-nashville','more-chances-not-fewer',
  'climb-to-daytona-500','not-a-finished-product','the-message','stacking-races',
  'road-to-daytona'
)

# Transcript cut points, seconds. Same numbers as src/timeline.ts.
$cuts = @(
  0,14.43,20.25,36.17,43.6,51.37,59.75,70.66,79.38,95.76,105.24,111.51,123.62,134.1,
  145.45,152.14,162.71,175.6,197.05,214.12,224.69,241.45,260.87,271.51,285.67,291.96
)

New-Item -ItemType Directory -Force -Path $out | Out-Null
Set-Location $rem

for ($n = 1; $n -le 25; $n++) {
  $final = "$out\s$n.mp4"
  if (Test-Path $final) { Write-Output "skip  s$n"; continue }

  $silent = "$out\.s$n-silent.mp4"
  $rendered = $false
  foreach ($conc in @(2, 1)) {
    Get-ChildItem "$env:TEMP" -Directory -Filter "remotion-*assets*" -ErrorAction SilentlyContinue |
      Remove-Item -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
    npx remotion render src/index.tsx $ids[$n - 1] $silent `
      --muted --gl angle --concurrency $conc --hardware-acceleration=disable `
      --offthreadvideo-cache-size-in-bytes=134217728 2>&1 |
      Out-File "$env:TEMP\scene-$n.log" -Encoding utf8
    if (Test-Path $silent) { $rendered = $true; break }
    Start-Sleep -Seconds 5
  }

  if (-not $rendered) {
    Write-Output "FAIL  s$n ($($ids[$n-1])) - see $env:TEMP\scene-$n.log"
    continue
  }

  $start = $cuts[$n - 1]
  $dur   = $cuts[$n] - $cuts[$n - 1]
  & $ffmpeg -y -i $silent -ss $start -t $dur -i $vo `
    -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest $final 2>$null

  Remove-Item $silent -Force -ErrorAction SilentlyContinue
  if (Test-Path $final) {
    Write-Output ("ok    s{0}  {1}  {2}s" -f $n, $ids[$n - 1], [math]::Round($dur, 2))
  } else {
    Write-Output "FAIL  s$n mux"
  }
}

Write-Output "=== SCENES ==="
Get-ChildItem "$out\s*.mp4" | Sort-Object { [int]($_.BaseName -replace 's', '') } |
  ForEach-Object { "{0}  {1} MB" -f $_.Name, [math]::Round($_.Length / 1MB, 1) }
