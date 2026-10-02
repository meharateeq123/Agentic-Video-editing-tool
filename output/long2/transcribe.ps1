$proj = 'D:\flick\output\long2'
Set-Location $proj
# The detached log is cp1252; whisper's tqdm bar writes '???' and dies with UnicodeEncodeError without it.
$env:PYTHONIOENCODING = 'utf-8'
$py = 'C:\Users\HASSnain computer\AppData\Local\Programs\Python\Python312\python.exe'
"START $(Get-Date -Format HH:mm:ss)"
& $py -m whisper "$proj\vo\long2.wav" --model base --language en --word_timestamps True --output_format json --output_dir "$proj\vo" --fp16 False --verbose False
"DONE exit=$LASTEXITCODE $(Get-Date -Format HH:mm:ss)"

