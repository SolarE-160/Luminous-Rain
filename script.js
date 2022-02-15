const game = {};

class Stage extends Phaser.Scene {

  preload() {

  }

  create() {
    game.circleArray = [];
    for (let i = 0; i < 1000; i++) {
      let randomX = Math.random() * 400;
      let randomY = Math.random() * 400;
      game.circleArray.push([this.add.circle(randomX, randomY, 12, 0x0080FF), this.add.circle(randomX, randomY, 8, 0xFFFFFF)]);
    }
  }

  update() {
    for (let particle of game.circleArray) {
      let randomX = Math.random() * 400;
      let randomY = Math.random() * 400;
      particle[0].x = randomX;
      particle[0].y = randomY;
      particle[1].x = randomX;
      particle[1].y = randomY;
    }
  }
}

const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 400,
	backgroundColor: "#5f2a55",
	scene: [Stage],
}


const g = new Phaser.Game(config)
