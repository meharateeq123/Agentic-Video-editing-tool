$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\rainrule1\dl'
while (-not (Test-Path 'bristol-cup26.mp4')) { Start-Sleep 10 }
Start-Sleep 5
foreach ($try in 1..4) {
  "GET bristol-trucks try $try $(Get-Date -Format HH:mm:ss)"
  & python -m yt_dlp -f 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=1080][vcodec^=avc1]' --merge-output-format mp4 --download-sections '*0-480' --retries 15 --fragment-retries 15 -o 'bristol-trucks.%(ext)s' 'https://youtube.com/watch?v=Yvy2wHozPKI' 2>&1 | Select-String 'Merger|ERROR|100%' | Select-Object -Last 2
  if (Test-Path 'bristol-trucks.mp4') { 'OK bristol-trucks'; break }
  Remove-Item 'bristol-trucks.mp4.part' -Force -ErrorAction SilentlyContinue
  Start-Sleep 5
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
