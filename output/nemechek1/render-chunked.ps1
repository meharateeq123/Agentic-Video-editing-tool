# Chunked render — same shape as the Cleetus film's, for the same reason.
#
# This machine has 4GB of RAM. Rendering all 10777 frames in one process exhausts it, and
# Remotion reports that exhaustion as "No frame found at position N" against whichever clip it
# was decoding — which reads exactly like a corrupt source file and is not one. So render in
# frame ranges, one process per range, and re-splice.
#
# Video only (--muted); the voiceover sits at the composition root from frame 0, so muxing the
# whole WAV once at the end cannot drift.
#
# NOT $ErrorActionPreference='Stop': piping a native exe's stderr makes every yt-dlp/Remotion
# warning a terminating error, which skips the retry and kills the whole run on one bad chunk.
$ErrorActionPreference = 'Continue'
$nodeDir = "$env:USERPROFILE\tools\node-v24.20.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

$proj   = "D:\flick\output\nemechek1"
$rem    = "$proj\remotion"
$chunks = "$proj\.chunks"
$ffmpeg = "$rem\node_modules\ffmpeg-static\ffmpeg.exe"
$total  = 10777
$size   = 500

New-Item -ItemType Directory -Force -Path $chunks | Out-Null
Set-Location $rem

$parts = @()
$i = 0
for ($start = 0; $start -lt $total; $start += $size) {
  $end = [Math]::Min($start + $size - 1, $total - 1)
  $i++
  $out = "$chunks\part-{0:d2}.mp4" -f $i
  $parts += $out

  if (Test-Path $out) { Write-Output "skip  part-$i ($start-$end) already rendered"; continue }

  $done = $false
  foreach ($conc in @(2, 1, 1)) {
    Get-ChildItem "$env:TEMP" -Directory -Filter "remotion-*assets*" -ErrorAction SilentlyContinue |
      Remove-Item -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
    npx remotion render src/index.tsx final-film $out `
      --frames="$start-$end" --muted --gl angle --concurrency $conc `
      --hardware-acceleration=disable `
      --offthreadvideo-cache-size-in-bytes=134217728 2>&1 |
      Out-File "$env:TEMP\nem-chunk-$i.log" -Encoding utf8
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
    Write-Output "FAIL  part-$i ($start-$end) - see $env:TEMP\nem-chunk-$i.log"
    exit 1
  }
}

Write-Output "=== JOINING ==="
$list = "$chunks\parts.txt"
($parts | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File $list -Encoding ascii
& $ffmpeg -y -f concat -safe 0 -i $list -c copy "$chunks\video.mp4" 2>$null
& $ffmpeg -y -i "$chunks\video.mp4" -i "$rem\public\vo\tts-audio.wav" `
  -c:v copy -c:a aac -b:a 192k -shortest "$proj\nemechek-2027-silly-season.mp4" 2>$null

if (Test-Path "$proj\nemechek-2027-silly-season.mp4") {
  $f = Get-Item "$proj\nemechek-2027-silly-season.mp4"
  Write-Output ("DONE  {0}  {1} MB" -f $f.FullName, [math]::Round($f.Length / 1MB, 1))
} else {
  Write-Output "FAIL  join step produced no file"
  exit 1
}
