// One-off generator for this film's plain (footage-only, no overlay) scenes.
import {writeFileSync} from 'node:fs';

const PLAIN = [
  [1, "Cleetus McFarland JUST Dropped a MASSIVE $300,000 Giveaway! (title, no card - the line itself is the hook)"],
  [2, "...brand-new heavy-duty truck. And $75,000 in cash... there's a catch most people will completely miss... the headline prize is only half the story."],
  [3, "The grand prize is not one item. It is four, and one winner takes all of them."],
  [9, "So where is the catch? Because there is one, and it is a big one."],
  [11, "Let that sink in. The Corvette and the truck are track machines. You could not legally drive them to work on Monday morning. The rules go further - handed over as is, no warranty, some parts preowned."],
  [12, "Now, does that make this a scam? Not even close. It actually fits Cleetus perfectly. You'd be winning a racing setup, not a daily driver."],
  [13, "So now that you know what the prize truly is, the next question is simple."],
  [14, "How do you get in?"],
  [15, "There are three ways to enter, and one of them costs you nothing."],
  [16, "The first way is an online purchase. Every five dollars at the Cleetus McFarland store earns one entry. Memberships count too."],
  [17, "The second way is buying something in person at a Cleetus McFarland or GForce Media event. Same math: five dollars, one entry."],
  [18, "The third way is the one a lot of people completely miss: enter free by mail. Each mailed entry counts as two, no limit, no purchase required."],
  [20, "The giveaway began August 7, 2026, and ends September 25 at 11:59pm Eastern. Mailed entries need to be postmarked by the 26th, in the mailbox by the 30th."],
  [21, "An independent company, Marden-Kane, runs the random drawing on or about October 2. The winner is announced on Cleetus McFarland's YouTube channel on or about October 23."],
  [22, "But before you start spending, there are two more things the highlight reels never mention."],
  [23, "The winner has to pick up the prize in person in Bradenton, Florida, within thirty days - with a valid license and proof of insurance."],
  [24, "The second is taxes. A $300,000 prize counts as taxable income - the real cost of winning is the tax bill, not the car."],
  [25, "One more warning: the rules include a scam alert. The real company only contacts a winner by the phone or email they entered with, and never asks for payment to claim a prize."],
  [26, "Now you know the prize, the catch, the entry, the deadline, and the fine print. But why does Cleetus keep dropping giveaways this massive?"],
  [27, "Every entry runs through his store, his memberships, or his streaming service. The giveaway is the engine that powers his entire business."],
  [28, "And this big one isn't even alone - a separate Ram 2500 giveaway, a side-by-side giveaway, and smaller daily prize drops are running at the same time."],
  [29, "Cleetus, real name Garrett Mitchell, built this from a single YouTube channel into live events, the Freedom Factory racetrack, a clothing store, and a streaming platform."],
  [30, "Which brings us to the exact question in the title. Is this his biggest giveaway ever?"],
  [31, "Based on his recent history, the answer is yes - and the climb is wild to watch."],
  [33, "So let's bring it home: Corvette ZR1, 2500HD truck, matching trailer, $75,000 cash - $300,000 total. Track-only, given as-is. Free entry by mail, closing September 25, winner drawn October 2."],
  [34, "If you won, would you keep that track-ready Corvette and race it, or sell it and pocket the cash? Drop your answer in the comments."],
];

for (const [n, line] of PLAIN) {
  const nn = String(n).padStart(2, '0');
  const src = `import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S${nn}_DUR = mountedFrames(${n});

/**
 * Scene ${n} - "${line.replace(/"/g, '\\"')}"
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene${nn}: React.FC = () => <BedChain segs={chain(${n})} dur={S${nn}_DUR} />;
`;
  writeFileSync(`remotion/src/scenes/Scene${nn}.tsx`, src);
}

console.log(`Wrote ${PLAIN.length} plain scene files.`);
