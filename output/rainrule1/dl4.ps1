$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
while (-not (Select-String -Path '..\dl3.log' -Pattern 'ALL DONE' -Quiet -ErrorAction SilentlyContinue)) { Start-Sleep 10 }
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=1080][vcodec^=avc1]'
# Motorsports on NBC, "NASCAR Cup Series 2026: Chase continues at WWTR | EXTENDED HIGHLIGHTS"
# (ZMwqXq8N8fY). gibbs3 used only 19:36-20:08 of it; every section here is clear of that.
$jobs = @(
  @{name='gw-blaney'; sect='*38-60'},     # 0:42 "Blaney in..."
  @{name='gw-bell'; sect='*155-180'},     # 2:40 "Southern 500 winner, Christopher Bell"
  @{name='gw-hamlin'; sect='*725-745'},   # 12:10 "DENNY HAMLIN SAYS"
  @{name='gw-larson'; sect='*1098-1125'}  # 18:22 "Keselowski and Larson door to door... Larson's coming on through"
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "SKIP $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    & python -m yt_dlp -f $fmt --merge-output-format mp4 --download-sections $j.sect -o "$($j.name).%(ext)s" 'https://youtube.com/watch?v=ZMwqXq8N8fY' 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
