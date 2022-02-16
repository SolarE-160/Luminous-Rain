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
    game.bullets = this.add.group();
    for (let i = 0; i < 10; i++) {
      //let singlebulletglow = this.add.glowBullet(300, 150 + i * 10, 1, 0, 5, 0);
      let singlebullet = this.add.bullet(300, 150 + i * 10, 1, 0, 5, 0);
      //game.bullets.add(singlebulletglow);
      game.bullets.add(singlebullet);
    }
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
    for (let singlebullet of game.bullets.getChildren()) {
      singlebullet.draw();
    }
  }
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
  resolution: window.devicePixelRatio,
	backgroundColor: "#1e1e46",
  plugins: {
    global: [
      { key: 'BulletPlugin', plugin: BulletPlugin, start: true },
      //{ key: 'GlowBulletPlugin', plugin: GlowBulletPlugin, start: true }
    ]
  },
	scene: [Stage],
}

const g = new Phaser.Game(config)
