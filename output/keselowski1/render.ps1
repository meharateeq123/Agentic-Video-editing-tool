# Render driver for the Keselowski/Hocevar film - same crash-proof pattern as bell1/hamlin1/larson1.
$ErrorActionPreference = 'Stop'

$proj   = 'D:\flick\output\keselowski1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 11349
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
        if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp) -and (Get-Item $tmp).Length -gt 0) { $ok = $true; break }
        Write-Output "RETRY $name (exit $LASTEXITCODE) $(Get-Date -Format HH:mm:ss)"
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

# Audio: hook.mp4's real sound for the cold open, then the real VO for the rest of the film.
$fullAudio = Join-Path $proj 'full-audio.m4a'
& $ff -y -loglevel error -t 16.5165 -i (Join-Path $rem 'public\hook.mp4') -i (Join-Path $rem 'public\vo\tts-audio.wav') `
    -filter_complex "[0:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a0];[1:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a1];[a0][a1]concat=n=2:v=0:a=1[out]" `
    -map "[out]" -c:a aac -b:a 192k $fullAudio
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED audio build'; exit 1 }

$final = Join-Path $proj 'final-film.mp4'
& $ff -y -loglevel error -i $videoOnly -i $fullAudio -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy -movflags +faststart $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

$dur = & ffprobe -v error -show_entries format=duration -of csv=p=0 $final
Write-Output "final duration: $dur s"

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
