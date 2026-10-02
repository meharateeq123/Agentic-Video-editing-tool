Set-Location "D:\flick\swimming\output\tsmith1\remotion"
$jobs = @(
 @('hook',60),@('hook',150),@('hook',300),@('hook',440),
 @('scene-02',60),@('scene-02',600),
 @('scene-05',260),@('scene-07',250),
 @('scene-10',380),@('scene-10',500),
 @('scene-13',200),@('scene-13',700),
 @('scene-16',230),@('scene-16',470),
 @('scene-17',400),@('scene-04',300)
)
foreach ($j in $jobs) {
  $out = "D:\flick\swimming\output\tsmith1\stills\$($j[0])_$($j[1]).png"
  if (Test-Path $out) { continue }
  Write-Output "STILL $($j[0]) $($j[1]) $(Get-Date -Format HH:mm:ss)"
  npx remotion still src/index.tsx $j[0] $out --frame=$($j[1]) --gl=angle --timeout=180000 2>&1 | Select-Object -Last 2
}
Write-Output "ALL STILLS DONE"
