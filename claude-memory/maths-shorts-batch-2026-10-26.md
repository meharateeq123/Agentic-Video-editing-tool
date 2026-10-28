---
name: maths-shorts-batch-2026-10-26
description: "The ten-short maths batch of 2026-10-26 (Collatz x2, Simpson, missing square, friendship, -1/12, potato, 1089, Braess, four-colour) and the VO-mapping check that batch forced."
metadata:
  node_type: memory
  type: project
  originSessionId: 965b55a1-c203-4287-bdb0-90beabfbb7a1
  modified: 2026-10-26T12:36:35.258Z
---

Ten standalone Shorts built 2026-10-25/26 in `D:\Animated Math\manimgl\shorts\`, each in a
title-named folder with its own scene file:

| folder (= title) | scene | hook |
| --- | --- | --- |
| This Simple Number Puzzle Has Stumped Mathematicians for Decades! | collatz_a.py | Collatz: the rule, 6 and 27 |
| The Math Trick That Makes a Losing Option Better! | simpson_s1.py | Simpson's paradox |
| This Picture Seems to Lose a Square! | square_s1.py | missing square |
| Why Does Everyone Think Their Friends Have More Friends | friend_s1.py | friendship paradox |
| Why Does 1 + 2 + 3 + 4 Keep Going Forever | sum_s1.py | the -1/12 claim |
| The Potato That Somehow Loses Almost All Its Weight! | potato_s1.py | potato paradox |
| Can You Predict the Future With Just Three Numbers | collatz_b.py | Collatz: testing is not proving |
| This Tiny Math Trick Always Gives You 1089! | trick_s1.py | the 1089 trick |
| Why Can a Traffic Jam Get Worse When You Add a Road | braess_s1.py | Braess's paradox |
| Can You Prove a Shape Is Impossible Just by Counting | four_s1.py | four-colour theorem |

Each computes its claim at import and asserts it, per [[maths-shorts-standalone-batch]]: 640 valid
1089 starts (not 648), the potato landing on exactly 50 kg, Simpson's reversal on the kidney-stone
counts, the missing-square pieces moving by *pure translation* (which is what makes "did the pieces
change size? no" literally true), the friendship paradox holding for 8 of 9 and not all 9, Braess
65 -> 80 with 80 checked to be the equilibrium, and the four-colour map's chromatic number found by
exhaustive search.

**The VO trap this batch produced.** The ten voice-overs came as a Drive folder of files named
`1`-`10` with no extension. Copying them into the ten title-named folders went wrong by one: folder
2 got VO 1, folder 3 got VO 2, and so on, folder 1 had no audio and VO 10 was never placed. Nothing
failed loudly — whisper happily aligned each short to the wrong narration, and the scenes imported
cue times that looked plausible. **Before aligning, ffprobe every source VO and every placed
`vo.wav` and print the two durations side by side.** A shifted list shows up instantly as each
folder carrying the previous row's duration. Re-copying means deleting the stale `words.json` too,
then re-running `_words.py`, then re-running `_check_short.py` on any scene already built against
the bad timings.

Related: [[shorts-no-dead-opening]], [[no-reedits-after-render]], [[maths-shorts-formulas-on-top]].
