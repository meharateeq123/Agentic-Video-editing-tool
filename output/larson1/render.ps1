# Render driver for the Larson Southern 500 film (horizontal, 1920x1080, no 4K needed).
#
# Run detached from Claude Code — a full-film pass takes a while on this machine and a render tied
# to a parent shell loses everything when that shell dies. Two things make this survivable:
#   1. The film renders in 1500-frame chunks into parts/. A finished chunk is never redone, so
#      re-running this script resumes instead of restarting.
#   2. Chunks render MUTED. Real VO is now in (public/vo/tts-audio.wav, 309.40s) - the final audio
#      track is hook.mp4's own original sound for the cold open, followed by the VO for the rest of
#      the film, concatenated and muxed onto the concatenated video at the end. Audio never crosses
#      a chunk seam this way.

$ErrorActionPreference = 'Stop'

$proj   = 'D:\flick\output\larson1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$total = 9762
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

    # Chunks fail on this 8GB box when OffthreadVideo's frame cache is left uncapped - scenes that
    # seek repeatedly into the ~550s final-laps.mp4 starve the proxy server and it starts answering
    # 500s (this killed part04 twice at final-laps.mp4 t=119.4s, even though ffmpeg decodes that
    # exact timestamp fine). The 128MB cap is the setting hamlin1 rendered clean with. Retries also
    # step concurrency down, since two workers doubles the pressure.
    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    $ok = $false
    # Concurrency 1 from the start: on this film every chunk that touches a multi-source scene
    # (scene 11/12's repeated seeks into final-laps.mp4 and postrace-interviews.mp4) failed at
    # concurrency 2 with proxy 500s and only went through at 1. Starting at 2 just burns ~8 minutes
    # per chunk on a doomed attempt.
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

# `-auto_convert 0` is required. Without it the concat demuxer runs h264_mp4toannexb over
# Remotion's MP4 chunks, that filter chokes ("Invalid NAL unit size (0 > N)"), and ffmpeg stops
# partway through part01 while still exiting 0 - producing a 19-second "film" from 325s of parts.
# Always check the joined duration rather than trusting the exit code.
$videoOnly = Join-Path $proj 'video-only.mp4'
& $ff -y -loglevel error -f concat -safe 0 -auto_convert 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

# Audio: hook.mp4's real sound for the cold open, then the real VO for the rest of the film.
# Built with the concat *filter* (one re-encode) rather than the concat demuxer over two raw .aac
# files - that silently kept only the first input, leaving a 16s audio track. The hook is cut to
# exactly 16.0s (= HOOK_FRAMES / FPS) so the VO starts on the same frame scene 1 mounts on; the
# clip's own length is 16.003s, which would otherwise drift the whole VO a few ms late.
$fullAudio = Join-Path $proj 'full-audio.m4a'
& $ff -y -loglevel error -t 16.0 -i (Join-Path $rem 'public\hook.mp4') -i (Join-Path $rem 'public\vo\tts-audio.wav') `
    -filter_complex "[0:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a0];[1:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a1];[a0][a1]concat=n=2:v=0:a=1[out]" `
    -map "[out]" -c:a aac -b:a 192k $fullAudio
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED audio build'; exit 1 }

$final = Join-Path $proj 'final-film.mp4'
& $ff -y -loglevel error -i $videoOnly -i $fullAudio -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy -movflags +faststart $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

$dur = & ffprobe -v error -show_entries format=duration -of csv=p=0 $final
Write-Output "final duration: $dur s"

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
