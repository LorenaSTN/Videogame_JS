const emojis = {
  "-": " ",
  O: "🏠",
  X: "🌲",
  I: "🦴",
  PLAYER: "🐶",
  COLLISION: "💥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "🧡",
};

const maps = [];

maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  XX-XXXXXXX
  XX----XXXX
  XXXXX-XXXX
  XXXXX-XXXX
  XXXXX--XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX---IXXXX
`);
maps.push(`
  XXXX----XX
  XXXXIXX-XX
  XXX--XX-XX
  XXX-X---XX
  XXX--XXXXX
  XXXX---XXX
  XXX--X-XXX
  XXX-X--XXX
  XXX--XXXXX
  XXXX-OXXXX
`);
maps.push(`
  XXXX----XXXXX
  XXXXOXX-XXXXX
  XXXXXXX-XXXXX
  XXXX----XXXXX
  XX---XXXXXXXX
  XX-XXXXXXXXXX
  XX---XXXXXXXX
  XXXX--XXXXXXX
  XXX--XXXXXXXX
  XXXX----IXXXX
`);
