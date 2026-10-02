/** Eddie Aikau film - 23 baked 3s beds, each used once. See ../../bake.mjs for the source of each. */

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

export type Link = Bed & {frames: number};

const P = (name: string) => `bed-pool/${name}.mp4`;

// One link = one baked 3s bed played from 0 for `frames` frames (span = the bed's real length, so a
// hold never outruns it). Every beat is its own file and is used exactly once.
const L = (file: string, frames: number, extra: Partial<Omit<Bed, 'src' | 'span'>> = {}): Link => ({
  src: P(file),
  startFrom: 0,
  frames,
  span: frames / 30,
  ...extra,
});

export const CHAINS: Record<number, Link[]> = {
  1: [L('b01', 65), L('b02', 64), L('b03', 64)],
  2: [L('b04', 89), L('b05', 88)],
  3: [L('b06', 52), L('b07', 51)],
  4: [L('b08', 76), L('b09', 75)],
  5: [L('b10', 71), L('b11', 71), L('b12', 70)],
  6: [L('b13', 86), L('b14', 86)],
  7: [L('b15', 79), L('b16', 78)],
  8: [L('b17', 67), L('b18', 66), L('b19', 66)],
  9: [L('b20', 71), L('b21', 71)],
  10: [L('b22', 53), L('b23', 53)],
};

export const chain = (n: number): Link[] => CHAINS[n];
