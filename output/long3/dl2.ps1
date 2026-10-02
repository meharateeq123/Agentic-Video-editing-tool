$ErrorActionPreference = 'Continue'
Set-Location 'D:\flick\output\long3\dl'
$fmt = 'bv*[height<=720][vcodec^=avc1]+ba/bv*[height<=720][vcodec^=avc1]/b[height<=720][vcodec^=avc1]'
$jobs = @(
  @{name='atlanta25';  id='kteROVOO4nU'},
  @{name='blaney-title'; id='Xgzp70_jVRA'},
  @{name='gw-drivers'; id='st3dX3_-x10'},
  @{name='chase-preview'; id='e3i9zoBn77M'},
  @{name='bubba-wallace'; id='BExYaUUxQeM'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "HAVE $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    python -m yt_dlp -f $fmt --merge-output-format mp4 --write-auto-subs --sub-langs "en.*" --retries 10 --fragment-retries 10 -o "$($j.name).%(ext)s" "https://youtube.com/watch?v=$($j.id)" 2>&1 | Where-Object { $_ -match 'ERROR|Merger' } | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
    Remove-Item "$($j.name).*.part" -Force -ErrorAction SilentlyContinue
    Start-Sleep 5
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"

