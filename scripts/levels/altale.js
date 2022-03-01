class Altale extends Stage {
  constructor() {
    super("Altale");
    this.tempo = 180;
    this.offset = -47;
    this.ts = 6;
    this.songPath = "Altale.m4a";
    this.map = [];
    this.storyboard = false;
    Object.assign(this, level);
  }
  
  buildMap() {
    this.map = [
      [
        [1, this.explode(300, 100, 4)],
        [4, this.explode(150, 100, 4)],
      ],
      [
        [1, this.explode(450, 100, 4)],
        [4, this.explode(300, 100, 4)],
      ],
      [
        [1, this.explode(150, 100, 4)],
        [4, this.explode(450, 100, 4)],
      ],
      [
        [1, this.explode(200, 150, 8, 4, 0, 0x8000ff)],
        [4, this.explode(400, 150, 8, 4, 0, 0x8000ff)],
        [6, this.falling(75)],
        [6.67, this.falling(105)],
      ],
      [
        [1, this.falling(180)],
        [3, this.falling(150)],
        [3.67, this.falling(90)],
        [4, this.falling(240)],
        [6, this.falling(210)],
        [6.67, this.falling(255)],
      ],
      [
        [1, this.falling(450)],
        [2, this.falling(405)],
        [3, this.falling(465)],
        [3.67, this.falling(510)],
        [4, this.falling(570)],
        [5, this.falling(360)],
        [5.67, this.falling(270)],
        [6, this.falling(180)],
        [6.67, this.falling(225)],
      ],
      [
        [1, this.falling(165)],
        [3, this.falling(300)],
        [3.67, this.falling(225)],
        [4, this.falling(120)],
        [5, this.falling(255)],
        [6, this.falling(345)],
      ], 
      [
        [1, this.firework(86, 600, 86, 100, 4)],
        [2, this.firework(171, 600, 171, 50, 4)],
        [3, this.firework(257, 600, 257, 100, 4)],
        [4, this.firework(343, 600, 343, 50, 4)],
        [5, this.firework(429, 600, 429, 100, 4)],
        [6, this.firework(514, 600, 514, 50, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 110, 4)],
        [2, this.firework(171, 600, 171, 60, 4)],
        [3, this.firework(257, 600, 257, 110, 4)],
        [4, this.firework(343, 600, 343, 60, 4)],
        [5, this.firework(429, 600, 429, 110, 4)],
        [6, this.firework(514, 600, 514, 60, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 120, 4)],
        [2, this.firework(171, 600, 171, 60, 4)],
        [3, this.firework(257, 600, 257, 110, 4)],
        [4, this.firework(343, 600, 343, 60, 4)],
        [5, this.firework(429, 600, 429, 110, 4)],
        [6, this.firework(514, 600, 514, 60, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 120, 4)],
        [2, this.firework(171, 600, 171, 70, 4)],
        [3, this.firework(257, 600, 257, 120, 4)],
        [4, this.firework(343, 600, 343, 70, 4)],
        [5, this.firework(429, 600, 429, 110, 4)],
        [5, this.firework(300, 600, 300, 100, 15, 3, 0x8000ff)],
        [6, this.firework(514, 600, 514, 60, 4)],
      ],
    ]
  }
}