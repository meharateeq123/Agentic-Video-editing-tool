$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba[ext=m4a]/bv*[height<=1080][vcodec^=avc1]+ba'
$jobs = @(
  # FS1 broadcast of the 2023 North Wilkesboro All-Star heat races - the first Cup oval race on
  # Goodyear's wet-weather tires ("NASCAR has ordered the wet weather tires" ~1:06).
  @{name='wilkesboro23'; id='xa9B9hvtPmY'; sect='*0-720'},
  # NASCAR official, "Steve O'Donnell and Ben Kennedy Address NASCAR Leadership Changes" (2026-04-25).
  @{name='odonnell'; id='VCxh21Htv1c'; sect='*0-420'},
  # NASCAR official, "NASCAR Cup Series Highlights | 2026 Bristol Motor Speedway" (2026-04-12).
  @{name='bristol-cup26'; id='MQHry_BnlzY'; sect='*0-600'},
  # NASCAR official, "Craftsman Truck Series Highlights | 2026 Bristol Motor Speedway" (2026-09-18) -
  # Bristol under the lights, this same weekend.
  @{name='bristol-trucks'; id='Yvy2wHozPKI'; sect='*0-480'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "SKIP $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    & python -m yt_dlp -f $fmt --merge-output-format mp4 --download-sections $j.sect -o "$($j.name).%(ext)s" "https://youtube.com/watch?v=$($j.id)" 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
