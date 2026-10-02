// Per-scene beat lists. "SRC@m:ss" = a 3s cut of that source starting there; "IMG:name" = a photo beat.
// The generator (build-footage.mjs) bakes every beat once, asserts no two beats from the same source
// overlap, and writes footage.ts. Beat count per scene = ceil(mountedFrames / 90).
//
// Sources (all in ./dl):
//   P   paris-100br-inspires  (Paris 2024 women's 100 br final, Olympics Aquatics)
//   D3  paris-day3-hl         (Paris day-3 highlights)     D6  paris-day6-hl (day-6, 200 br final)
//   T2  tokyo-200br-full      (Tokyo 2020 200 br final)    T1  tokyo-100br-full (Tokyo 100 br final)
//   TA  tokyo-anthem          CG  teamsa-vanniekerk (Commonwealth 2022 100 br, board names both)
//   AQ  aquapark (Tatjana's own 2026 partner film)         SC  sc-champs-day1 (SA Short Course Champs 2026)
//   WR  wa-meilutyte-wr (Fukuoka 2023 50 br final)         EQ  wa-meilutyte-eq (Fukuoka semi, walk-outs)
//   LO  apr-london-2026 (Super 50 breaststroke)            BS  breast-slowmo   BP breast-pullout
//   ST  stell-4k   MA maties   PT pretoria-4k   PM pmb-cityhall   LS la-sunset   LD la-drone
//   WB  wa-beijing   EN enca-champs (cropped: ticker+logo removed)   KF koos-final
export const PLAN = {
  1: ['P@5:00', 'AQ@2:45', 'AQ@1:30', 'SC@8:04', 'AQ@2:30'],
  2: ['D6@7:38', 'P@3:44', 'P@4:44', 'P@4:56', 'T2@5:20', 'T2@7:04', 'TA@0:56', 'T1@10:04', 'AQ@0:33', 'P@6:40'],
  3: ['AQ@0:51', 'AQ@1:33', 'AQ@1:48', 'IMG:ladefense'],
  4: ['T2@9:28', 'TA@1:10', 'AQ@2:42', 'EN@27', 'PT@4:25', 'EN@42', 'SC@9:21', 'IMG:pretoria-skyline', 'CG@5', 'CG@11', 'T1@6:52', 'T2@2:48'],
  5: ['SC@5:30', 'AQ@0:03', 'PM@0:20', 'IMG:pmb-view', 'SC@10:50', 'IMG:pmb-cityhall'],
  6: ['T2@6:00', 'P@6:28', 'LO@1:48', 'LO@2:03'],
  7: ['LO@1:51', 'LO@2:06', 'LS@0:06', 'LD@0:44', 'IMG:la-coliseum', 'LD@1:28', 'IMG:la-torch', 'IMG:sofi'],
  8: ['BS@0:09', 'BP@0:00', 'BS@0:21', 'WR@4:24', 'BP@0:12', 'BS@0:45', 'LO@1:42'],
  9: ['SC@11:44', 'IMG:marathon', 'IMG:sprint100', 'AQ@2:06', 'AQ@2:18', 'AQ@1:03', 'AQ@0:24'],
  10: ['AQ@0:36', 'EQ@0:36', 'LO@1:45', 'WR@4:00', 'WR@4:08', 'IMG:meilutyte-kazan', 'AQ@2:09', 'T1@5:20', 'SC@6:47', 'AQ@2:54', 'SC@12:17'],
  11: ['BS@0:33', 'LO@2:09', 'BS@1:39', 'SC@12:39', 'BP@0:20', 'AQ@2:33', 'BS@2:42', 'LO@1:57', 'SC@7:53'],
  12: ['AQ@2:03', 'AQ@1:24', 'IMG:paris-swim-2024', 'AQ@2:21', 'P@6:20', 'AQ@2:36', 'IMG:table-mountain', 'AQ@1:21', 'AQ@0:27', 'AQ@2:27', 'AQ@1:06'],
  13: ['PT@0:50', 'ST@0:00', 'MA@0:30', 'ST@1:03', 'IMG:stellenbosch-uni', 'SC@10:38', 'SC@13:01', 'IMG:watercube-night', 'WB@0:43', 'IMG:beijing-skyline'],
  14: ['P@5:28', 'T2@9:36', 'AQ@2:00', 'TA@0:44', 'IMG:union-east', 'T1@10:12'],
  15: ['LD@2:23', 'LS@0:36', 'LD@3:29', 'LS@1:12', 'SC@6:36', 'LD@6:25', 'SC@8:37', 'LS@2:00', 'SC@9:43'],
  16: ['LO@1:09', 'LO@2:12', 'KF@0:00', 'CG@14', 'WR@0:24', 'EQ@0:48', 'WR@2:16', 'WR@2:48', 'IMG:meilutyte-portrait', 'WR@3:28', 'IMG:elendt'],
  17: ['LS@1:39', 'T1@10:00', 'LD@10:05', 'TA@1:14', 'LD@11:33', 'TA@0:50', 'LS@2:12', 'AQ@2:57', 'LD@1:39'],
  18: ['P@6:52', 'T2@7:20', 'SC@13:23', 'D3@6:18', 'LO@1:30', 'IMG:watercube', 'IMG:union-01', 'SC@11:00', 'T1@6:40'],
  19: ['TA@0:47', 'SC@11:22', 'IMG:stellenbosch-aerial', 'LS@0:24', 'D3@6:24'],
  20: ['AQ@2:24', 'LD@12:06', 'SC@12:50', 'IMG:simonsberg', 'LD@12:39'],
};

// how each source is baked. crop is an ffmpeg crop expr applied first (removes tickers / corner logos).
export const SRC = {
  P: {file: 'paris-100br-inspires.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  D3: {file: 'paris-day3-hl.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  D6: {file: 'paris-day6-hl.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  T2: {file: 'tokyo-200br-full.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  T1: {file: 'tokyo-100br-full.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  TA: {file: 'tokyo-anthem.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  CG: {file: 'teamsa-vanniekerk.mp4'},
  AQ: {file: 'aquapark.mp4'},
  SC: {file: 'sc-champs-day1.f136.mp4', crop: 'crop=iw:ih*0.91:0:0'},
  WR: {file: 'wa-meilutyte-wr.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  EQ: {file: 'wa-meilutyte-eq.mp4', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  LO: {file: 'apr-london-2026.mp4'},
  BS: {file: 'breast-slowmo.mp4'},
  BP: {file: 'breast-pullout.mp4'},
  ST: {file: 'stell-4k.mp4'},
  MA: {file: 'maties.mp4', crop: 'crop=iw*0.9:ih*0.9:iw*0.1:0'},
  PT: {file: 'pretoria-4k.mp4'},
  PM: {file: 'pmb-cityhall.mp4', crop: 'crop=iw*0.84:ih*0.86:0:ih*0.14'},
  LS: {file: 'la-sunset.mp4'},
  LD: {file: 'la-drone.mp4', crop: 'crop=iw*0.9:ih*0.9:0:0'},
  WB: {file: 'wa-beijing.mp4'},
  EN: {file: 'enca-champs.mp4', crop: 'crop=iw:ih*0.74:0:0'},
  KF: {file: 'koos-final.mp4'},
};


