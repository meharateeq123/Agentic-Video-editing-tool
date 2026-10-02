# Fresh sources for rainrule1. h264/avc1 only (never AV1), no fps filter (NASCAR 1080p is 60fps-only).
$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
$jobs = @(
  # NASCAR official, "NASCAR Cup Series Highlights | 2026 New Hampshire Motor Speedway" (2026-08-23).
  # 0-10:00 holds the start on wets, SVG leading, the switch to slicks, and the booth explaining the
  # non-competitive stops on a damp pit road.
  @{name='nhms-official'; id='wlivkA5uxdo'; fmt='299+140'; sect='*0-600'},
  # NASCAR on FOX, "Dollar Tree 301 Highlights" (2026-08-23): "the new race leader... competition
  # caution... time to make a switch after starting this race on the wets" at 3:13-4:00.
  @{name='nhms-fox'; id='CIpJAMluGZk'; fmt='299+140'; sect='*150-300'},
  # NASCAR official, "NASCAR Radioactive | 2026 New Hampshire Motor Speedway" (2026-08-25) - real team
  # radio for the hook.
  @{name='nhms-radio'; id='-SpS9QwTfN4'; fmt='137+140'; sect=''}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "SKIP $($j.name) (exists)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    $args = @('-m','yt_dlp','-f',$j.fmt,'--merge-output-format','mp4','-o',"$($j.name).%(ext)s")
    if ($j.sect) { $args += @('--download-sections',$j.sect) }
    $args += "https://youtube.com/watch?v=$($j.id)"
    & python @args 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 3
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
