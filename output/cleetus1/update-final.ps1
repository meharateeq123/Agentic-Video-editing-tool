# Patch the delivered final film after fixing scenes 1, 5, 13 and 20 (bad pool-13.mp4 content +
# caption track, and a burned-in Subscribe bug on scene 20's clip). Re-rendering all 8759 frames
# again would take ~45min on this machine; instead, re-render only the 500-frame chunks whose
# global frame range actually overlaps those four scenes (plus their transition bleed), and
# re-splice all 18 (the 11 untouched + these rebuilt). Frame ranges below come straight from
# src/timeline.ts CUTS: scene1 0-433f, scene5 1308-1541f, scene13 3709-4023f, scene20 6424-6741f
# (all *30fps, +/- the 16-frame transition OVERLAP) — each falls inside the chunk numbers listed.

$ErrorActionPreference = 'Continue'
$nodeDir = "$env:USERPROFILE\tools\node-v24.20.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

$proj   = "D:\flick\output\cleetus1"
$rem    = "$proj\remotion"
$chunks = "$proj\.chunks"
$ffmpeg = "$rem\node_modules\ffmpeg-static\ffmpeg.exe"
$size   = 500
$total  = 8759

# chunk index -> [start, end] frame range, 1-indexed chunk numbers matching part-NN naming.
$rebuild = @(4, 8, 9, 13, 14)

Set-Location $rem

foreach ($i in $rebuild) {
  $start = ($i - 1) * $size
  $end = [Math]::Min($start + $size - 1, $total - 1)
  $out = "$chunks\part-{0:d2}.mp4" -f $i
  Remove-Item $out -Force -ErrorAction SilentlyContinue

  $done = $false
  foreach ($conc in @(2, 1, 1)) {
    Get-ChildItem "$env:TEMP" -Directory -Filter "remotion-*assets*" -ErrorAction SilentlyContinue |
      Remove-Item -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
    npx remotion render src/index.tsx final-film $out `
      --frames="$start-$end" --muted --gl angle --concurrency $conc `
      --hardware-acceleration=disable `
      --offthreadvideo-cache-size-in-bytes=134217728 2>&1 |
      Out-File "$env:TEMP\rebuild-chunk-$i.log" -Encoding utf8
    if ((Test-Path $out) -and (Get-Item $out).Length -gt 0) {
      Write-Output "ok    part-$i ($start-$end) at concurrency $conc"
      $done = $true
      break
    }
    Write-Output "retry part-$i ($start-$end) failed at concurrency $conc"
    Remove-Item $out -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 5
  }
  if (-not $done) {
    Write-Output "FAIL  part-$i ($start-$end) - see $env:TEMP\rebuild-chunk-$i.log"
    exit 1
  }
}

Write-Output "=== JOINING ==="
$parts = 1..18 | ForEach-Object { "$chunks\part-{0:d2}.mp4" -f $_ }
$list = "$chunks\parts.txt"
($parts | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File $list -Encoding ascii
& $ffmpeg -y -f concat -safe 0 -i $list -c copy "$chunks\video.mp4" 2>$null
& $ffmpeg -y -i "$chunks\video.mp4" -i "$rem\public\vo\tts-audio.wav" `
  -c:v copy -c:a aac -b:a 192k -shortest "$proj\cleetus-dale-jr-final.mp4" 2>$null

if (Test-Path "$proj\cleetus-dale-jr-final.mp4") {
  $f = Get-Item "$proj\cleetus-dale-jr-final.mp4"
  Write-Output ("DONE  {0}  {1} MB" -f $f.FullName, [math]::Round($f.Length / 1MB, 1))
} else {
  Write-Output "FAIL  join step produced no file"
  exit 1
}
