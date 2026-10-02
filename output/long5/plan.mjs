// Per-scene beat lists for long5 ("Kyle Larson JUST Took Control of NASCAR - And Hamlin Is ONLY 1 Point Back!").
// "KEY@sec" = one beat that starts at that second of that source. Beats per scene = ceil(mounted/90): every
// beat holds the screen for at most 3s and no source range is ever used twice - also not by long3 / long4 (same
// Bristol race) or by the kansas1 / kansas2 / chase2 shorts (build-footage.mjs checks all of that).
export const SRC = {
  BR: {file: 'D:/flick/output/shorts/chase2/dl/battle1.mp4', grp: 'FjtMypEqYUc', note: 'Hamlin and Larson battle it out in Stage 1 (Bristol 2026)'},
  KH: {file: 'D:/flick/output/shorts/kansas2/dl/kh26.mp4', grp: 'M_N_08SXrzg', note: 'NASCAR Cup Series Highlights | 2026 Kansas Speedway'},
  NB: {file: 'D:/flick/output/shorts/kansas2/dl/nbc26.mp4', grp: 'wzbRzXYXPP8', note: 'NBC extended highlights, 2026 Kansas'},
  EL: {file: 'D:/flick/output/shorts/kansas2/dl/elec25.mp4', grp: 'x0KT12x40CY', note: 'ELECTRIC Playoff Finish at Kansas, 2025 extended highlights'},
  PH: {file: 'D:/flick/output/shorts/kansas2/dl/photo24.mp4', grp: '57BJ8QugJXc', note: '2024 Kansas extended highlights'},
  VG: {file: 'D:/flick/output/shorts/chase2/dl/vegas.mp4', grp: 'QiPbZV4zRpo', note: 'Cup Series Highlights | 2026 Las Vegas'},
  VF: {file: 'D:/flick/output/shorts/chase2/dl/vegasfl.mp4', grp: 'VYNROY3WGh0', note: 'FOX final laps, Hamlin wins Pennzoil 400 at Las Vegas'},
  CC: {file: 'D:/flick/output/shorts/chase2/dl/c600.mp4', grp: 'a_6CpnBk-uQ', note: '2026 Coca-Cola 600 highlights (Charlotte)'},
  HM: {file: 'D:/flick/output/shorts/kansas1/dl/hamlin23.mp4', grp: 'qRSUFLDXvRI', note: 'Hamlin overcomes Larson after last-lap pass at Kansas (2023)'},
  HLB: {file: 'D:/flick/output/long3/dl/nascar-hl.mp4', grp: '1iatULgMcRU', note: 'NASCAR Cup Series Highlights | 2026 Bristol'},
  NF: {file: 'D:/flick/output/long3/dl/nascar-finallaps.mp4', grp: 'B57DkzQPHSw', note: "Bristol's WILD Final Laps 2026"},
  ND: {file: 'D:/flick/output/long3/dl/nascar-drivers.mp4', grp: 'YEXOSSOhm9o', note: 'What Drivers Said After Bristol'},
  K24: {file: 'D:/flick/output/long5/dl/k24finish.mp4', grp: 'WSRUhTgZPQ0', note: 'Nose-to-Nose Finish Makes NASCAR History | 2024 Kansas Final Laps'},
  EM: {file: 'D:/flick/output/long5/dl/elliottrally.mp4', grp: 'hIdIcetNUcE', note: "Chase Elliott's Wild Rally & Reaction | 2025 Kansas"},
  NW: {file: 'D:/flick/output/long5/dl/nbcwhite.mp4', grp: 'Jk90RzOhGag', note: 'NBC: white-knuckle overtime finish, 2025 Kansas'},
  OT: {file: 'D:/flick/output/shorts/chase2/dl/ot26.mp4', grp: 'VTBqA77xDE4', note: 'Kansas Final Laps ERUPT in Overtime | 2026'},
  TH: {file: 'D:/flick/output/shorts/kansas1/dl/thriller25.mp4', grp: 'QzpujcBALvQ', note: 'Final Laps: Edge-of-Your-Seat THRILLER in Kansas | 2025'},
  T2: {file: 'D:/flick/output/shorts/kansas1/dl/ot2nd.mp4', grp: 'Lhda_Ro_poo', note: 'Final Laps: Watch the wild second overtime | Kansas Speedway'},
  NG: {file: 'D:/flick/output/long5/dl/nbcgateway.mp4', grp: 'ZMwqXq8N8fY', note: 'NBC extended highlights, 2026 WWT Raceway (Gateway)'},
};

// Ranges other films already used of these videos (seconds).
export const EXCL = {
  '1iatULgMcRU': [[19.8, 22.4], [27, 28.8], [30, 34.1], [40, 42.4], [54, 58.9], [66, 71.9], [129, 131.5], [568, 572.3], [833, 836.5], [845, 849.3], [850, 858.8], [875, 878.9], [893.5, 900.9], [908, 911.7], [1009, 1016.9], [1018, 1032.3], [1036, 1037.4], [1039, 1041.5], [1058, 1064.2], [1128, 1132.2], [1134, 1143.9], [1200, 1204.8], [1240.5, 1242.8], [1251, 1254.6], [1264, 1267.7], [1273, 1275.3], [1290, 1291.8], [1305, 1310.2], [1311.5, 1312.8], [1318, 1321], [1330, 1332.2], [1343, 1349.5], [1486, 1490], [1500, 1503], [700, 706], [730, 733.2], [760, 766], [780, 781.7], [800, 806.8], [820, 831.1], [840, 855.8], [870, 884.3], [890, 897], [900, 908.8], [910, 933.1]],
  B57DkzQPHSw: [[0, 1.7], [30, 35], [88, 91.7], [138, 144], [225, 226.9]],
  YEXOSSOhm9o: [[34.5, 37.3], [90, 95.4], [96.7, 107.2], [111.6, 115.4], [119, 121.4], [279, 282.3], [476.6, 481.7], [121.44, 133.4]],
  '57BJ8QugJXc': [[400, 402], [416, 418], [592, 594], [100, 102], [104.6, 106.6], [408, 410], [264, 266], [160, 162]],
  x0KT12x40CY: [[252, 254], [984, 986]],
  M_N_08SXrzg: [[1204, 1206], [1218, 1220], [1330, 1332]],
  wzbRzXYXPP8: [[415, 417], [486, 488], [864, 866]],
  QiPbZV4zRpo: [[16, 18], [232, 234]],
  'a_6CpnBk-uQ': [[304, 306], [1420, 1422], [100, 102], [311, 313], [1370, 1372], [1410, 1412]],
  FjtMypEqYUc: [[62.6, 64.6], [95, 97], [180, 182]],
  VYNROY3WGh0: [[444, 446], [492, 494], [404, 406]],
  qRSUFLDXvRI: [[28, 31], [32, 35], [86, 89]],
  VTBqA77xDE4: [[8, 10], [250, 252], [216, 218]],
  QzpujcBALvQ: [[40, 42.5], [125.5, 128.5], [19.5, 22.2], [130, 132.8]],
  Lhda_Ro_poo: [[25, 27.5], [13, 15.6], [28.2, 30.8]],
};

export const PLAN = {
  1: ['BR@112', 'BR@144', 'K24@103.5', 'K24@183', 'NW@117'],
  2: ['BR@160', 'KH@300'],
  3: ['BR@55', 'EL@300', 'NW@30', 'EL@560'],
  4: ['NW@21', 'EL@800', 'NW@39'],
  5: ['NG@60', 'HLB@160', 'NG@140', 'HLB@230', 'NG@210', 'HLB@300', 'NG@290'],
  6: ['NG@480', 'NG@1285', 'NG@1310', 'NG@1332', 'NG@1350', 'NG@1360'],
  7: ['NF@100', 'NF@118', 'NF@150', 'NF@178', 'NF@200', 'NF@232'],
  8: ['BR@25', 'BR@130', 'KH@1296', 'VF@410', 'VF@470', 'VG@500', 'HLB@500'],
  9: ['ND@214', 'ND@222', 'ND@229', 'ND@236', 'ND@246', 'ND@254'],
  10: ['ND@483', 'VF@330', 'ND@490', 'VF@250', 'VG@600', 'ND@498', 'VF@150', 'VF@60', 'ND@513', 'VG@700'],
  11: ['HM@4', 'HM@44', 'HM@64', 'HM@110'],
  12: ['EM@62', 'EM@70', 'NW@57', 'NW@60.5', 'EL@700'],
  13: ['K24@57', 'K24@128', 'K24@178', 'K24@312', 'K24@338', 'K24@30'],
  14: ['EM@124', 'NW@121.5', 'EM@183'],
  15: ['EM@216', 'EM@236', 'EM@252', 'EM@262', 'EM@330'],
  16: ['KH@1250', 'KH@1268', 'KH@1288', 'KH@1306', 'KH@1340', 'KH@1362'],
  17: ['VG@120', 'CC@200', 'VG@320', 'CC@500'],
  18: ['NG@640', 'NG@720', 'NG@780', 'NG@880', 'NG@930', 'NG@1000', 'HLB@380', 'HLB@545'],
  19: ['BR@70', 'BR@101', 'BR@120', 'BR@168'],
  20: ['HM@12', 'HM@96', 'T2@45', 'K24@148', 'OT@130', 'TH@100'],
  21: ['EL@1000', 'TH@150', 'EL@1240', 'OT@80', 'EM@100', 'T2@20'],
  22: ['EM@318', 'KH@1160', 'HM@118', 'PH@700', 'KH@600'],
};






