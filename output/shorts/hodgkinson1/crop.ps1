# Bakes 9:16 bed clips (720x1280, 30fps, no audio) for the Keely Hodgkinson injury/Athlos short.
# Row: name, source, start s, length s, crop x, crop y, crop w, crop h (all sources are 1280x720).
#
# Sources (fresh - none appears in an earlier short):
#   aw-injury-reveal.mp4  Athletics Weekly, "Keely Hodgkinson, after running 1:56.26 in Budapest,
#                         reveals she tore her hamstring during Europeans" (8R-SgVFZZ4M), 2026-09-12.
#                         Backstage at the Ultimate Championship, GB kit, her own words on the injury.
#   wa-d2-budapest.mp4    World Athletics, "Day 2 Extended Highlights - World Athletics Ultimate
#                         Championship" (1qZQ5akjdl4), 2026-09-13 - the women's 800m final. Hodgkinson
#                         is proven by the "GREAT..." bib next to Netherlands' Broeders-Bol at 320-327s.
#   flotrack-athlos.mp4   FloTrack, "Keely Hodgkinson Wins 800M in Style...2026 Athlos London"
#                         (GSMnaFA1ni0), 2026-09-18 - the ATHLOS LDN26 backdrop names the meet itself.
#                         This is AFTER she raced there (uploaded 09-18), not a preview - the script's
#                         "is now set for Athlos" is forward-looking language from before that date, so
#                         this bed is used only for the venue identification, not the result.
#   citius-injury.mp4     CITIUS MAG, "Keely Hodgkinson After Losing To Audrey Werro At World Ultimate
#                         Championships 800m, Reveals Injury" (Rh1PoNVspbU) - a SECOND, separate injury
#                         interview (different reporter, different backdrop angle), added so scene 2
#                         is not five cuts of the same aw-injury-reveal take back to back.
#
# `live` mode (see the loop below) keeps the clip's own sync audio - used once, for the real-voice
# payoff in scene 5, where the voiceover has already finished and her own words carry the line.
param([string[]]$Only)
$ErrorActionPreference = 'Continue'
$Only = @($Only | ForEach-Object { $_ -split ',' } | Where-Object { $_ })
$proj = 'D:\flick\output\shorts\hodgkinson1'
$ff = "$proj\remotion\node_modules\ffmpeg-static\ffmpeg.exe"
$AW = "$proj\dl\aw-injury-reveal.mp4"
$WA = "$proj\dl\wa-d2-budapest.mp4"
$FT = "$proj\dl\flotrack-athlos.mp4"
$CI = "$proj\dl\citius-injury.mp4"
$rows = @(
  # Scene 1 opens on her actually RUNNING the 800m final, not another beat of the interview - two
  # fresh, non-overlapping ranges of the same Budapest broadcast used for h3a/h3b (295.0-297.4s and
  # 323.3-324.3s), so nothing here repeats a range already used later in the film.
  @('h1a', $WA, 306.5, 2.2, 500, 0, 405, 720, 'cover'),
  @('h1b', $WA, 330.5, 2.2, 650, 0, 405, 720, 'cover'),
  @('h2a', $AW, 43.5, 2.6, 370, 0, 405, 720, 'cover'),
  @('h2b', $AW, 63.0, 2.6, 380, 0, 405, 720, 'cover'),
  @('h2c', $CI, 14.0, 2.6, 420, 0, 405, 720, 'cover'),
  @('h2d', $CI, 50.0, 2.6, 420, 0, 405, 720, 'cover'),
  @('h3a', $WA, 295.0, 2.4, 480, 0, 405, 720, 'cover'),
  # Hodgkinson (GB, blue kit) is the LEFT runner here, not the Dutch runner in orange - the crop
  # must stay on her, not drift onto Broeders-Bol.
  @('h3b', $WA, 323.3, 1.0, 40, 0, 405, 720, 'cover'),
  @('h3c', $FT, 1.0, 2.4, 330, 0, 405, 720, 'cover'),
  @('h3d', $FT, 21.0, 2.4, 330, 0, 405, 720, 'cover'),
  @('h4a', $AW, 150.0, 2.4, 380, 0, 405, 720, 'cover'),
  @('h4b', $FT, 55.0, 2.6, 330, 0, 405, 720, 'cover'),
  # THE REAL-VOICE PAYOFF. "I'm actually proud of my team and me and how we've handled it and come
  # back." - never speed-changed (SceneBed would pitch-shift her voice), so baked slightly longer
  # than the scene needs.
  @('h5', $AW, 24.6, 4.2, 380, 0, 405, 720, 'live')
)
foreach ($r in $rows) {
  if ($Only.Count -and ($Only -notcontains $r[0])) { continue }
  $out = "$proj\remotion\public\bed-pool\$($r[0]).mp4"
  $vf = "crop=$($r[6]):$($r[7]):x='$($r[4])':y=$($r[5]),scale=720:1280:flags=lanczos,fps=30"
  if ($r[8] -eq 'live') {
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 -c:a aac -b:a 192k -ar 48000 -ac 2 $out
  } else {
    & $ff -hide_banner -loglevel error -y -ss $r[2] -t $r[3] -i $r[1] -vf $vf -an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 $out
  }
  "$($r[0]) exit $LASTEXITCODE"
}
