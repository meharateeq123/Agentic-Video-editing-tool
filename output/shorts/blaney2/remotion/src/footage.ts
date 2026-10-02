/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film or short.
 * The long film output/blaney1 covered this same race from NASCAR's highlight reel (W1u734oeW1o),
 * Blaney's Frontstretch interview (nLLJbPc6RU8) and Jared Haas's Zane Smith in-car
 * (Ip5hd9I5LcU), so all three are off-limits here. Every bed below comes from a different
 * source: NASCAR's official full race replay, "NASCAR Cup Series Full Race Replay | 2026 World
 * Wide Technology Raceway" (TkeSuY3t6iY, 720p). The angles blaney1 used from the highlights
 * (Blaney's bumper cam at the failure, the wide shot of the hit, the frontstretch replay, and
 * Elliott's in-car and grandstand angles) are avoided.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *
 *   - blaney-onboard / blaney-incar / blaney-incar2 / blaney-wall / blaney-stopped
 *     blaney-brake-glow / blaney-garage   The No. 12 around the Lap 155 failure (replay 2:11-2:15).
 *   - blaney-pit / blaney-front   The No. 12 on pit road and in close-up (replay 1:57-1:58).
 *   - zane-fire / zane-crew   Zane Smith's No. 38 against the wall with fire at the wheel, then
 *     Smith out of the car ("Z. SMITH" on the roof rail) (replay 1:45).
 *   - elliott-car / elliott-rotor / elliott-pit   Chase Elliott's No. 9 on pit road after his
 *     Lap 214 failure ("CHASE ELLIOTT" on the roof rail) (replay 3:06).
 *
 * Facts on screen (NASCAR.com, Frontstretch): Blaney was running sixth when the right-front rotor
 * failed on Lap 155. Zane Smith's rotor failed at the end of Stage 2, Elliott's on Lap 214.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

export const BLANEY_ID = 'id/blaney-id.jpg';

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  // Blaney's bumper cam, running with the leaders.
  bed('blaney-onboard', 3.0, 0.3),
  // The No. 12 on pit road.
  bed('blaney-pit', 3.0, -0.3),
];

export const SCENE2_CUTS: Bed[] = [
  // In-car, on "Then, on Lap 155".
  bed('blaney-incar', 2.6, 0.3),
  // A brake glowing on the No. 12, on "brake rotor failed".
  bed('blaney-brake-glow', 2.8, -0.3),
  // Second in-car angle, on "sending debris through the hood".
  bed('blaney-incar2', 2.5, 0.3),
  // The No. 12 into the wall, on "into the wall".
  bed('blaney-wall', 1.4, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  // The damaged No. 12 at rest.
  bed('blaney-stopped', 1.8, 0.3),
  // Blaney in the garage.
  bed('blaney-garage', 2.6, -0.3),
];

export const SCENE4_CUTS: Bed[] = [
  // Zane Smith's No. 38 with fire at the wheel, on "Zane Smith".
  bed('zane-fire', 2.4, 0.3),
  // Chase Elliott's No. 9, on "Chase Elliott".
  bed('elliott-car', 2.2, -0.3),
  // The No. 9's bare rotor, on "brake failures".
  bed('elliott-rotor', 0.9, 0.3),
  // Smith out of the car with the safety team, on "during the race".
  bed('zane-crew', 2.5, -0.3),
];

export const SCENE5_CUTS: Bed[] = [
  // Hendrick crew on the No. 9.
  bed('elliott-pit', 2.5, 0.3),
  // The front of the No. 12.
  bed('blaney-front', 2.8, -0.3),
];
