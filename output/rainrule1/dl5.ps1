$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=1080][vcodec^=avc1]'
$jobs = @(
  @{name='wilkesboro23'; id='xa9B9hvtPmY'; sect='*55-160'},
  @{name='nhms-fox'; id='CIpJAMluGZk'; sect='*150-300'},
  @{name='odonnell'; id='VCxh21Htv1c'; sect='*0-300'},
  @{name='bristol-cup26'; id='MQHry_BnlzY'; sect='*0-600'},
  @{name='bristol-trucks'; id='Yvy2wHozPKI'; sect='*0-480'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "SKIP $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    & python -m yt_dlp -f $fmt --merge-output-format mp4 --download-sections $j.sect -o "$($j.name).%(ext)s" "https://youtube.com/watch?v=$($j.id)" 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
    Remove-Item "$($j.name).mp4.part" -Force -ErrorAction SilentlyContinue
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
