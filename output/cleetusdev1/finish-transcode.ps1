# The first transcode pass skipped talladega-broadcast because an older uncropped copy of it was
# still sitting in the bed pool. That copy is gone now, so wait for the running pass to finish and
# then run the script again — the second pass sees the missing file and encodes it with the crop.
$ErrorActionPreference = 'Stop'

while (Get-Process -Id 10972 -ErrorAction SilentlyContinue) { Start-Sleep -Seconds 10 }

& powershell -NoProfile -ExecutionPolicy Bypass -File 'D:\flick\output\cleetusdev1\transcode-new.ps1'
