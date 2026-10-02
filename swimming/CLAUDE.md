# Swimming films

All swimming work lives here. When the user says "swimming", build in this folder — not in
`D:\flick\output`, which is the NASCAR/motorsport library.

```
D:\flick\swimming\
  vo\         <- user drops the voiceover .wav here
  scripts\    <- user drops the script here
  output\     <- one folder per film (e.g. output\swim1\)
  sources\    <- raw downloads kept out of remotion\public\ so they don't bloat the bundle
```

Each film goes in `output\<name>\` with the usual shape: `remotion\` (scaffolded by copying the
whole `remotion\` folder, node_modules included, from the most recent finished film), the raw
downloads in `sources\`, and the deliverable `<name>-final.mp4` at the film's root.

---

## The rules that carry over from the NASCAR films

These are the user's standing notes. They are not per-film preferences — they apply here too.

### 1. Default every line to NO text

Only add a graphic when there is something real to show: a real photo, a real number comparison, or
a direct quote from a real document. If a line is just narration, it plays over footage with nothing
on screen. In the last long film (`D:\flick\output\cleetus2`), **29 of 34 scenes carry no overlay at
all** — only 5 do: two photo cards, two comparison bar charts, and one quote card.

Do not narrate the voiceover back to the viewer in text. That is the "fazool texting" the user has
called out.

Shorts are the exception on captions only: shorts carry the CapCut-style per-word caption track,
long films carry none.

### 2. A motion graphic disappears ~1 second after its content finishes animating in

Never let a graphic sit on screen until the scene cuts. The `Win` tuple is `[in0, in1, out0, out1]`,
and the rule is encoded as:

```
out0 = (frame where the last element finishes animating) + 30    // 30fps -> 1.0s
out1 = out0 + 26
```

Worked examples from cleetus2, all obeying it exactly:

| Scene | Win | last animation ends | out0 | gap |
|---|---|---|---|---|
| 4 (photo card) | `[24, 54, 80, 106]` | 50 | 80 | 30f |
| 8 (bar chart) | `[24, 54, 200, 226]` | 170 | 200 | 30f |
| 10 (quote card) | `[24, 54, 126, 152]` | 96 | 126 | 30f |
| 32 (bar chart) | `[24, 54, 194, 220]` | 164 | 194 | 30f |

The user has flagged this twice. Check it before calling scenes done.

### 3. Image cards are boxes with a big picture, not thin strips

`components/PhotoCard.tsx` is the reference: the image gets roughly three quarters of the card's
height and the caption sits under it as a base. The user's exact correction was *don't make it a
strip ("aik patti"), make it a box, and let the image be big.*

For a named person over real footage, use the small ID-card form (190x190 photo left, name and role
right). Do not swap to a full-frame photo — that experiment was tried and reverted.

### 4. Map / globe animation: use the latest one, and keep it short

Use the newest implementation in the library — currently `components/Maps.tsx` and
`components/RealisticGlobe.tsx` (carried in `D:\flick\output\cleetus2\remotion\src\components\`).
A globe or map is a **5-7 second beat over real footage, never a whole scene.** Flagged on two films
already.

### 5. Real footage only, and never reused

No game/simulation footage, ever — real footage carries the film even when the subject is a game.
And a clip used in ANY earlier film is off-limits, not just the last two. Source fresh every time.

### 6. Never show the wrong person

Verify a named person's identity from evidence inside the frame before putting their name on screen.
If it cannot be confirmed, drop the footage or use a typographic plate over non-face footage instead
of guessing.

**This is the hard part in swimming.** Motorsport gives easy proof — car numbers, sponsor liveries,
firesuit patches, burned-in driver boxes. Swimmers in caps and goggles do not. The usable evidence is:

- the **lane number** on the block or the lane rope, cross-checked against a start list
- the **results/scoreboard graphic** the broadcast cuts to
- the broadcast's own **name lower-third**
- name and country on the cap or the back of the parka

If none of that is in frame, do not put a name card on it.

### 7. Other standing notes

- No single clip longer than 3 seconds in a short.
- Never stretch one clip across a long scene — cut to a second relevant clip.
- Cuts use real transitions (dip/whip/push/wipe), not plain hard cuts.
- A quote is a sharp, unblurred bottom-centre caption — not a full graphic that dims the clip.
- Grep every custom component for actual scene usage before calling scenes done; a component can
  sit in `components\` unwired and QC stills will not catch it.

---

## Pipeline

1. **Find the VO.** Check `D:\flick\swimming\vo\` first, then `%USERPROFILE%\Downloads\Music` —
   the user's TTS lands there under an ad-hoc name, so search by recency and duration, not filename.
2. **Transcribe and verify it matches the script before building anything:**
   ```
   python D:\flick\skills\flick\scripts\transcribe.py <wav> --output <json> --model base ^
     --ffmpeg D:\flick\output\shorts\gibbs1\remotion\node_modules\ffmpeg-static\ffmpeg.exe
   ```
3. **Build the timeline from the word timestamps**, snapped to the script's own sentence breaks.
4. **Source footage** with `python -m yt_dlp` (bare `yt-dlp` is not on PATH). Prefer official
   federation channels: World Aquatics, USA Swimming, national federations, and official meet
   uploads. Expect more geo-blocks and takedowns than motorsport — if a source will not download,
   say so rather than substituting something weaker without flagging it.
5. **QC every offset visually before committing it.** Extract frames with ffmpeg, look at them, and
   preview the true 9:16 window (`crop=<w*9/16>:<h>:<x>:0`) — not the full 16:9 frame.
6. **Pre-crop with ffmpeg when a subject is off-centre.** A 9:16 cover-fit only shows ~56% of a
   16:9 frame's width, so `offX` cannot move a subject far, and SceneBed's `minScale` compensation
   runs away into heavy zoom past roughly `|offX| = 15`. Bake the crop into a derived file instead.
   Pool footage is very wide, so expect to do this often.
7. **Render muted on GPU, then mux the VO:**
   ```
   npx remotion render src/index.tsx final-film out/<name>-video.mp4 --codec=h264 --crf=18 --muted --gl=angle
   ffmpeg -i video.mp4 -i vo.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k final.mp4
   ```

## Gotchas already paid for

- A recursive `Copy-Item` of a `remotion\` folder can silently corrupt files — `src\index.tsx` came
  out as whitespace and `node_modules\remotion\dist\cjs\v5-flag.js` as a syntax error. After
  scaffolding, check `index.tsx` is intact, and delete the duplicate `src\components\components\`
  folder the copy sometimes creates.
- PowerShell `(Get-Content -Raw) -replace ... | Set-Content -Encoding utf8` mangles em-dashes into
  mojibake. Use the Edit tool for source edits, not shell replace.
- Third-party uploads carry burned-in watermarks, "like and subscribe" end cards, and inserted
  graphics mid-clip. Contact-sheet the whole file (`-vf "fps=1/5,scale=130:-1,tile=6x5"`) before
  picking offsets.
- `SendUserFile` caps at 30 MiB. A long film will exceed it — give the local path instead.
