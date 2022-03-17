class Kronos extends Stage {
  constructor() {
    super("Kronos");
    this.tempo = 156;
    this.offset = 63;
    this.ts = 4;
    this.songPath = "songs/Kronos.mp3";
    this.map = [];
    //this.storyboard = true;
    Object.assign(this, level);
  }
  
  para1(x1, y1, x2, y2, beats) {
    return t => {
      let x = (1 - (1 - t / beats / 20)**2) * (x2 - x1) + x1;
      let y = (1 - (1 - t / beats / 20)**2) * (y2 - y1) + y1;
      return [x, y];
    }
  }
  
  para2(sx, sy, p=50, a=50, rot=0, speed=5, offset=0) {
    return t => {
      let x = t * speed;
      let y = a * Math.sin((t * speed - offset) / p);
      if (rot) {
        let tempX = x;
        x = x * Math.cos(rot) - y * Math.sin(rot);
        y = tempX * Math.sin(rot) + y * Math.cos(rot);
      }
      x += sx;
      y += sy;
      return [x, y];
    }
  }
  
  para3(cx, cy, r, angle, offset=0) {
    return t => {
      let x = cx + r * Math.cos(t / angle - offset);
      let y = cy + r * Math.sin(t / angle - offset);
      return [x, y];
    }
  }
  
  buildMap() {
    this.map = [
      [
        [1, this.field(24, 15)],
        [1, this.firework(300, 600, 300, 100)],
        [4, this.firework(300, 600, 200, 100)],
        [4.5, this.firework(300, 600, 400, 100)],
      ],
      [
        [1.5, this.falling(150, 2)],
        [2, this.falling(300, 2)],
        [2.5, this.falling(450, 2)],
        [3.5, this.falling(400, 2)],
        [4, this.falling(250, 2)],
        [4.5, this.falling(100, 2)],
      ],
      [
        [1, this.firework(300, 600, 300, 100)],
        [3, this.falling(100, 2)],
        [3.5, this.falling(500, 2)],
        [4, this.firework(300, 600, 200, 100)],
        [4.5, this.firework(300, 600, 400, 100)],
      ],
      [
        [1.5, this.falling(400, 2)],
        [2, this.falling(500, 2)],
        [2.5, this.falling(300, 2)],
        [3, this.falling(200, 2)],
        [3.5, this.falling(350, 2)],
        [4, this.falling(250, 2)],
        [4.5, this.falling(200, 2)],
      ],
      [
        [1, this.falling(100, 2)],
        [1, this.firework(300, 600, 300, 100)],
        [2, this.falling(530, 2)],
        [3, this.falling(460, 2)],
        [3.5, this.falling(340, 2)],
        [4, this.firework(300, 600, 200, 100)],
        [4.5, this.firework(300, 600, 400, 100)],
      ],
      [
        [1.5, this.falling(150, 2)],
        [2, this.falling(300)],
        [2.5, this.falling(450, 2)],
        [3.5, this.falling(400, 2)],
        [4, this.falling(250, 2)],
        [4.5, this.falling(100, 2)],
      ],
      [
        [1, this.firework(300, 600, 300, 100)],
        [1, this.falling(345, 2)],
        [1.5, this.falling(405, 2)],
        [2, this.falling(375, 2)],
        [2.5, this.falling(60, 2)],
        [3, this.falling(240, 2)],
        [3.5, this.falling(330, 2)],
        [4, this.falling(450, 2)],
        [4.5, this.falling(570, 2)],
      ],
      [],
      [
        [1, this.firework(300, 600, 300, 150, 8, 1, 0x8000ff)],
      ],
      [
        [1.5, this.falling(450)],
        [2, this.falling(150)],
        [2.5, this.falling(300)],
      ],
      [
        [1.5, this.firework(200, 0, 200, 100, 6, 0.5)],
        [1.75, this.firework(400, 0, 400, 100, 6, 0.25)]
      ],
      [
        [2.5, this.trail(600, 150, 0, 70, 1.5, 6)],
        [4, this.trail(0, 70, 130, 0, 1, 2)],
      ],
      [
        [1, this.firework(600, 600, 450, 100, 8)],
        [3.5, this.falling(460)],
        [4, this.falling(320)],
        [4.5, this.falling(180)],
      ],
      [
        [2.5, this.trail(0, 150, 600, 70, 1.5, 6)],
        [4, this.trail(600, 70, 470, 0, 1, 2)],
      ],
      [
        [1, this.firework(300, 0, 230, 80)],
        [1, this.firework(300, 0, 370, 80)],
        [4.5, this.firework(300, 0, 300, 80, 6, 0.5)],
      ],
      [
        [4.5, this.firework(150, 0, 150, 100, 5, 1.5)]
      ],
      [
        [1, this.firework(300, 0, 300, 100, 5, 1)],
        [1.5, this.firework(450, 0, 450, 100, 5, 0.5)],
      ],
      [
        [2.5, this.trail(0, 150, 400, 100, 2.5)],
      ],
      [
        [1, this.flower(400, 100, 2, 1, 20)],
        [3.5, this.falling(510)],
        [4, this.falling(410)],
        [4.5, this.falling(310)],
      ],
      [
        [4, this.firework(300, 0, 300, 200, 8, 2)],
      ],
      [
        [3.5, this.falling(410)],
        [4, this.falling(310)],
        [4.5, this.falling(210)],
      ],
      [],
      [
        [1, this.firework(200, 0, 150, 100, 5, 1)],
        [3, this.firework(300, 0, 300, 100, 5, 1)],
      ],
      [
        [1, this.firework(400, 0, 450, 100, 5, 1)],
      ],
      [
        [1, this.firework(0, 300, 600, 300, 16)],
        [3, this.firework(600, 300, 0, 300, 16)],
      ],
      [
        [2, this.falling(380)],
        [2.5, this.falling(300)],
        [3, this.falling(220)],
      ],
      [
        [1, this.firework(0, 100, 150, 100, 6, 1)],
        [1, this.firework(0, 100, 300, 100, 6, 2)],
        [1, this.firework(0, 100, 450, 100, 6, 3)],
        [4, this.falling(105)],
        [4.5, this.falling(165)],
      ],
      [
        [1, this.falling(240)],
        [2, this.falling(465)],
        [3, this.falling(375)],
        //[4.5, this.falling(190)],
      ],
      [
        [1, this.falling(50)],
        [1, this.firework(400, 0, 400, 100, 8)],
        [1.5, this.falling(50)],
        [2, this.falling(50)],
        [2.5, this.falling(50)],
        [3, this.falling(50)],
        [3, this.firework(400, 0, 400, 100, 8)],
        [3.5, this.falling(50)],
        [4, this.falling(50)],
        [4.5, this.falling(50)],
      ],
      [
        [1, this.falling(100)],
        [1, this.firework(400, 0, 400, 100, 8)],
        [1.5, this.falling(100)],
        [2, this.falling(100)],
        [2, this.falling(400)],
        [2.5, this.falling(100)],
        [3, this.falling(100)],
        [3, this.falling(300)],
        [3.5, this.falling(100)],
        [4, this.falling(100)],
        [4, this.falling(400)],
        [4.5, this.falling(100)],
      ],
      [
        [1, this.falling(150)],
        [1, this.falling(450)],
        [1.5, this.falling(150)],
        [2, this.falling(150)],
        [2.5, this.falling(150)],
        [2.5, this.falling(500)],
        [2.75, this.falling(533)],
        [3, this.falling(567)],
        [3, this.falling(150)],
        [3.5, this.falling(150)],
        [3.75, this.falling(460)],
        [4, this.falling(135)],
        [4.125, this.falling(120)],
        [4.25, this.falling(105)],
        [4.375, this.falling(90)],
        [4.5, this.falling(75)],
        [4.5, this.falling(400)],
        [4.625, this.falling(60)],
        [4.75, this.falling(45)],
        [4.875, this.falling(30)],
      ],
      [
        [1, this.falling(15)],
        [1, this.falling(500)],
        [2.5, this.path(this.para1(120, 600, 120, 50, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 240, 50, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 360, 50, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 480, 50, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.flower(120, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(240, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 6, 0.005, 3)],
        [1, this.flower(360, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(480, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 6, 0.005, 3)],
        [1, this.starfield(32, 30)],
        [2.5, this.path(this.para1(120, 600, 120, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 240, 150, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 360, 150, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 480, 150, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.flower(120, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(240, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(360, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(480, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [2.5, this.trail(0, 100, 450, 80, 2, 2, 0.005)],
        [4.5, this.flower(450, 80, 2, 1, 12, 0x8000ff, 1, false, 1.5, 0.005)],
      ],
      [
        [2.5, this.path(this.para1(120, 600, 300, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 300, 150, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 300, 150, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 300, 150, 1), false, false, 0, 4, 4, true, this.getTime(1))],
        [4.5, this.flower(300, 150, 4, 3, 22, 0xff8080, 2, false, 1.3, 0.005, 3)],
      ],
      [
        [1.5, this.falling(525, 1)],
        [2, this.falling(450, 1)],
        [2.5, this.falling(375, 1)],
        [3, this.falling(300, 1)],
        [3.5, this.falling(225, 1)],
        [4, this.falling(150, 1)],
        [4.5, this.falling(75, 1)],
      ],
      [
        [1, this.firework(300, 0, 300, 150, 10)],
        [3, this.falling(150)],
        [3.5, this.falling(300)],
        [4, this.falling(450)],
      ],
      [
        [1, this.firework(300, 0, 150, 100, 10)],
        [2.5, this.falling(370)],
        [2.75, this.falling(320)],
        [3, this.falling(380)],
        [3.5, this.falling(290)],
        [4, this.falling(240)],
        [4.5, this.firework(300, 0, 450, 100, 12)],
      ],
      [
        [4, this.firework(600, 50, 450, 90, 6, 0.5)],
        [4, this.firework(600, 50, 300, 130, 6, 1)],
        [4, this.firework(600, 50, 150, 170, 6, 1.5)],
      ],
      [
        [1.5, this.falling(200)],
        [2, this.falling(400)],
        [2.5, this.path(this.para1(120, 600, 120, 50, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 240, 50, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 360, 50, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 480, 50, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.flower(120, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(240, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 6, 0.005, 3)],
        [1, this.flower(360, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(480, 50, 3, 2, 6, 0xff8080, 1, false, Math.PI / 6, 0.005, 3)],
        [1, this.starfield(32, 30)],
        [2.5, this.path(this.para1(120, 600, 120, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 240, 150, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 360, 150, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 480, 150, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.flower(120, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(240, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(360, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [1, this.flower(480, 150, 5, 2, 5, 0xff8080, 1, false, Math.PI / 12, 0.005, 3)],
        [2.5, this.trail(0, 100, 450, 80, 2, 2, 0.005)],
        [4.5, this.flower(450, 80, 2, 1, 12, 0x8000ff, 1, false, 1.5, 0.005)],
      ],
      [
        [2.5, this.path(this.para1(120, 600, 300, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 300, 150, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 300, 150, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 300, 150, 1), false, false, 0, 4, 4, true, this.getTime(1))],
        [4.5, this.flower(300, 150, 4, 3, 22, 0xff8080, 2, false, 1.3, 0.005, 3)],
      ],
      [
        [1.5, this.falling(525, 1)],
        [2, this.falling(450, 1)],
        [2.5, this.falling(375, 1)],
        [3, this.falling(300, 1)],
        [3.5, this.falling(225, 1)],
        [4, this.falling(150, 1)],
        [4.5, this.falling(75, 1)],
      ],
      [
        [1, this.firework(300, 0, 300, 100, 8)],
        [3, this.falling(100, 1)],
        [3.5, this.falling(200, 1)],
        [4, this.path(this.para1(300, 0, 300, 50, 1), false, false, 0, 4, 4, true, this.getTime(1))],
        [4.25, this.path(this.para1(300, 0, 300, 100, 0.75), false, false, 0, 4, 4, true, this.getTime(0.75))],
        [4.5, this.path(this.para1(300, 0, 300, 150, 0.5), false, false, 0, 4, 4, true, this.getTime(0.5))],
        [4.75, this.path(this.para1(300, 0, 300, 200, 0.25), false, false, 0, 4, 4, true, this.getTime(0.25))],
      ],
      [
        [1, this.flower(300, 50, 1, 2, 12, 0xff8080, 2, true, 1.2, 0.005, 3)],
        [1, this.flower(300, 100, 1, 2, 12, 0xff8080, 2, true, 2.2, 0.005, 3)],
        [1, this.flower(300, 150, 1, 2, 12, 0xff8080, 2, true, 1.2, 0.005, 3)],
        [1, this.flower(300, 200, 1, 2, 12, 0xff8080, 2, true, 2.2, 0.005, 3)],
        [4, this.firework(100, 0, 100, 80, 3, 1)],
        [4, this.firework(100, 0, 100, 160, 3, 1.25)],
        [4, this.firework(100, 0, 100, 240, 3, 1.5)],
        [4, this.firework(500, 0, 500, 80, 3, 1)],
        [4, this.firework(500, 0, 500, 160, 3, 1.25)],
        [4, this.firework(500, 0, 500, 240, 3, 1.5)],
      ],
      [
        [1, this.path(this.para2(0, 50, 50, 50, Math.PI / 6, 6), false, true, 4)],
      ],
      [],
      [
        [1, this.firework(300, 600, 300, 100)],
        [2, this.falling(525)],
        [3, this.falling(450)],
        [3.5, this.falling(330)],
        [4, this.falling(90)],
        [4.5, this.falling(210)],
      ],
      [
        [1, this.firework(300, 600, 180, 100, 7)],
        [1.5, this.falling(30)],
        [2, this.falling(105)],
        [2.5, this.falling(375)],
        [3.5, this.falling(285)],
        [4, this.falling(210)],
        [4.5, this.falling(150)],
      ],
      [
        [1, this.firework(300, 600, 480, 100, 8)],
        [2, this.falling(525)],
        [3, this.falling(450)],
        [3.5, this.falling(330)],
        [4, this.falling(90)],
        [4.5, this.falling(210)],
      ],
      [
        [1, this.firework(300, 600, 420, 100, 9)],
        [1.5, this.falling(30)],
        [2, this.falling(105)],
        [2.5, this.falling(375)],
        [3.5, this.falling(285)],
        [4, this.falling(210)],
        [4.5, this.falling(150)],
      ],
      [
        [1, this.firework(300, 600, 240, 100, 10)],
        [2, this.falling(525)],
        [3, this.falling(450)],
        [3.5, this.falling(330)],
        [4, this.falling(90)],
        [4.5, this.falling(210)],
      ],
      [
        [1, this.firework(300, 600, 180, 100, 11)],
        [1.5, this.falling(30)],
        [2, this.falling(105)],
        [2.5, this.falling(375)],
        [3.5, this.falling(285)],
        [4, this.falling(210)],
        [4.5, this.falling(150)],
      ],
      [
        [1, this.firework(300, 600, 450, 100, 12)],
        [2, this.falling(525)],
        [3, this.falling(450)],
        [3.5, this.falling(330)],
        [4, this.falling(90)],
        [4.5, this.falling(210)],
      ],
      [
        [1, this.firework(300, 600, 150, 100, 13)],
        [1.5, this.falling(30)],
        [2, this.falling(105)],
        [2.5, this.falling(375)],
        [3.5, this.falling(285)],
        [4, this.falling(210)],
        [4.5, this.falling(150)],
      ],
      [
        [1, this.spiral(300, 150, 4, 1, 28, 0x8000ff, true)],
        [1, this.firework(300, 0, 300, 150)],
        //[1, [this.add.bullet(200, 100, 0, 0, 4, this.getTime(4), 0, 0xff0000, true, this.getTime(28))]],
        [2, this.falling(570)],
        [3, this.falling(495)],
        [3.5, this.falling(375)],
        [4, this.falling(285)],
        [4.5, this.falling(165)],
      ],
      [
        [1.5, this.falling(405)],
        [2, this.falling(255)],
        [2.5, this.falling(360)],
        [4.5, this.falling(285)],
        [4.75, this.falling(405)],
      ],
      [
        [1, this.falling(525)],
        [3.5, this.falling(480)],
        [4, this.falling(435)],
        [4.5, this.falling(390)],
      ],
      [
        [2.5, this.falling(30)],
        [4, this.falling(90)],
      ],
      [
        [1, this.falling(390)],
        [3.5, this.falling(585)],
        [4, this.falling(525)],
        [4.5, this.falling(465)],
      ],
      [
        [2.5, this.falling(330)],
        [4.5, this.falling(405)],
      ],
      [
        [1, this.falling(240)],
        [4, this.falling(180)],
      ],
      [
        [1.5, this.firework(300, 0, 300, 150, 6, 0.5)],
        [4.5, this.firework(450, 600, 450, 150, 6, 1.5)],
      ],
      [
        [1, this.firework(300, 600, 300, 150, 6, 1)],
        [1.5, this.firework(150, 600, 150, 150, 6, 0.5)],
      ],
      [
        [2.5, this.trail(0, 150, 400, 100, 2.5)],
      ],
      [
        [1, this.flower(400, 100, 2, 1, 20)],
        [3.5, this.falling(510)],
        [4, this.falling(410)],
        [4.5, this.falling(310)],
      ],
      [
        [4, this.firework(300, 0, 300, 200, 8, 2)],
      ],
      [
        [3.5, this.falling(410)],
        [4, this.falling(310)],
        [4.5, this.falling(210)],
      ],
      [],
      [
        [1, this.firework(200, 0, 150, 100, 5, 1)],
        [3, this.firework(300, 0, 300, 100, 5, 1)],
      ],
      [
        [1, this.firework(400, 0, 450, 100, 5, 1)],
      ],
      [
        [1, this.firework(0, 300, 600, 300, 16)],
        [3, this.firework(600, 300, 0, 300, 16)],
      ],
      [
        [2, this.falling(380)],
        [2.5, this.falling(300)],
        [3, this.falling(220)],
      ],
      [
        [1, this.firework(0, 100, 150, 100, 6, 1)],
        [1, this.firework(0, 100, 300, 100, 6, 2)],
        [1, this.firework(0, 100, 450, 100, 6, 3)],
        [4, this.falling(105)],
        [4.5, this.falling(165)],
      ],
      [
        [1, this.falling(240)],
        [2, this.falling(465)],
        [3, this.falling(375)],
        //[4.5, this.falling(190)],
      ],
      [
        [1, this.falling(50)],
        [1, this.firework(400, 0, 400, 100, 8)],
        [1.5, this.falling(50)],
        [2, this.falling(50)],
        [2.5, this.falling(50)],
        [3, this.falling(50)],
        [3, this.firework(400, 0, 400, 100, 8)],
        [3.5, this.falling(50)],
        [4, this.falling(50)],
        [4.5, this.falling(50)],
      ],
      [
        [1, this.falling(100)],
        [1, this.firework(400, 0, 400, 100, 8)],
        [1.5, this.falling(100)],
        [2, this.falling(100)],
        [2, this.falling(400)],
        [2.5, this.falling(100)],
        [3, this.falling(100)],
        [3, this.falling(300)],
        [3.5, this.falling(100)],
        [4, this.falling(100)],
        [4, this.falling(400)],
        [4.5, this.falling(100)],
      ],
      [
        [1, this.falling(150)],
        [1, this.falling(450)],
        [1.5, this.falling(150)],
        [2, this.falling(150)],
        [2.5, this.falling(150)],
        [2.5, this.falling(500)],
        [2.75, this.falling(533)],
        [3, this.falling(567)],
        [3, this.falling(150)],
        [3.5, this.falling(150)],
        [3.75, this.falling(460)],
        [4, this.falling(135)],
        [4.125, this.falling(120)],
        [4.25, this.falling(105)],
        [4.375, this.falling(90)],
        [4.5, this.falling(75)],
        [4.5, this.falling(400)],
        [4.625, this.falling(60)],
        [4.75, this.falling(45)],
        [4.875, this.falling(30)],
      ],
      [
        [1, this.falling(15)],
        [1, this.falling(500)],
        [2.5, this.path(this.para1(120, 600, 300, 200, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 300, 200, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 300, 200, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 300, 200, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.spiral(300, 200, 6, 1.2, 32, 0x8000ff, 10)],
        [1, this.flower(300, 200, 3, 2, 24, 0xff8080, 3, false, 0.4, 0)],
        [2.5, this.falling(120)],
        [3, this.falling(240)],
        [3.5, this.falling(360)],
        [4, this.falling(480)],
      ],
      [
        [1, this.firework(300, 0, 150, 100)],
        [1, this.firework(300, 0, 450, 100)],
        [2.5, this.trail(0, 100, 600, 80, 2, 3)],
      ],
      [
        [1, this.firework(300, 0, 300, 150, 6, 0.5)],
        [2.5, this.falling(120)],
        [3, this.falling(240)],
        [3.5, this.falling(360)],
        [4, this.falling(480)],
      ],
      [
        [1, this.firework(0, 100, 150, 100, 6, 0.5)],
        [1, this.firework(600, 100, 450, 100, 6, 0.5)],
        [1.5, this.falling(525, 1)],
        [2, this.falling(450, 1)],
        [2.5, this.falling(375, 1)],
        [3, this.falling(300, 1)],
        [3.5, this.falling(225, 1)],
        [4, this.falling(150, 1)],
        [4.5, this.falling(75, 1)],
      ],
      [
        [1, this.flower(0, 150, 1, 2, 12, 0xff8080, 2, true)],
        [1, this.flower(600, 150, 1, 2, 12, 0xff8080, 2, true)],
        [4, this.firework(150, 600, 150, 100, 5, 2)],
        [4.5, this.firework(300, 600, 300, 100, 5, 1.5)]
      ],
      [
        [1, this.firework(450, 600, 450, 100, 5, 1)],
        [2.5, this.falling(225)],
        [2.75, this.falling(180)],
        [3, this.falling(225)],
        [3.5, this.falling(150)],
        [4, this.falling(75)],
        [4.5, this.flower(450, 150, 3, 2, 18, 0xff8080, 2, true, 2.3)],
      ],
      [
        [3.5, this.falling(450)],
        [4, this.falling(300)],
        [4.5, this.falling(150)],
      ],
      [
        [1.5, this.falling(300)],
        [2, this.falling(450)],
        [2.5, this.path(this.para1(120, 600, 150, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 450, 150, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 150, 150, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 450, 150, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.spiral(150, 150, 8, 2.4, 24)],
        [1, this.spiral(450, 150, 8, 2.4, 24)],
        //[1, this.starfield(24, 20)],
        [1, this.flower(150, 150, 2, 1, 12, 0xff8080, 3, false, 1, 0)],
        [1, this.flower(450, 150, 2, 1, 12, 0xff8080, 3, false, 1, 0)],
        [2.5, this.path(this.para1(120, 600, 300, 100, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3, this.path(this.para1(240, 600, 300, 100, 2), false, false, 0, 4, 4, true, this.getTime(2))],
        [3.5, this.path(this.para1(360, 600, 300, 100, 1.5), false, false, 0, 4, 4, true, this.getTime(1.5))],
        [4, this.path(this.para1(480, 600, 300, 100, 1), false, false, 0, 4, 4, true, this.getTime(1))],
      ],
      [
        [1, this.flower(300, 100, 3, 2, 24, 0xff8080, 3, false, 0.4, 0)],
        [2.5, this.trail(0, 100, 600, 80, 2, 3)],
      ],
      [
        [1, this.firework(300, 0, 300, 150, 12, 0.5)],
        [2.5, this.falling(120)],
        [3, this.falling(240)],
        [3.5, this.falling(360)],
        [4, this.falling(480)],
      ],
      [
        [1, this.firework(0, 150, 150, 150, 6, 0.5, 0xff0000, random(0, Math.PI), 0.02, 3)],
        [1, this.firework(600, 150, 450, 150, 6, 0.5, 0xff0000, random(0, Math.PI), 0.02, 3)],
        [1.5, this.falling(525, 1)],
        [2, this.falling(450, 1)],
        [2.5, this.falling(375, 1)],
        [3, this.falling(300, 1)],
        [3.5, this.falling(225, 1)],
        [4, this.falling(150, 1)],
        [4.5, this.falling(75, 1)],
      ],
      [
        [1, this.flower(0, 150, 1, 2, 16, 0xff8080)],
        [1, this.flower(600, 150, 1, 2, 16, 0xff8080)],
        [3, this.path(this.para2(0, 110, 128, 90, 0, 10, 100), false, true, 2, 0, 4)], //127.33?
      ],
      [
        [3, this.falling(150)],
        [3.5, this.falling(300)],
        [4, this.falling(450)],
        [4.25, this.falling(300)],
        [4.5, this.falling(150)],
      ],
      [
        [1, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(315, 0, 315, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(270, 0, 270, 80, 3, 1, 0xff8080)],
        [3, this.firework(300, 0, 300, 80, 3, 1, 0xff8080)],
        [3.5, this.firework(495, 0, 330, 80, 3, 1, 0xff8080)],
        [4, this.firework(60, 0, 60, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(555, 0, 555, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.firework(195, 0, 195, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(360, 0, 365, 80, 3, 1, 0xff8080)],
        [2, this.firework(285, 0, 285, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(45, 0, 45, 80, 3, 1, 0xff8080)],
        [3.5, this.firework(105, 0, 105, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.field(32, 15)],
        [4, this.trail(0, 0, 450, 150, 1)],
      ],
      [
        [1, this.flower(450, 150, 2, 1, 12)],
        [3, this.firework(150, 600, 150, 100)],
        [4, this.firework(450, 600, 450, 100)],
      ],
      [
        [1, this.firework(300, 600, 300, 100, 8)],
        [3, this.trail(600, 0, 300, 100, 2, 2)],
        [4, this.trail(0, 0, 300, 100, 1)],
      ],
      [
        [1, this.flower(300, 100, 2, 1, 8)],
        [2.5, this.trail(45, 0, 600, 360, 2.5, 3)],
      ],
      [
        [1, this.falling(405)],
        [3, this.falling(180)],
      ],
      [
        [1, this.falling(570)],
        [3, this.falling(285)],
      ],
      [
        [1, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(315, 0, 315, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(270, 0, 270, 80, 3, 1, 0xff8080)],
        [3, this.firework(300, 0, 300, 80, 3, 1, 0xff8080)],
        [3.5, this.firework(495, 0, 495, 80, 3, 1, 0xff8080)],
        [4, this.firework(60, 0, 60, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(555, 0, 555, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.firework(195, 0, 195, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(360, 0, 365, 80, 3, 1, 0xff8080)],
        [2, this.firework(285, 0, 285, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(45, 0, 45, 80, 3, 1, 0xff8080)],
        [2.5, this.path(this.para1(300, 600, 300, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3.5, this.firework(105, 0, 105, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.spiral(300, 150, 6, 1.2, 32, 0xff8080, 10)],
        [1, this.explode(300, 150, 12)],
        [4, this.trail(0, 0, 450, 150, 1)],
      ],
      [
        [1, this.flower(450, 150, 2, 1, 12)],
        [3, this.firework(150, 600, 150, 100)],
        [4, this.firework(450, 600, 450, 100)],
      ],
      [
        [1, this.firework(300, 600, 300, 100, 8)],
        [3, this.trail(600, 0, 300, 100, 2, 2)],
        [4, this.trail(0, 0, 300, 100, 1)],
      ],
      [
        [1, this.flower(300, 100, 2, 1, 8)],
        [2.5, this.trail(45, 0, 600, 360, 2.5, 3)],
      ],
      [
        [1, this.falling(405)],
        [3, this.falling(180)],
      ],
      [
        [1, this.falling(570)],
        [3, this.falling(285)],
      ],
      [
        [1, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(315, 0, 315, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(270, 0, 270, 80, 3, 1, 0xff8080)],
        [3, this.firework(300, 0, 300, 80, 3, 1, 0xff8080)],
        [3.5, this.firework(495, 0, 495, 80, 3, 1, 0xff8080)],
        [4, this.firework(60, 0, 60, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(555, 0, 555, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.firework(195, 0, 195, 80, 3, 1, 0xff8080)],
        [1.5, this.firework(360, 0, 365, 80, 3, 1, 0xff8080)],
        [2, this.firework(285, 0, 285, 80, 3, 1, 0xff8080)],
        [2.5, this.firework(45, 0, 45, 80, 3, 1, 0xff8080)],
        [2.5, this.path(this.para1(300, 600, 300, 150, 2.5), false, false, 0, 4, 4, true, this.getTime(2.5))],
        [3.5, this.firework(105, 0, 105, 80, 3, 1, 0xff8080)],
        [4.5, this.firework(135, 0, 135, 80, 3, 1, 0xff8080)],
      ],
      [
        [1, this.flower(300, 150, 3, 4, 36)],
      ],
      [],
      [
        [1, this.starfield(4, 10)],
      ],
      [
        [1, this.starfield(4, 15)]
      ],
      [
        [1, this.starfield(4, 20)]
      ],
      [
        [1, this.starfield(4, 25)]
      ],
      [
        [1, this.starfield(4, 30)]
      ],
      [
        [1, this.starfield(4, 40)]
      ],
      [
        [1, this.starfield(4, 50)],
      ],
      [
        [1, this.starfield(4, 60)],
      ]
    ];
    this.tempo = 156;
  }
}