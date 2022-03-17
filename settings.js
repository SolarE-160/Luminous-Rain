// controls global settings for game, not meant to be changed by players

const settings = {
  // surprisingly, the performance is better *with* glow
  // disable if webgl no webgl
  glow: true,
  
  // true: stroke
  // false: two-shape
  //sts: false,
  
  // start time
  startTime: 0,
  
  // speed of the player
  speed: 250,
  
  // radius of hitbox circle of player
  hitboxRadius: 4,
  
  songRefreshRate: 1,
  
  flickerSmoothLen: 5,
}