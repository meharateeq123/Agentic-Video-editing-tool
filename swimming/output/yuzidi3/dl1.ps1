$ErrorActionPreference = 'Continue'
New-Item -ItemType Directory -Force 'D:\flick\swimming\output\yuzidi3\sources' | Out-Null
Set-Location 'D:\flick\swimming\output\yuzidi3\sources'
$fmt = 'bv*[height<=1080][vcodec^=avc1]+ba/bv*[height<=720][vcodec^=avc1]+ba/b[height<=720][vcodec^=avc1]'
$jobs = @(
  @{name='mcintosh-wr';   id='zOWS_GBJue0'},
  @{name='sportstoday';   id='-NHp3dH_7HU'},
  @{name='cgtn-fly-gold'; id='vVSxM_edPCA'},
  @{name='cgtn-ag-pod';   id='Vb-ejWuzkEQ'},
  @{name='momentcn-200im'; id='_WeNEjIBTQE'},
  @{name='cgtn-ng-asianrec'; id='X6w2g-zX-EE'},
  @{name='yu-yeshiwen';   id='_9a0uym3eGM'}
)
foreach ($j in $jobs) {
  if (Test-Path "$($j.name).mp4") { "HAVE $($j.name)"; continue }
  foreach ($try in 1..3) {
    "GET $($j.name) try $try $(Get-Date -Format HH:mm:ss)"
    python -m yt_dlp -f $fmt --merge-output-format mp4 --retries 10 --fragment-retries 10 -o "$($j.name).%(ext)s" "https://youtube.com/watch?v=$($j.id)" 2>&1 | Where-Object { $_ -match 'ERROR|Merger' } | Select-Object -Last 2
    if (Test-Path "$($j.name).mp4") { "OK $($j.name)"; break }
    Remove-Item "$($j.name).*.part" -Force -ErrorAction SilentlyContinue
    Start-Sleep 4
  }
}
"ALL DONE $(Get-Date -Format HH:mm:ss)"
