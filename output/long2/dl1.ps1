$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\long2\dl'
$fmt = 'bv*[height<=720][vcodec^=avc1]+ba/bv*[height<=720][vcodec^=avc1]/b[height<=720][vcodec^=avc1]'
$jobs = @(
  @{name='fox-post';    id='vXsRkQMVaWM'},
  @{name='nbc-gw';      id='ZMwqXq8N8fY'},
  @{name='blaney-dnf';  id='nLLJbPc6RU8'},
  @{name='finals-apr';  id='zI4fkzk1gIs'},
  @{name='bristol-best'; id='j4dcT5ibfAk'},
  @{name='bristol-top10'; id='rQAZC5G8YdY'},
  @{name='bristol-sun'; id='qDr01XWGb90'},
  @{name='hassler';     id='PECbi9PoOjw'},
  @{name='bristol-apr'; id='MQHry_BnlzY'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "HAVE $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    python -m yt_dlp -f $fmt --merge-output-format mp4 --retries 10 --fragment-retries 10 -o "$($j.name).%(ext)s" "https://youtube.com/watch?v=$($j.id)" 2>&1 | Where-Object { $_ -match 'ERROR|Merger' } | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
    Remove-Item "$($j.name).*.part" -Force -ErrorAction SilentlyContinue
    Start-Sleep 5
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
