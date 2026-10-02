# Motion Graphic Templates — Catalog

A starter catalog of 15 original motion graphics to build from in Step 3 (Remotion) whenever `auto-footage.mjs` reserves a scene as `RESERVED FOR MOTION GRAPHIC`, or the approved plan calls for one directly. This is scaffolding, not a locked template library — adapt copy, numbers, names, and colors to the exact narration line; never reuse one verbatim across unrelated scenes. Every entry must still pass [original-motion-graphics-rule.md](original-motion-graphics-rule.md)'s design requirements — this file exists to make "no overlap, everything inside the safe area" concrete per graphic, not to relax it.

## Global layout non-negotiables (every template below)

- **Safe area:** nothing — text, icon, bar, badge — ever touches the frame edge. Keep a margin of at least 6% of the shorter frame dimension on every side (≈65px at 1080×1920, ≈65px at 1920×1080).
- **No overlap, ever:** before finalizing a scene, check every element's bounding box against every other element's. If two would intersect at any animation frame (not just the resting frame), resize, reposition, or re-time them so they don't. A headline and a stat card, a badge and a chart axis label, a name and a rank number — none may cross.
- **One focal point per graphic:** exactly one primary number/headline should be the largest, boldest element. Supporting labels stay visibly smaller so the hierarchy is unambiguous at a glance.
- **Aspect-ratio aware:** every layout below is described for a tall 9:16 frame (stack vertically, generous top/bottom margin). For 16:9, the same elements typically spread horizontally instead of stacking — re-lay out, don't just shrink a 9:16 design into a wide frame with empty bars.
- **Color language:** green/emerald accents = positive templates, red/amber accents = negative templates, neutral blue/white/gray = graphs, rankings, and text templates unless the ranking or graph itself is inherently about a gain/loss (then borrow the positive/negative accent for just that element, e.g. a red down-arrow inside an otherwise neutral standings row).
- **Duration discipline:** match the narration line's duration exactly (see `auto-footage.mjs`'s per-scene timing) — animate in, hold long enough to read, animate out. Never leave a graphic frozen past its line or cut it before the entrance animation finishes.

---

## Positivity

### 1. Growth Arrow Surge
**Category:** Positive
**Pattern:** A thin green line/arrow draws itself from bottom-left to top-right across the frame's middle band. As it reaches its peak, a large bold number counts up beside the arrow's tip, with a small checkmark badge popping in beside it.
**Layout:** Arrow occupies the vertical-center band only, clear of top (title-safe) and bottom (caption-safe) margins. The counting number sits above the arrow's endpoint with enough clearance that the arrow never crosses under the text's bounding box.
**Use for:** A clear improvement, win, record, or upward statistic ("wins went up 40% this season").
**Avoid for:** A negative or flat/unclear trend — don't force this template onto a line that isn't genuinely a rise.

### 2. Milestone Badge Pop
**Category:** Positive
**Pattern:** A circular medal/star badge scales in at center with a soft glow, then a single bold headline stat appears beneath it once the badge settles (never simultaneously, to avoid a mid-animation overlap).
**Layout:** Badge centered in the upper-middle third; headline text centered directly below with a fixed gap ≥ the text's own line-height, so the two never touch even mid-scale-in.
**Use for:** A single achievement, milestone, or record broken ("his 50th career win").
**Avoid for:** A running statistic that needs to keep changing — use Growth Arrow Surge or Percentage Ring Counter instead.

### 3. Positive Comparison Split
**Category:** Positive
**Pattern:** Two vertical bars side by side — a dim, shorter "before" bar on the left and a taller, glowing green "after" bar on the right — grow up from a shared baseline. A "+N%" badge fades in above the right bar only once both bars finish growing.
**Layout:** Equal-width bars with a fixed gutter between them at least one bar-width wide, so the badge above the right bar has room to sit without overhanging the left bar's label.
**Use for:** Before/after or season-over-season improvement ("from 12th to 3rd in points").
**Avoid for:** More than two things being compared — use Animated Bar Race instead.

---

## Negativity

### 4. Decline Arrow Drop
**Category:** Negative
**Pattern:** Mirror of Growth Arrow Surge — a red line/arrow draws from top-left down to bottom-right, with a counting-down number and no checkmark (a small downward chevron instead).
**Layout:** Same vertical-center band rule as Growth Arrow Surge; number sits below the arrow's endpoint this time (since the arrow ends low), with the same clearance rule.
**Use for:** A clear drop, loss, or declining statistic ("finishes outside the top 10 have doubled").
**Avoid for:** A single bad event with no numeric trend — use Alert Flag Callout instead.

### 5. Alert Flag Callout
**Category:** Negative
**Pattern:** A small caution/flag icon snaps in at center with a brief hard shake, then a short bold headline (2-4 words, e.g. "DISQUALIFIED", "ENGINE FAILURE") fades in beneath it and holds.
**Layout:** Icon capped at ~15% of frame height so it can't visually collide with the headline below it even during the shake; headline width constrained to leave equal side margins.
**Use for:** A discrete negative event — penalty, incident, disqualification, failure.
**Avoid for:** A statistic or trend — this is for a single moment, not a number.

### 6. Negative Comparison Split
**Category:** Negative
**Pattern:** Mirror of Positive Comparison Split — left "before" bar taller/brighter, right "after" bar shorter and dimmer/red, with a "-N%" badge above the right bar.
**Layout:** Identical gutter/badge-clearance rule as its positive counterpart.
**Use for:** A worsening before/after comparison.
**Avoid for:** An improvement — use the positive version.

---

## Graphs

### 7. Animated Bar Race
**Category:** Graph
**Pattern:** 3-6 horizontal bars (one per named subject — driver, team, season) grow left-to-right from a shared left axis, in narration order, each stopping at its labeled value. Subject name sits to the left of its bar, value label at the bar's growing tip.
**Layout:** Bars stacked with even row height and consistent left-aligned name column width (measured against the longest name so no bar text ever overlaps a value label from another row). Cap at 6 bars in a 9:16 frame — beyond that, values get too cramped to read; split into two graphics instead.
**Use for:** Comparing 3+ named quantities the narration lists explicitly.
**Avoid for:** Just two values — use Positive/Negative Comparison Split, which reads cleaner for a pair.

### 8. Line Trend Chart
**Category:** Graph
**Pattern:** A single line draws itself left to right across a labeled timeline (races/weeks/seasons on the x-axis), with a highlighted dot and value callout at the final point.
**Layout:** X-axis labels sit in their own reserved bottom band, never underneath the line itself; the end-point callout box is positioned to whichever side (above/below the dot) keeps it fully inside the safe area, decided per scene based on where the line ends.
**Use for:** Performance across a season/timeline the narration references in sequence.
**Avoid for:** A single before/after comparison (two points) — that's simpler as a Comparison Split.

### 9. Percentage Ring Counter
**Category:** Graph
**Pattern:** A circular progress ring fills clockwise from 0 to the stated percentage while a large number counts up in the ring's center.
**Layout:** Ring diameter capped so its bounding box (plus any label placed beneath it) stays within the safe area with margin to spare; a one-line label sits below the ring with a fixed gap, never inside the ring competing with the number.
**Use for:** A single, standalone percentage statistic ("won 68% of races this season").
**Avoid for:** A trend over time — use Line Trend Chart.

---

## Rankings

### 10. Podium Reveal
**Category:** Ranking
**Pattern:** Three podium blocks (2nd, 1st, 3rd, left to right, 1st tallest and centered) rise from the bottom in sequence. Each carries a name label and rank number; the 1st-place block gets a gold accent, 2nd silver, 3rd bronze.
**Layout:** Fixed podium widths with a gutter between them at least as wide as a name label, so long names truncate gracefully (ellipsis) rather than spilling into the neighboring block.
**Use for:** A top-3 result — race finish, championship standings, top performers.
**Avoid for:** More than 3 ranked entries — use Vertical Standings List.

### 11. Vertical Standings List
**Category:** Ranking
**Pattern:** Numbered rows (rank, name, points/value) slide in from the side one at a time, top to bottom, each landing in its own fixed-height row.
**Layout:** Row height fixed and equal for every entry; cap visible rows at 6-8 in a 9:16 frame so no row is ever cramped or clipped — if the narration needs more than that, show the relevant subset (e.g. positions 4-8) rather than shrinking text to fit everyone.
**Use for:** A fuller leaderboard/standings beyond the top 3.
**Avoid for:** Just the top 3 — Podium Reveal is the stronger visual for that case.

### 12. Rank Change Ticker
**Category:** Ranking
**Pattern:** A single row shows one subject's rank moving — old position, an arrow (green up / red amber down), and the new position, with the delta ("+3" / "-2") animating alongside the arrow.
**Layout:** Old-position, arrow, and new-position sit in three fixed horizontal slots so the arrow's motion never drifts into the number slots on either side.
**Use for:** A single "moved up/down N positions" narration line.
**Avoid for:** A full standings change across many subjects — use Vertical Standings List instead, run twice (before/after) if needed.

---

## Text

### 13. Lower-Third Stat Card
**Category:** Text
**Pattern:** A small card slides in from the bottom-safe area with a short label and one bold supporting number/stat, staying on screen only for its narration line, then sliding back out.
**Layout:** Bottom-left or bottom-right (whichever side the current footage isn't using for other on-screen elements, per `footage-rules.md`/credit-card placement), sized to roughly a third of frame width, well clear of the bottom-safe margin.
**Use for:** A brief supporting stat while footage keeps playing behind it — the lightest-weight template in this catalog.
**Avoid for:** A statistic that needs to be the primary focus — use one of the Graph templates instead so it's not competing with the footage for attention.

### 14. Big Quote / Headline Text
**Category:** Text
**Pattern:** Large, bold, centered text scales in gently (no bounce/overshoot) over a subtly dimmed/blurred version of the current background, then holds and fades.
**Layout:** Text block width-constrained with generous side margins so even a longer quote wraps to 2-3 lines rather than shrinking below a readable size; vertical position centered but never touching top or bottom safe margins.
**Use for:** A single pivotal quote or a section-header line — used sparingly per the on-screen-text rule in `visual-relevancy-rules.md` (most scenes get none).
**Avoid for:** Routine narration — reserve for lines that are genuinely quotable or mark a clear section change.

### 15. Timeline Date Stamp
**Category:** Text
**Pattern:** A compact date/era label appears in a corner with a thin underline that draws itself beneath the text, then holds for the scene's duration.
**Layout:** Top-left or top-right corner, inside the safe margin, sized small enough that it never competes with a headline or badge that might also be on screen — if another template already occupies that corner, move this one to the opposite corner rather than stacking.
**Use for:** A date, season, or era reference the narration calls out ("Back in 2019...").
**Avoid for:** A duration or countdown — that reads better inline in a headline than as a static corner stamp.

---

## Variety rule — don't repeat a template within one project

Same principle as [clip-reuse-rule.md](clip-reuse-rule.md), applied to motion graphics — this covers **all five categories** (Positivity, Negativity, Graph, Ranking, Text), not just Graph: if a project needs the same category more than once for any reason (e.g. three separate Graph moments, two Positivity moments, two Ranking moments), do not build the same template each time — cycle to a different entry in that category before reusing one.

- Track which numbered template (1-15) each reserved scene in the current project has already used.
- When a new scene needs a template from a category that's been used before in this project, prefer a category entry not yet used in this project over one already used, as long as it still genuinely fits that scene's narration (never force a fit just for variety — see the priority order in `original-motion-graphics-rule.md`).
- Only repeat a template already used in this project if every other entry in its category has been used already, or none of them fit this specific scene's narration after a real check against their "Use for"/"Avoid for" — never as a default shortcut.
- This applies per project (one video), not across projects — a template that suits two different videos well is fine to use in both.
