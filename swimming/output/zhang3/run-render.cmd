@echo off
cd /d "D:\flick\swimming\output\zhang3"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\flick\swimming\output\zhang3\render.ps1" > "D:\flick\swimming\output\zhang3\render.log" 2>&1
