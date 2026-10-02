---
name: flick-no-av1-source
description: Never download/transcode AV1-codec source footage - it decodes and re-encodes far slower than h264 on this machine; always grab the h264 (avc1) format instead.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2e97caa6-3697-4fd1-9ecd-29ea5a4bf3bb
  modified: 2026-09-14T11:44:23.665Z
---

When sourcing footage with yt-dlp, check `yt-dlp -F <url>` and pick an h264/avc1 itag (e.g. 298/299/135/134) over an av1 itag (e.g. 398/399), even if it means a slightly larger file or a lower max resolution tier. AV1 source video takes dramatically longer to transcode into the project's bed-pool h264 - a 33-minute AV1 highlights reel stalled a build for 20+ minutes of active ffmpeg CPU time before the user flagged it, whereas the equivalent h264 (avc1) format from the same video downloads and transcodes in a fraction of that time.

**Why**: user explicitly said this was already flagged once before ("maine mana kiya tha last time AV1 format mein kuch na lao") - this is a repeat of a standing correction, not a new one. Caught again on the blaney1 (Ryan Blaney brake failure) film when `-f "bestvideo[height<=1080]+bestaudio/best"` silently picked an AV1 (itag 398/399) stream for a long highlights reel.

**How to apply**: default any yt-dlp video download to an explicit h264 itag rather than a generic `bestvideo` selector, especially for anything more than a couple of minutes long. If unsure which itags are h264, run `yt-dlp -F <url>` first and grep for `avc1`. Since bed-pool footage is always muted in this pipeline ([[flick-footage-pacing]]), a video-only h264 itag (no audio merge needed) is both simplest and fastest.
