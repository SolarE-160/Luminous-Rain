let level = {
  
  getTime(beats) {
    return Math.round(beats / this.tempo * 60 * 60);
  },
  
  explode(x, y, density=6, beats=4, rand=0, col=0x0080ff, rotOffset=Math.random() * Math.PI, grav=0.02, speed=1.5, xstretch=1) {
    //let bulletList = [new Warning(()=>{circle(x, y, 40)}, this.getTime(beats))];
    let bulletList = [this.add.circleWarning(x, y, density * 2 + 10, this.getTime(beats))];
    //let bulletList = [];
    for (let i = 0; i < density; i++) {
      //bulletList.push([x, y, xstretch * speed * cos(i / density * 2 * PI + rotOffset) + random(-rand, rand), sin(i / density * 2 * PI + rotOffset) * speed + random(-rand, rand), 10, this.getTime(beats), grav, col, false, 999999, false]);
      bulletList.push(this.add.bullet(x, y, xstretch * speed * Math.cos(i / density * 2 * Math.PI + rotOffset) + Math.random() * 2 * rand - rand, Math.sin(i / density * 2 * Math.PI + rotOffset) * speed + Math.random() * 2 * rand - rand, 4, this.getTime(beats), grav, col));
    }
    return bulletList;
  },
  
  falling(x, vy=3, y=0, vx=0, grav=0.08) {
    return [
      this.add.circleWarning(x, y + 3, 20, this.getTime(4)),
      this.add.bullet(x, y, vx, vy, 5, this.getTime(4), grav, 0x0000ff),
      //["lineWarning", [x, y, x + 600 * vx / vy, y + 600, 2, this.getTime(4)]]
    ];
  },
  
  firework(x, y, xf, yf, density=6, beats=1, col=0x0080ff, rotOffset=Math.random() * Math.PI, grav=0.02, speed=1.5, xstretch=1, r=4) {
    let vx = (xf - x) / this.getTime(beats);
    let vy = (yf - y) / this.getTime(beats);
    let bulletList = [this.add.bullet(x, y, vx, vy, 4, this.getTime(3), 0, 0xff0000, true, this.getTime(beats))];
    
    for (var i = 0; i < density; i++) {
      bulletList.push(this.add.bullet(xf, yf, xstretch * speed * Math.cos(i / density * 2 * Math.PI + rotOffset), Math.sin(i / density * 2 * Math.PI + rotOffset) * speed, r, this.getTime(beats + 3), grav, col));
    }
    return bulletList;
  },
  
  field(beats, density=5, speed=4, col=0x00ff00) {
    let bulletList = [];
    let len = this.getTime(beats);
    for (var i = 0; i < len; i += density) {
      bulletList.push(this.add.bullet(Math.random() * 600, 0, 0, speed, 3, i + this.getTime(4) + Math.random() * density + density * 0.5, 0, col));
    }
    return bulletList;
  },
  
  trail(x, y, xf, yf, beats, density=4, warn=true, grav=0.03, offset=0, randomize=0, col=0xff8000) {
    let vx = (xf - x) / this.getTime(beats);
    let vy = (yf - y) / this.getTime(beats);
    let bulletList = [];
    if (warn) {
      bulletList = [
        this.add.lineWarning(x, y, xf, yf, 2, this.getTime(4 + beats)),
      ];
    }
    bulletList.push(this.add.bullet(x, y, vx, vy, 7, this.getTime(4), 0, 0xff0000, false, this.getTime(beats)));
    for (var i = 0; i < beats * density; i++) {
      let x0 = vx * this.getTime((i + 0.5 + offset) / density) + x;
      let y0 = vy * this.getTime((i + 0.5 + offset) / density) + y;
      bulletList.push(this.add.bullet(x0, y0, Math.random() * randomize * 2 - randomize, Math.random() * 2 * randomize - randomize, 4, this.getTime(4.25 + i / density), grav, col));
    }
    return bulletList;
  },
  
  path(para, trail=false, warn=true, followLength=0, trailDensity=4, followDensity=4, dec=false, life=999999, trailGrav=0.02, col=0x00fa96, r=4) {
    let rad;
    if (trail) {
      rad = 6;
    } else {
      rad = r;
    }
    let bulletList = [this.add.bullet(-10, -10, 0, 0, rad, this.getTime(4), 0.01, col, dec, life, para)];
    for (var i = 0; i < followLength * followDensity; i++) {
      bulletList.push(this.add.bullet(-10, -10, 0, 0, rad, this.getTime(4 + i / followDensity), 0.01, col, dec, life, para));
      //print(bulletList);
    }
      let simTime = 0;
      let simX = para(simTime)[0];
      let simY = para(simTime)[1];
      while (
        simX > -outerBoxMargin &&
        simX < 600 + outerBoxMargin &&
        simY > -outerBoxMargin &&
        simY < 600 + outerBoxMargin
      ) {
        simX = para(simTime)[0];
        simY = para(simTime)[1];
        if (warn && simTime % 1 == 0) {
          bulletList.push(this.add.circleWarning(simX, simY, 5, this.getTime(4), true, this.getTime(2), 0.3, 0.3));
        }
        if (trail && simTime % trailDensity == 0) {
          bulletList.push(this.add.bullet(simX, simY, 0, 0, r, simTime + this.getTime(4), trailGrav, col));
        }
        if (simTime > life) {
          break;
        }
        simTime++;
      }
    return bulletList;
  },
  
  flower(x, y, p, q, density=32, col=0x8000ff, size=3, warn=true, rotOffset=random(0, 2 * Math.PI), grav=0.01, r=4) {
    let bulletList = [];
    if (warn) {
      bulletList = [this.add.circleWarning(x, y, density * size / 10 + 10, this.getTime(4))];
    }
    let period;
    if (p % 2 == 1 && q % 2 == 1) {
      period = Math.PI * q;
    } else {
      period = Math.PI * q * 2
    }
    for (var i = 0; i < period - 0.01; i += period / density) {
      let vx = size * Math.cos(p / q * (i + rotOffset)) * Math.cos(i + rotOffset);
      let vy = size * Math.cos(p / q * (i + rotOffset)) * Math.sin(i + rotOffset);
      bulletList.push(this.add.bullet(x, y, vx, vy, r, this.getTime(4), grav, col));
    }
    return bulletList;
  },
  
  changeTempo(newBPM, newTS=this.ts) {
    let tempoList = ["tempo change", newBPM, newTS];
    this.tempo = newBPM;
    //this.ts = newTS;
    return tempoList;
  },
  
  spiral(x, y, interval=4, angle=1, beats=16, col=0x8000ff, pulsar=true, speed=2, r=4, grav=0) {
    let bulletList = [];
    if (pulsar) {
      bulletList.push(this.add.pulsarBullet(x, y, 0, 0, 6, this.getTime(4), this.getTime(beats)))
    }
    for (var i = 0; i < this.getTime(beats); i += interval) {
      bulletList.push(this.add.bullet(x, y, speed * Math.cos(i / interval * angle), speed * Math.sin(i / interval * angle), r, i + this.getTime(4), grav, col));
    }
    return bulletList;
  },
  
  starfield(beats, density=5, speed=2, col=0xc8dcff) {
    let bulletList = [];
    let len = this.getTime(beats);
    for (var i = 0; i < len; i += density) {
      bulletList.push(this.add.starBullet(Math.random() * 600, 0, 0, speed, 3, i + this.getTime(4) + Math.random() * density + density * 0.5, 5, 0.02, 0, col)); 
      //bulletList.push(this.add.bullet(Math.random() * 600, 0, 0, speed, 3, i + this.getTime(4) + Math.random() * density + density * 0.5, 0, col)); //temp
    }
    return bulletList;
  },
  
  
  
  run() {
    this.buildMap();
    let parsedMap = [];
    this.tempoChangeArray = [[-1, this.tempo, this.ts]];
    for (var measure = 0; measure < this.map.length; measure++) {
      for (var beat of this.map[measure]) {
        if (beat[1][0] == "tempo change") {
          this.tempoChangeArray.push([measure, beat[1][1], beat[1][2]]);
          //print(tempoChangeArray);
        } else {
          let time = 0;
          this.tempo = this.tempoChangeArray[0][1];
          this.ts = this.tempoChangeArray[0][2];
          for (var i = 1; i < this.tempoChangeArray.length; i++) {
            time += this.getTime((this.tempoChangeArray[i][0] - this.tempoChangeArray[i - 1][0]) * this.ts);
            this.tempo = this.tempoChangeArray[i][1];
            this.ts = this.tempoChangeArray[i][2];
          }
          time += this.getTime((measure - this.tempoChangeArray.at(-1)[0]) * this.ts + beat[0] - 4) + this.offset;
          //print(time);
          //print(this.tempoChangeArray);
          //let time = this.getTime(measure * this.ts + float(beat[0]) - 1) + this.offset;
          /*if (tempoChangeArray.length >= 2) {
            print(time);
          }*/
          parsedMap.push([time, beat[1]]);
        }
      }
    }
    //print(this.getTime(17) + this.offset);
    return parsedMap;
  },
  
  createStoryboard() {
    let parsedBoard = [];
    let newTempoChangeArray = [[-1, this.tempo, this.ts]];
    for (var measure = 0; measure < this.storyboard.length; measure++) {
      for (var beat of this.storyboard[measure]) {
        for (var tempoChange of this.tempoChangeArray) {
          if (tempoChange[0] == measure) {
            newTempoChangeArray.push(tempoChange);
            //console.log(newTempoChangeArray);
            break;
          }
        }
        let time = 0;
        this.tempo = newTempoChangeArray[0][1];
        this.ts = newTempoChangeArray[0][2];
        for (var i = 1; i < newTempoChangeArray.length; i++) {
          time += this.getTime((newTempoChangeArray[i][0] - newTempoChangeArray[i - 1][0]) * this.ts);
          this.tempo = newTempoChangeArray[i][1];
          this.ts = newTempoChangeArray[i][2];
        }
        time += this.getTime((measure - newTempoChangeArray.at(-1)[0]) * this.ts + beat[0] - this.ts - 4) + this.offset + 80;
        //console.log(this.getTime((measure - newTempoChangeArray.at(-1)[0]) * this.ts + beat[0] - 4) + this.offset + 80);
        parsedBoard.push([time, beat[1], beat[2]]);
      }
    }
    return parsedBoard;
    
  },
}