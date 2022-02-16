const game = {};

class Stage extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.levelName = key;
  }

  preload() {}

  create() {
    game.bullets = this.add.group();
    for (let i = 0; i < 1000; i++) {
      let singlebullet = this.add.bullet(
        Math.random() * 800,
        Math.random() * 600,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        5,
        0,
        0
      );
      singlebullet.depth = 3;
      game.bullets.add(singlebullet);
      if (!settings.glow) {
        let singlebulletoutline = this.add.bullet(
          singlebullet.x,
          singlebullet.y,
          singlebullet.vx,
          singlebullet.vy,
          singlebullet.r * 1.6,
          singlebullet.delay,
          singlebullet.grav,
          singlebullet.color
        );
        singlebulletoutline.fillColor = singlebullet.color;
        singlebulletoutline.depth = 2;
        game.bullets.add(singlebulletoutline);
      }
    }

    if (settings.glow) {
      game.bulletGlowEffects = this.add.group();
      for (let singlebullet of game.bullets.getChildren()) {
        let singlebulletglow = this.add.bulletGlow(
          singlebullet.x,
          singlebullet.y,
          singlebullet.vx,
          singlebullet.vy,
          singlebullet.width / 2,
          singlebullet.delay,
          singlebullet.grav,
          singlebullet.color
        );
        singlebulletglow.depth = 1;
        game.bulletGlowEffects.add(singlebulletglow);
      }
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
    // 1st pass, actual bullets
    for (let singlebullet of game.bullets.getChildren()) {
      singlebullet.draw();
    }
    if (settings.glow) {
      // 2nd pass, bullet glow
      for (let singlebulletglow of game.bulletGlowEffects.getChildren()) {
        singlebulletglow.draw();
      }
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
      { key: "BulletPlugin", plugin: BulletPlugin, start: true },
      { key: "GlowPlugin", plugin: GlowPlugin, start: true },
    ],
  },
  scene: [Stage],
};

const g = new Phaser.Game(config);

const fpsLogger = setInterval(() => {
  console.log(g.loop.actualFps);
}, 1000);
