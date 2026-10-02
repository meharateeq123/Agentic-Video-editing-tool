# Render driver for the Logano/Gateway pole film - same crash-proof chunked pattern as every
# earlier film in this series (bell1/hamlin1/larson1/keselowski1/cleetus2).
$ErrorActionPreference = 'Stop'

$proj   = 'D:\flick\output\logano1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 9829
$chunk = 1500
$idx = 0
$list = @()

for ($s = 0; $s -lt $total; $s += $chunk) {
    $idx++
    $e = [Math]::Min($s + $chunk - 1, $total - 1)
    $name = 'part{0:d2}.mp4' -f $idx
    $out = Join-Path $parts $name
    $list += $out

    if (Test-Path $out) {
        Write-Output "SKIP  $name (already rendered)"
        continue
    }

    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    $ok = $false
    foreach ($conc in @(1, 1, 1)) {
        Write-Output "START $name  frames $s-$e  concurrency $conc  $(Get-Date -Format HH:mm:ss)"
        Remove-Item $tmp -Force -ErrorAction SilentlyContinue
        npx remotion render $bundle final-film $tmp --codec=h264 --crf=18 --muted --frames="$s-$e" --gl=angle --concurrency=$conc --timeout=180000 --offthreadvideo-cache-size-in-bytes=134217728
        $exit = $LASTEXITCODE
        if ($exit -eq 0) {
            # File handle can lag behind process exit on Windows; give it a moment before trusting Test-Path.
            for ($i = 0; $i -lt 5; $i++) {
                if ((Test-Path $tmp) -and (Get-Item $tmp).Length -gt 0) { $ok = $true; break }
                Start-Sleep -Seconds 2
            }
            if ($ok) { break }
        }
        Write-Output "RETRY $name (exit $exit) $(Get-Date -Format HH:mm:ss)"
        Start-Sleep -Seconds 10
    }
    if (-not $ok) { Write-Output "FAILED $name after 3 tries"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "All chunks rendered. Joining..."

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only.mp4'
& $ff -y -loglevel error -f concat -safe 0 -auto_convert 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

# No cold-open hook this time - the VO plays from frame 0, so it's the whole audio track as-is.
$final = Join-Path $proj 'final-film.mp4'
& $ff -y -loglevel error -i $videoOnly -i (Join-Path $rem 'public\vo\tts-audio.wav') -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -movflags +faststart $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

$dur = & ffprobe -v error -show_entries format=duration -of csv=p=0 $final
Write-Output "final duration: $dur s"

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
