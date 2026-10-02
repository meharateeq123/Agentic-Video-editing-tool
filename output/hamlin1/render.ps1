# Render the Hamlin short at its native 1080x1920, mux the VO, then upscale to 4K vertical
# (2160x3840) — same safe two-step path used for the Nemechek film: native render first
# (validated in Studio at this resolution), then a resolution-only ffmpeg upscale rather than
# re-rendering Remotion at 4K, which would need Scene04's card font sizes rescaled by hand.

$ErrorActionPreference = 'Continue'
$nodeDir = "$env:USERPROFILE\tools\node-v24.20.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

$proj = "D:\flick\output\hamlin1"
$rem = "$proj\remotion"
$ffmpeg = "$rem\node_modules\ffmpeg-static\ffmpeg.exe"

Set-Location $rem

Get-ChildItem "$env:TEMP" -Directory -Filter "remotion-*assets*" -ErrorAction SilentlyContinue |
  Remove-Item -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue

$videoOut = "$proj\hamlin-2027-silly-season-1080.mp4"
Remove-Item $videoOut -Force -ErrorAction SilentlyContinue

$done = $false
foreach ($conc in @(2, 1, 1)) {
  npx remotion render src/index.tsx final-film $videoOut `
    --muted --gl angle --concurrency $conc `
    --hardware-acceleration=disable `
    --offthreadvideo-cache-size-in-bytes=134217728 2>&1 |
    Out-File "$env:TEMP\hamlin-render.log" -Encoding utf8
  if ((Test-Path $videoOut) -and (Get-Item $videoOut).Length -gt 0) {
    Write-Output "ok render at concurrency $conc"
    $done = $true
    break
  }
  Write-Output "retry failed at concurrency $conc"
  Remove-Item $videoOut -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 5
}
if (-not $done) {
  Write-Output "FAIL render - see $env:TEMP\hamlin-render.log"
  exit 1
}

$finalOut = "$proj\hamlin-2027-silly-season.mp4"
& $ffmpeg -y -i $videoOut -i "$rem\public\vo\tts-audio.wav" -c:v copy -c:a aac -b:a 192k -shortest $finalOut 2>$null

if (Test-Path $finalOut) {
  $f = Get-Item $finalOut
  Write-Output ("DONE 1080p  {0}  {1} MB" -f $f.FullName, [math]::Round($f.Length / 1MB, 1))
} else {
  Write-Output "FAIL mux step produced no file"
  exit 1
}

$4kOut = "$proj\hamlin-2027-silly-season-4K.mp4"
& $ffmpeg -y -i $finalOut -vf "scale=2160:3840:flags=lanczos" -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a copy $4kOut 2>$null

if (Test-Path $4kOut) {
  $f = Get-Item $4kOut
  Write-Output ("DONE 4K  {0}  {1} MB" -f $f.FullName, [math]::Round($f.Length / 1MB, 1))
} else {
  Write-Output "FAIL 4K upscale produced no file"
  exit 1
}
