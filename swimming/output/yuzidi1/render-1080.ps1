# 1080p render driver for the Yu Zidi film.
#
# Launch DETACHED, never from a Claude/VS Code shell — a full ~7-minute film is hours of work on
# this 8GB machine, and a render tied to a parent shell dies with it:
#
#   Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
#     CommandLine = 'cmd.exe /c powershell -NoProfile -ExecutionPolicy Bypass -File D:\flick\swimming\output\yuzidi1\render-1080.ps1 >> D:\flick\swimming\output\yuzidi1\render.log 2>&1'
#   }
#
# Everything here is a lesson already paid for on earlier films:
#   - render from a pre-built bundle, not src/index.tsx, so public/ (1.2GB of bed footage) is not
#     re-copied into %TEMP% on every chunk — that copy is where renders died silently;
#   - 1500-frame chunks, each written to .tmp and renamed on success, so a re-run resumes;
#   - each chunk retries 3 times, stepping concurrency down (2, 1, 1) to ease memory pressure;
#   - --gl=angle (GPU compositing — the user wants it), no --hardware-acceleration (breaks --crf);
#   - --timeout=180000, because OffthreadVideo's first seek into a large bed passes the 28s default;
#   - OffthreadVideo cache capped at 128MB, because uncapped it starves this box and the proxy starts
#     answering 500s mid-chunk;
#   - chunks render MUTED and the one VO wav is muxed at the end, so audio never crosses a seam;
#   - concat with -auto_convert 0, since the default runs a bitstream filter that truncates the
#     join while still exiting 0;
#   - freezedetect on the finished film, because a chunk can "succeed" while painting one frame.

$ErrorActionPreference = 'Continue'

$proj   = 'D:\flick\swimming\output\yuzidi1'
$rem    = Join-Path $proj 'remotion'
$bundle = Join-Path $proj 'bundle'
$parts  = Join-Path $proj 'parts1080'
New-Item -ItemType Directory -Force $parts | Out-Null
Set-Location $rem

$ff = & node -e "process.stdout.write(require('ffmpeg-static'))"

# Total frames straight from the timeline, so a timeline change can never leave this stale.
$tl = Get-Content (Join-Path $rem 'src\timeline.ts') -Raw
$filmSeconds = [double]([regex]::Match($tl, 'FILM_SECONDS = ([\d.]+)').Groups[1].Value)
$total = [int][Math]::Round($filmSeconds * 30)
Write-Output "TOTAL $total frames ($filmSeconds s)  $(Get-Date -Format HH:mm:ss)"

Write-Output "BUNDLE start $(Get-Date -Format HH:mm:ss)"
npx remotion bundle src/index.tsx --out-dir="$bundle"
if ($LASTEXITCODE -ne 0) { Write-Output "FAILED bundle (exit $LASTEXITCODE)"; exit 1 }
Write-Output "BUNDLE done $(Get-Date -Format HH:mm:ss)"

$chunk = 1500
$idx = 0
$list = @()

for ($s = 0; $s -lt $total; $s += $chunk) {
    $idx++
    $e = [Math]::Min($s + $chunk - 1, $total - 1)
    $name = 'part{0:d2}.mp4' -f $idx
    $out = Join-Path $parts $name
    $list += $out

    if (Test-Path $out) { Write-Output "SKIP  $name (already rendered)"; continue }

    $tmp = Join-Path $parts ("{0}.tmp.mp4" -f $name)
    $ok = $false
    foreach ($conc in @(2, 1, 1)) {
        Write-Output "START $name frames $s-$e concurrency $conc  $(Get-Date -Format HH:mm:ss)"
        npx remotion render "$bundle" final-film "$tmp" --codec=h264 --crf=18 --muted --gl=angle `
            --frames="$s-$e" --concurrency=$conc --timeout=180000 `
            --offthreadvideo-cache-size-in-bytes=134217728
        if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) { $ok = $true; break }
        Write-Output "RETRY $name (exit $LASTEXITCODE)"
        if (Test-Path $tmp) { Remove-Item $tmp -Force }
    }
    if (-not $ok) { Write-Output "FAILED $name after 3 tries"; exit 1 }
    Move-Item $tmp $out -Force
    Write-Output "DONE  $name  $(Get-Date -Format HH:mm:ss)"
}

Write-Output "All chunks rendered. Joining..."

$listFile = Join-Path $parts 'list.txt'
($list | ForEach-Object { "file '" + ($_ -replace '\\', '/') + "'" }) | Out-File -Encoding ascii $listFile

$videoOnly = Join-Path $proj 'video-only.mp4'
$final     = Join-Path $proj 'yuzidi1-final.mp4'
$vo        = Join-Path $rem 'public\vo\yuzidi.wav'

& $ff -y -f concat -safe 0 -auto_convert 0 -i $listFile -c copy $videoOnly
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED concat'; exit 1 }

& $ff -y -i $videoOnly -i $vo -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -shortest $final
if ($LASTEXITCODE -ne 0) { Write-Output 'FAILED mux'; exit 1 }

# Exit codes are not proof. Check the joined length and look for frozen stretches.
$probe = & $ff -i $final -hide_banner 2>&1 | Select-String 'Duration'
Write-Output "PROBE $probe"
Write-Output 'FREEZE CHECK (any line below is a frozen stretch to re-render):'
& $ff -hide_banner -i $final -vf "freezedetect=n=-60dB:d=2" -map 0:v:0 -f null - 2>&1 | Select-String 'freeze_start|freeze_duration'

Write-Output "COMPLETE $final $(Get-Date -Format HH:mm:ss)"
