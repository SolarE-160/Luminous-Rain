let level = {
  
  getTime(beats) {
    return Math.round(beats / this.tempo * 60 * 60);
  },
  
  explode(x, y, density=6, beats=4, rand=0, col=0x0080ff, rotOffset=Math.random() * Math.PI, grav=0.05, speed=1.5, xstretch=1) {
    //let bulletList = [new Warning(()=>{circle(x, y, 40)}, this.getTime(beats))];
    let bulletList = [["circleWarning", [x, y, density * 2 + 10, this.getTime(beats)]]];
    //let bulletList = [];
    for (let i = 0; i < density; i++) {
      //bulletList.push([x, y, xstretch * speed * cos(i / density * 2 * PI + rotOffset) + random(-rand, rand), sin(i / density * 2 * PI + rotOffset) * speed + random(-rand, rand), 10, this.getTime(beats), grav, col, false, 999999, false]);
      bulletList.push(["bullet", [x, y, xstretch * speed * Math.cos(i / density * 2 * Math.PI + rotOffset) + Math.random() * 2 * rand - rand, Math.sin(i / density * 2 * Math.PI + rotOffset) * speed + Math.random() * 2 * rand - rand, 4, this.getTime(beats), grav, col]]);
    }
    return bulletList;
  },
  
  falling(x, vy=3, y=0, vx=0, grav=0.1) {
    return [
      ["bullet", [x, y, vx, vy, 5, this.getTime(4), grav, 0x0000ff]],
      //["lineWarning", [x, y, x + 600 * vx / vy, y + 600, 2, this.getTime(4)]]
    ];
  },
  
  firework(x, y, xf, yf, density=6, beats=1, col=0x0080ff, rotOffset=Math.random() * Math.PI, grav=0.02, speed=1.5, xstretch=1, r=4) {
    let vx = (xf - x) / this.getTime(beats);
    let vy = (yf - y) / this.getTime(beats);
    let bulletList = [["bullet", [x, y, vx, vy, 4, this.getTime(3), 0, 0xff0000, true, this.getTime(beats)]]];
    
    for (var i = 0; i < density; i++) {
      bulletList.push(["bullet", [xf, yf, xstretch * speed * Math.cos(i / density * 2 * Math.PI + rotOffset), Math.sin(i / density * 2 * Math.PI + rotOffset) * speed, r, this.getTime(beats + 3), grav, col]]);
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
          time += this.getTime((measure - this.tempoChangeArray.at(-1)[0]) * this.ts + beat[0] - 1) + this.offset;
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
  
}