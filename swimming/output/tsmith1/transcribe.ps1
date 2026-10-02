$proj = 'D:\flick\swimming\output\tsmith1'
Set-Location $proj
$env:PYTHONIOENCODING = 'utf-8'
$py = 'C:\Users\HASSnain computer\AppData\Local\Programs\Python\Python312\python.exe'
"START $(Get-Date -Format HH:mm:ss)"
& $py -m whisper "$proj\vo\vo.wav" --model small --language en --word_timestamps True --output_format json --output_dir "$proj\vo" --fp16 False --verbose False
"DONE exit=$LASTEXITCODE $(Get-Date -Format HH:mm:ss)"
