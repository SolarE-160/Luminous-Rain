let level = {
  
  getTime(beats) {
    return Math.round(beats / this.tempo * 60 * 60);
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
          time += this.getTime((measure - this.tempoChangeArray.at(-1)[0]) * this.ts + float(beat[0]) - 1) + this.offset;
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