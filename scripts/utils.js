//jshint esversion:8

function random(a, b) {
  if (a > b) {
    return Math.random() * (b - a) + a
  } else {
    return Math.random() * (a - b) + b
  }
}

let col = (c) => Phaser.Display.Color.GetColor(...c);

let musicScenes = {
  async getSong(url) {
    this.songLoaded = false;
    this.audioContext = new window.AudioContext();
    //this.load.audio(this.levelName, this.songPath);
    this.song = await this.loadSong(url);
    this.songLoaded = true;
  },

  async loadSong(url) {
    let request = new XMLHttpRequest();
    let audcont = this.audioContext;
    let audioBuffer = new Promise((resolve) => {
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      // When loaded, decode the data and play the sound
      request.onload = function () {
        //console.log(this);
        audcont.decodeAudioData(
          request.response,
          function (buffer) {
            //console.log("Song loaded");
            resolve(buffer);
          },
          (e) => console.log(e)
        );
      };
      request.send();
    });
    return audioBuffer;
  },
  
  initSound() {
    this.sound = {};
    this.sound.sourceNode = this.audioContext.createBufferSource();
    this.sound.analyserNode = this.audioContext.createAnalyser();
    this.sound.gainNode = this.audioContext.createGain();
    this.sound.javascriptNode = this.audioContext.createScriptProcessor(
      1024,
      1,
      1
    ); //change 1024?
    this.sound.amplitudeArray = new Uint8Array(
      this.sound.analyserNode.frequencyBinCount
    );
    this.sound.sourceNode.connect(this.sound.gainNode);
    this.sound.gainNode.connect(this.audioContext.destination);
    this.sound.sourceNode.connect(this.sound.analyserNode);
    this.sound.analyserNode.connect(this.sound.javascriptNode);
    this.sound.javascriptNode.connect(this.audioContext.destination);
    
    this.ampPrevArray = new Array(settings.flickerSmoothLen).fill(0);
  },
  
  setFlicker() {
    if (this.audioPlaying) {
      this.sound.analyserNode.getByteTimeDomainData(this.sound.amplitudeArray);
      this.ampVal = Math.max(...this.sound.amplitudeArray);
      let ampSmooth = this.ampPrevArray.reduce((a, b) => (a + b)) / settings.flickerSmoothLen;
      this.flicker = ((ampSmooth - 128) / 128) * 0.8 + 0.2;
      this.ampPrevArray.shift();
      this.ampPrevArray.push(this.ampVal);
    } else {
      this.flicker = 0.2;
    }
  }
}