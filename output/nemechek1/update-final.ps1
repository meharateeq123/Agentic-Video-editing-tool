# Patch the delivered final film after adding scene 1's ID card and fixing scene 11's map
# (label overlap + country name). Re-render only the 500-frame chunks whose global frame range
# overlaps those two scenes, then re-splice all 22 chunks and re-mux the VO once.
#
# Scene 1: frames 0-344   -> chunk 1  (0-499)
# Scene 11: frames 3602-4209 -> chunks 8 (3500-3999) and 9 (4000-4499)

$ErrorActionPreference = 'Continue'
$nodeDir = "$env:USERPROFILE\tools\node-v24.20.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

$proj   = "D:\flick\output\nemechek1"
$rem    = "$proj\remotion"
$chunks = "$proj\.chunks"
$ffmpeg = "$rem\node_modules\ffmpeg-static\ffmpeg.exe"
$size   = 500
$total  = 10777

$rebuild = @(1, 8, 9)

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
      Out-File "$env:TEMP\nem-rebuild-$i.log" -Encoding utf8
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
    Write-Output "FAIL  part-$i ($start-$end) - see $env:TEMP\nem-rebuild-$i.log"
    exit 1
  }
}

Write-Output "=== JOINING ==="
$parts = 1..22 | ForEach-Object { "$chunks\part-{0:d2}.mp4" -f $_ }
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
