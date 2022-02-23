class Altale extends Stage {
  constructor() {
    super("Altale");
    this.tempo = 180;
    this.offset = 16;
    this.ts = 6;
    this.songPath = "songs/Altale.m4a";
    this.map = [];
    this.storyboard = false;
    Object.assign(this, level);
  }
  
  buildMap() {
    this.map = [
      [
        [1, this.explode(200, 0, 200, 100, 4)],
        [4, this.explode(100, 0, 100, 100, 4)],
      ],
      [
        [1, this.explode(300, 0, 300, 100, 4)],
        [4, this.explode(200, 0, 200, 100, 4)],
      ],
    ]
  }
}