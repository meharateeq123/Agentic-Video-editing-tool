$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
# Wait for batch 2 to finish so two yt-dlp runs don't fight over bandwidth.
while (-not (Select-String -Path '..\dl2.log' -Pattern 'ALL DONE' -Quiet)) { Start-Sleep 10 }
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=1080][vcodec^=avc1]'
# NASCAR on FOX, Dollar Tree 301 highlights (2026-08-23) - "competition caution... time to make a
# switch after starting this race on the wets" at 3:13-4:00.
foreach ($try in 1..3) {
  "GET nhms-fox try $try $(Get-Date -Format HH:mm:ss)"
  & python -m yt_dlp -f $fmt --merge-output-format mp4 --download-sections '*150-300' -o 'nhms-fox.%(ext)s' 'https://youtube.com/watch?v=CIpJAMluGZk' 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
  if (Test-Path 'nhms-fox.mp4') { 'OK nhms-fox'; break }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
