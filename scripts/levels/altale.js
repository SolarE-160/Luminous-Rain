class Altale extends Stage {
  constructor() {
    super("Altale");
    this.tempo = 180;
    this.offset = 10;
    this.ts = 6;
    this.songPath = "songs/Altale.m4a";
    this.map = [];
    this.storyboard = true;
    Object.assign(this, level);
  }
  
  para1(t) {
    let x = t * 12;
    let y = (12 * t - 300)**2 / 300 + 50;
    return [x, y];
  }
  
  para2(a, h, r=12) {
    return t => [t * r, (r * t - 300)**2 / 300 * a + h];
  }
  
  para3(t) {
    let x = 600 * Math.sin((t - 57) / 24 / 3) * Math.cos((t - 57) / 24) + 300;
    let y = 400 * Math.sin((t - 57) / 24 / 3) * Math.sin((t - 57) / 24) + 50;
    return [x, y];
  }
  
  para4(t) {
    let x = 300;
    let y;
    if (t < 10) {
      y = 600 - t * 30;
    } else if (t < 60) {
      y = 300;
    } else if (t < 70) {
      y = 300 - (t - 60) * 15;
    } else {
      y = 150;
    }
    return [x, y];
  }
  
  buildMap() {
    this.map = [
      [
        //[1, this.flower(300, 200, 5, 4, 500)],
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
        [1, this.firework(86, 600, 86, 150, 4)],
        [2, this.firework(171, 600, 171, 100, 4)],
        [3, this.firework(257, 600, 257, 150, 4)],
        [4, this.firework(343, 600, 343, 100, 4)],
        [5, this.firework(429, 600, 429, 150, 4)],
        [6, this.firework(514, 600, 514, 100, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 160, 4)],
        [2, this.firework(171, 600, 171, 110, 4)],
        [3, this.firework(257, 600, 257, 160, 4)],
        [4, this.firework(343, 600, 343, 110, 4)],
        [5, this.firework(429, 600, 429, 160, 4)],
        [6, this.firework(514, 600, 514, 110, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 160, 4)],
        [2, this.firework(171, 600, 171, 110, 4)],
        [3, this.firework(257, 600, 257, 160, 4)],
        [4, this.firework(343, 600, 343, 110, 4)],
        [5, this.firework(429, 600, 429, 160, 4)],
        [6, this.firework(514, 600, 514, 110, 4)],
      ],
      [
        [1, this.firework(86, 600, 86, 170, 4)],
        [2, this.firework(171, 600, 171, 120, 4)],
        [3, this.firework(257, 600, 257, 170, 4)],
        [4, this.firework(343, 600, 343, 120, 4)],
        [5, this.firework(429, 600, 429, 160, 4)],
        [5, this.firework(300, 600, 300, 150, 15, 3, 0x8000ff)],
        [6, this.firework(514, 600, 514, 110, 4)],
      ],
      [
        [1, this.field(24, 10)],
        [4, this.trail(600, 100, 0, 50, 2)],
      ],
      [
        [4, this.trail(0, 150, 600, 50, 2)]
      ],
      [
        [4, this.trail(600, 350, 50, 0, 2)],
      ],
      [
        [4, this.trail(520, 0, 50, 600, 2)],
      ],
      [
        [1, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [2, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [3, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [4, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [5, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [6, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
      ],
      [
        [1, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [2, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [3, this.firework(0, 600, random(50, 550), random(50, 200), 3)],
        [4, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [5, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [5.5, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [6, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
        [6.5, this.firework(600, 600, random(50, 550), random(50, 200), 3)],
      ],
      [
        [1, this.trail(0, 150, 600, 100, 1, 8)],
        [4, this.trail(600, 300, 0, 50, 1, 8)],
      ],
      [
        [1, this.trail(50, 600, 250, 0, 1, 8)],
        [4, this.path(this.para1, true, true, 0, 8)]
      ],
      [
        [1, this.falling(100)],
        [1, this.falling(200)],
        [1, this.falling(300)],
        [1, this.falling(400)],
        [1, this.falling(500)],
        [2, this.firework(0, 80, 290, 80, 2)],
        [3, this.firework(600, 120, 340, 120, 2)],
        [4, this.falling(30)],
        [4, this.falling(130)],
        [4, this.falling(230)],
        [4, this.falling(330)],
        [4, this.falling(430)],
        [4, this.falling(530)],
        [5, this.firework(0, 130, 260, 130, 2)],
        [6, this.firework(600, 90, 300, 90, 2)],
      ],
      [
        [1, this.falling(80)],
        [1, this.falling(180)],
        [1, this.falling(280)],
        [1, this.falling(380)],
        [1, this.falling(480)],
        [1, this.falling(580)],
        [2, this.firework(0, 120, 280, 120, 2)],
        [3, this.firework(600, 160, 310, 160, 2)],
        [4, this.falling(10)],
        [4, this.falling(110)],
        [4, this.falling(210)],
        [4, this.falling(310)],
        [4, this.falling(410)],
        [4, this.falling(510)],
        [5, this.firework(0, 70, 330, 70, 2)],
        [6, this.firework(600, 20, 270, 20, 2)],
      ],
      [
        [1, this.falling(90)],
        [1, this.falling(190)],
        [1, this.falling(290)],
        [1, this.falling(390)],
        [1, this.falling(490)],
        [1, this.falling(590)],
        [2, this.firework(0, 140, 270, 140, 2)],
        [3, this.firework(600, 60, 290, 60, 2)],
        [4, this.falling(40)],
        [4, this.falling(140)],
        [4, this.falling(240)],
        [4, this.falling(340)],
        [4, this.falling(440)],
        [4, this.falling(540)],
        [5, this.firework(0, 100, 300, 100, 2)],
        [6, this.firework(600, 110, 260, 110, 2)],
      ],
      [
        [1, this.falling(20)],
        [1, this.falling(120)],
        [1, this.falling(220)],
        [1, this.falling(320)],
        [1, this.falling(420)],
        [1, this.falling(520)],
        [2, this.firework(0, 120, 240, 120, 2)],
        [3, this.firework(600, 150, 250, 150, 2)],
        [4, this.falling(100)],
        [4, this.falling(200)],
        [4, this.falling(300)],
        [4, this.falling(400)],
        [4, this.falling(500)],
        [5, this.firework(0, 30, 320, 30, 2)],
        [6, this.firework(600, 90, 280, 90, 2)],
      ],
      [
        [1, this.trail(0, 140, 600, 140, 3, 2, true, 0.03, 0, 0.2)],
        [2, this.firework(0, 150, 320, 150, 2)],
        [3, this.firework(600, 80, 310, 80, 2)],
        [4, this.trail(0, 120, 600, 120, 3, 2, true, 0.03, 0, 0.2)],
        [5, this.firework(0, 160, 260, 160, 2)],
        [6, this.firework(600, 70, 290, 70, 2)],
      ],
      [
        [2, this.trail(0, 160, 600, 160, 1, 6, true, 0.03, 0, 0.2)],
        [2, this.firework(0, 140, 290, 140, 2)],
        [3, this.trail(600, 150, 0, 150, 1, 6, true, 0.03, 0, 0.2)],
        [3, this.firework(600, 160, 280, 160, 2)],
        [4, this.trail(0, 80, 600, 80, 1, 6, true, 0.03, 0, 0.2)],
        [5, this.firework(0, 170, 340, 170, 2)],
        [6, this.firework(600, 60, 300, 60, 2)],
      ],
      [
        [1, this.trail(0, 140, 600, 140, 3, 2, true, 0.03, 0, 0.2)],
        [2, this.firework(0, 150, 320, 150, 2)],
        [3, this.firework(600, 80, 310, 80, 2)],
        [4, this.trail(600, 120, 0, 120, 3, 2, true, 0.03, 0, 0.2)],
        [5, this.firework(0, 160, 260, 160, 2)],
        [6, this.firework(600, 70, 290, 70, 2)],
      ],      
      [
        [1, this.trail(0, 140, 600, 140, 4, 3, true, 0.03, 0, 0.2)],
        [2, this.firework(0, 140, 290, 140, 2)],
        [2, this.firework(0, 150, 300, 150, 2)],
        [5, this.firework(0, 170, 340, 170, 2)],
        [6, this.firework(600, 60, 300, 60, 2)],
      ],
      [
        [1, this.flower(300, 100, 5, 3, 60)],
        [1, this.path(this.para2(0.4, 100), false, true, 2)],
        [4, this.path(this.para2(-0.4, 200), false, true, 2)],
      ],
      [
        [1, this.path(this.para2(0.1, 400), false, true, 4, 0, 4)]
      ],
      [
        [1, this.flower(300, 100, 5, 7, 60)],
        [1, this.path(this.para2(1, 100), false, true, 2)],
        [4, this.path(this.para2(0.6, 250), false, true, 2)],
      ],
      [
        [1, this.path(this.para2(2, 0, 6), false, true, 4, 0, 4)]
      ],
      [
        [1, this.field(24, 10)],
        [1, this.firework(150, 600, 150, 100, 6)],
        [4, this.firework(450, 600, 450, 100, 6)],
      ],
      [
        [1, this.firework(150, 600, 150, 100, 8)],
        [4, this.firework(450, 600, 450, 100, 8)],
      ],
      [
        [1, this.firework(300, 600, 300, 100, 12)],
        [4, this.trail(0, 0, 600, 600, 2, 5)]
      ],
      [
        [1, this.firework(300, 600, 300, 100, 12)],
        [4, this.trail(600, 0, 0, 600, 2, 5)]
      ],
      [
        [1, this.firework(300, 600, 300, 100, 16)],
        [1, this.path(this.para3, false, true, 4, 0, 4)],
      ],
      [
        [1, this.trail(0, 20, 600, 200, 2, 4, false, -0.1, 0, 0.2)],
        [1.5, this.trail(0, 50, 600, 230, 2, 4, false, -0.1, 0, 0.2)],
        [2, this.trail(30, 0, 600, 170, 2, 4, false, -0.1, 0, 0.2)],
        [2.5, this.trail(10, 0, 600, 190, 2, 4, false, -0.1, 0, 0.2)],
        [3, this.trail(0, 40, 600, 220, 2, 4, false, -0.1, 0, 0.2)],
        [3.5, this.trail(0, 0, 600, 180, 2, 4, false, -0.1, 0, 0.2)],
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
        [3, this.falling(360)],
        [3.67, this.falling(300)],
        [4, this.falling(240)],
        [6, this.falling(180)],
      ],
      [
        [1, this.falling(150)],
        [3, this.falling(300)],
        [4, this.falling(90)],
        [5, this.falling(165)],
        [5, this.firework(300, 600, 300, 100, 20, 3, 0xf0f076, random(0, Math.PI), -0.02)],
        [6, this.falling(240)],
      ], 
      [],
      [
        [1, this.firework(300, 0, 300, 100, 4)],
        [4, this.firework(150, 0, 150, 100, 4)],
      ],
      [
        [1, this.firework(450, 0, 450, 100, 4)],
        [4, this.firework(300, 0, 300, 100, 4)],
      ],
      [
        [1, this.firework(150, 0, 150, 100, 4)],
        [4, this.firework(450, 0, 450, 100, 4)],
      ],
      [
        [1, this.path(this.para4, false, false, 0, 4, 4, true, 120, 0, 0xf0f076, 7)],
      ],
      [
        [5, this.firework(300, 0, 150, 150, 6, 3, 0x8000ff)],
        [6, this.firework(300, 0, 300, 150, 8, 2, 0x8000ff)],
      ],
      [
        [1, this.field(24, 15, 3, 0xffffb8)],
        [1, this.firework(300, 0, 450, 150, 6, 1, 0x8000ff)],
        [1, this.flower(300, 150, 5, 4, 60, 0x8000ff, 3, false, 1.4)],
      ],
      
      [
        [1, this.firework(300, 600, 300, 100)],
        [2, this.falling(450)],
        [3, this.falling(300)],
        [3.67, this.falling(150)],
        [4, this.firework(300, 600, 150, 150, 4)],
        [4, this.firework(300, 600, 450, 150, 4)],
      ],
      [
        [1, this.firework(0, 300, 600, 300, 8)],
        [4, this.firework(600, 300, 0, 300, 8)],
      ],
      [
        [1, this.path(this.para3, false, true, 4, 0, 3)],
        [1, this.trail(600, 120, 0, 120, 1)],
        [4, this.trail(0, 120, 600, 120, 1)],
      ],
      [
        [1, this.firework(200, 600, 200, 150)],
        [4, this.firework(400, 600, 400, 150)],
        [6, this.trail(600, 250, 480, 100, 1)],
      ],
      [
        [1, this.flower(480, 100, 2, 3, 8, 0x8000ff, 2, false, Math.PI / 6)],
        [1.5, this.trail(600, 600, 360, 100, 1)],
        [2.5, this.flower(360, 100, 2, 3, 8, 0x8000ff, 2, false, Math.PI / 6)],
        [3, this.trail(0, 600, 240, 100, 1)],
        [4, this.flower(240, 100, 2, 3, 8, 0x8000ff, 2, false, Math.PI / 6)],
        [4.5, this.trail(0, 250, 120, 100, 1)],
        [5.5, this.flower(120, 100, 2, 3, 8, 0x8000ff, 2, false, Math.PI / 6)],
      ],
      [
        [1, this.firework(300, 600, 300, 100, 20)],
        [6, this.firework(0, 300, 100, 150, 8, 2, 0xffb8b8)],
      ],
      [
        [1, this.firework(600, 300, 500, 150, 8, 1, 0xffb8b8)],
        [1, this.field(24, 10, 2.5, 0xffffb8)],
        [3.67, this.firework(300, 600, 200, 100, 6, 0.67, 0xffb8b8)],
        [4, this.firework(300, 600, 400, 100, 6, 1, 0xffb8b8)]
      ],
      [
        [1, this.flower(300, 100, 1, 2, 30)],
        [5, this.falling(120)],
        [5.33, this.falling(240)],
        [5.67, this.falling(360)],
        [6, this.falling(480)],
      ],
      [
        [1, this.firework(300, 0, 300, 50, 15)],
        [4, this.trail(600, 250, 0, 150, 3)],
      ],
      [
        [1, this.flower(150, 50, 3, 1, 9, 0x8000ff, 1, false, Math.PI / 12)],
        [4, this.flower(450, 50, 3, 1, 9, 0x8000ff, 1, false, Math.PI / 12)],
      ],
      [
        [1, this.firework(300, 600, 450, 100)],
        [3.67, this.firework(300, 600, 150, 100, 6, 0.67)],
        [4, this.firework(300, 600, 450, 100, 6, 1)],
        [6, this.firework(120, 600, 120, 100, 10, 2)],
      ],
      [
        [1.5, this.firework(240, 600, 240, 100, 10, 2)],
        [3, this.firework(360, 600, 360, 100, 10, 2)],
        [4.5, this.firework(480, 600, 480, 100, 10, 2)],
        [6, this.firework(300, 600, 300, 100, 20, 2, 0xff0000)],
      ],
      [
        [1, this.trail(600, 150, 0, 50, 3, 4, true, 0.03, 0, 0, 0x8000ff)]
      ],
      [
        [1, this.firework(300, 0, 300, 100, 4, 1, 0xff00ff)]
      ],
      
      [
        [1, this.changeTempo(166)],
        //[1, this.changeTempo(90)],
        [1, this.falling(390)],
        [3, this.falling(315)],
        [3.67, this.falling(255)],
        [4, this.falling(465)],
        [6, this.falling(420)],
        [6.67, this.falling(480)]
      ],
      [
        [1, this.firework(150, 0, 150, 150, 4)],
        [1, this.falling(540)],
        [2, this.falling(495)],
        [3, this.falling(465)],
        [3.67, this.falling(435)],
        [4, this.falling(320)],
        [6, this.falling(285)],
      ],
      [
        [1, this.falling(195)],
        [1, this.firework(450, 0, 450, 150, 4)],
        [3, this.falling(240)],
        [4, this.falling(60)],
        [5, this.falling(225)],
        [6, this.falling(180)],
      ],
      [
        [1, this.firework(300, 0, 300, 150, 8)],
      ],
      [
        [1, this.firework(150, 0, 150, 150, 4)],
        [4, this.firework(450, 0, 450, 150, 4)],
      ],
      [
        [1, this.trail(0, 100, 600, 100, 2)],
        [4, this.trail(600, 150, 0, 150, 2)]
      ],
      [
        [1, this.firework(450, 0, 450, 150, 4)],
        [4, this.firework(150, 0, 150, 150, 4)],
      ],
      [
        [4, this.falling(150)],
        [4, this.firework(300, 600, 300, 150, 12, 4)],
        [5, this.falling(300)],
        [6, this.falling(450)],
      ],
      [],
      [
        [2, this.trail(0, 0, 600, 100, 2, 2, false, 0.02, 0, 0.2)],
        [2.25, this.trail(0, 20, 600, 130, 2, 2, false, 0.02, 0.2, 0.2)],
        [2.5, this.trail(0, 10, 600, 110, 2, 2, false, 0.02, 0.4, 0.2)],
        [2.5, this.firework(0, 30, 450, 100, 8, 11.8, 0xff8000, 0, -0.02)],
        [2.75, this.trail(30, 0, 600, 85, 2, 2, false, 0.02, -0.3, 0.2)],
        [3, this.trail(0, 50, 600, 150, 2, 2, false, 0.02, 0.6, 0.2)],
        [3.25, this.trail(10, 0, 600, 95, 2, 2, false, 0.02, -0.1, 0.2)],
        [3.5, this.trail(20, 0, 600, 90, 2, 2, false, 0.02, -0.4, 0.2)],
        [3.75, this.trail(0, 60, 600, 160, 2, 2, false, 0.02, 0.7, 0.2)],
        [4, this.trail(0, 20, 600, 120, 2, 2, false, 0.02, 0.1, 0.2)],
        [4.25, this.trail(0, 40, 600, 140, 2, 2, false, 0.02, -0.2, 0.2)],
        [4.5, this.trail(10, 0, 600, 95, 2, 2, false, 0.02, 0, 0.2)],
        [4.75, this.trail(50, 0, 600, 75, 2, 2, false, 0.02, -0.5, 0.2)],
      ]
    ];
    this.tempo = 180; //this has to be present for tempo changes to work!
  }
  
  buildStoryboard() {
    this.storyboard = [
      [
        [1, "backCol", [0x060612, this.getTime(6)]],
      ], [], [], [],
      [
        [4, "backCol", [0x0a0a26, this.getTime(3)]],
      ], [], [], 
      [
        [4, "backCol", [0x1e1e46, this.getTime(3)]],
      ], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
      [
        [1, "backCol", [0x964b19, this.getTime(24)]],
      ], [], [], [],
      [
        [1, "backCol", [0x50283c, this.getTime(24)]],
      ], [], [], [],
      [
        [1, "backCol", [0x0a0a26, this.getTime(12)]],
      ], [], [], [], [], [
        [1, "backCol", [0x1e1e46, 1]],
        [1.1, "backCol", [0x0a0a26, this.getTime(6)]],
      ], [], [], [], [], [
        [4, "backCol", [0x1e1e46, this.getTime(3)]],
      ], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [
        [1, "backCol", [0x0a0a26, this.getTime(6)]],
      ], [], [], [], [], [], [], [], [], [],
      [
        [1, "backCol", [0x060612, this.getTime(12)]],
      ],
      [],
      [
        [1.6, "backCol", [0x0a0a26, 2]],
        [1.9, "backCol", [0x060612, this.getTime(6)]],
      ]
    ];
    this.tempo = 180;
    return this.createStoryboard();
  }
}