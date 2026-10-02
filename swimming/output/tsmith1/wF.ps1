$py = "C:\Users\HASSnain computer\AppData\Local\Programs\Python\Python312\python.exe"
Set-Location "D:\flick\swimming\output\tsmith1\dl"
Write-Output "DL cube-4k"; & $py -m yt_dlp "https://www.youtube.com/watch?v=IMuN37mVBkI" -f "bv*[vcodec^=avc1][height<=720]/bv*[height<=720]" --no-playlist --retries 15 --fragment-retries 15 -o "cube-4k.%(ext)s" --no-progress 2>&1 | Select-Object -Last 2
Write-Output "DL wa-beijing"; & $py -m yt_dlp "https://www.youtube.com/watch?v=4nB6hRq63v0" -f "bv*[vcodec^=avc1][height<=720]/bv*[height<=720]" --no-playlist --retries 15 --fragment-retries 15 -o "wa-beijing.%(ext)s" --no-progress 2>&1 | Select-Object -Last 2
Write-Output "DL tokyo-anthem"; & $py -m yt_dlp "https://www.youtube.com/watch?v=V7nIwVEHLuY" -f "bv*[vcodec^=avc1][height<=720]/bv*[height<=720]" --no-playlist --retries 15 --fragment-retries 15 -o "tokyo-anthem.%(ext)s" --no-progress 2>&1 | Select-Object -Last 2
Write-Output "DL pmb-drone"; & $py -m yt_dlp "https://www.youtube.com/watch?v=E7pThC1jxno" -f "bv*[vcodec^=avc1][height<=1080]/bv*[height<=1080]" --no-playlist --retries 15 --fragment-retries 15 -o "pmb-drone.%(ext)s" --no-progress 2>&1 | Select-Object -Last 2
Write-Output "DL nat-cube"; & $py -m yt_dlp "https://www.youtube.com/watch?v=7YyLwfTkL4I" -f "bv*[vcodec^=avc1][height<=720]/bv*[height<=720]" --no-playlist --retries 15 --fragment-retries 15 -o "nat-cube.%(ext)s" --no-progress 2>&1 | Select-Object -Last 2
Write-Output "ALL DONE"
