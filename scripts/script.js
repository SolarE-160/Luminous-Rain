const game = {};

class Stage extends Phaser.Scene {

  constructor(key) {
    super(key);
    this.levelName = key;
  }

  preload() {

  }

  create() {
    /*
    game.circleArray = [];
    for (let i = 0; i < 100; i++) {
      let randomX = Math.random() * 400;
      let randomY = Math.random() * 400;
      game.circleArray.push([this.add.circle(randomX, randomY, 12, 0x0080FF), this.add.circle(randomX, randomY, 8, 0xFFFFFF)]);
    }*/
    this.add.bullet(300, 200, 0, 0, 10, 0)
  }

  update() {
    /*
    for (let particle of game.circleArray) {
      let randomX = Math.random() - 0.5;
      let randomY = Math.random() - 0.5;
      particle[0].x += randomX;
      particle[0].y += randomY;
      particle[1].x += randomX;
      particle[1].y += randomY;
    }
    */

  }
}

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 400,
	backgroundColor: "#1e1e46",
  plugins: {
    global: [
      { key: 'BulletPlugin', plugin: BulletPlugin, start: true }
    ]
  },
	scene: [Stage],
}

const g = new Phaser.Game(config)
