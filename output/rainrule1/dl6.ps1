$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=1080][vcodec^=avc1]'
$jobs = @(
  @{name='gw-blaney'; sect='*38-60'},
  @{name='gw-bell'; sect='*155-180'},
  @{name='gw-hamlin'; sect='*725-745'},
  @{name='gw-larson'; sect='*1098-1125'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "SKIP $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    & python -m yt_dlp -f $fmt --merge-output-format mp4 --download-sections $j.sect -o "$($j.name).%(ext)s" 'https://youtube.com/watch?v=ZMwqXq8N8fY' 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
    Remove-Item "$($j.name).mp4.part" -Force -ErrorAction SilentlyContinue
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
