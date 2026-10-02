# Thin launcher so the render can be started as a console-less detached process.
#
# Going through `cmd /c ... >> log` meant the spawned process shared a console with whatever
# started it, and a Ctrl+C / session teardown in that console killed the render mid-chunk (twice on
# larson1 - the log just ends in "^C"). Running render.ps1 from here instead, with PowerShell's own
# redirection, keeps cmd.exe out of the chain.
& 'D:\flick\output\larson1\render.ps1' *>> 'D:\flick\output\larson1\render.log'
